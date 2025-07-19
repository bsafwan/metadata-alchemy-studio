import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Calendar as CalendarIcon, Clock, Users, CheckCircle, ArrowLeft, ArrowRight, Video, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format, isThursday, isFriday, addDays, isBefore, startOfDay } from 'date-fns';

interface MeetingSchedulerProps {
  onClose: () => void;
}

const MeetingScheduler = ({ onClose }: MeetingSchedulerProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    whatsapp: '',
    countryCode: '+1',
    meeting_platform: ''
  });

  // Available time slots (9 AM to 10 PM EST, 30-minute intervals)
  const timeSlots = [];
  for (let hour = 9; hour < 22; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
  }

  // Check if date is available (Thursday or Friday, not in past, within one month)
  const isDateAvailable = (date: Date) => {
    const today = startOfDay(new Date());
    const oneMonthFromNow = addDays(today, 30);
    return !isBefore(date, today) && 
           !isBefore(oneMonthFromNow, date) && 
           (isThursday(date) || isFriday(date));
  };

  // Fetch booked slots for selected date
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) return;
      
      try {
        const { data, error } = await supabase
          .from('crm_meetings')
          .select('meeting_time')
          .eq('meeting_date', format(selectedDate, 'yyyy-MM-dd'))
          .eq('status', 'scheduled');

        if (error) throw error;
        
        // Create array of blocked slots (booked slot + next 30 minutes)
        const blocked: string[] = [];
        data.forEach(meeting => {
          const meetingTime = meeting.meeting_time;
          blocked.push(meetingTime);
          
          // Block next 30 minutes too (1 hour total block)
          const [hours, minutes] = meetingTime.split(':').map(Number);
          let nextHour = hours;
          let nextMinutes = minutes + 30;
          
          if (nextMinutes >= 60) {
            nextHour++;
            nextMinutes = 0;
          }
          
          if (nextHour < 22) { // Don't block beyond 10 PM
            const nextSlot = `${nextHour.toString().padStart(2, '0')}:${nextMinutes.toString().padStart(2, '0')}`;
            blocked.push(nextSlot);
          }
        });
        
        setBookedSlots(blocked);
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      }
    };

    fetchBookedSlots();
  }, [selectedDate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !formData.company_name || !formData.contact_name || 
        !formData.email || !formData.meeting_platform) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format WhatsApp number with country code
      const fullWhatsAppNumber = formData.whatsapp ? 
        `${formData.countryCode}${formData.whatsapp}`.replace(/[^\d+]/g, '') : null;

      const { error } = await supabase.functions.invoke('send-meeting-notifications', {
        body: {
          meeting: {
            company_name: formData.company_name,
            contact_name: formData.contact_name,
            email: formData.email,
            whatsapp: fullWhatsAppNumber,
            meeting_platform: formData.meeting_platform,
            meeting_date: format(selectedDate, 'yyyy-MM-dd'),
            meeting_time: selectedTime,
            meeting_timezone: 'America/New_York',
            duration_minutes: 30
          },
          type: 'scheduled'
        }
      });

      if (error) throw error;

      toast({
        title: "Meeting Scheduled Successfully!",
        description: "You'll receive confirmation details via email and WhatsApp (if provided).",
      });

      onClose();
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      toast({
        title: "Scheduling Failed",
        description: "There was an error scheduling your meeting. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && (!formData.company_name || !formData.contact_name || !formData.email || !formData.meeting_platform)) {
      toast({
        title: "Please complete all fields",
        description: "All fields are required to proceed.",
        variant: "destructive"
      });
      return;
    }
    if (currentStep === 2 && !selectedDate) {
      toast({
        title: "Please select a date",
        description: "Choose an available date to continue.",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-blue-900">
              Schedule Professional Meeting
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-blue-600 text-sm">Only Thursday & Friday • 9 AM-10 PM EST</p>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-center my-6">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 rounded-full ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[400px] px-2">
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <Card className="border border-blue-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-center text-blue-900">Contact Information</h3>
                
                <div className="space-y-4">
                  {/* Platform Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {[
                      { value: 'google_meet', label: 'Google Meet', icon: Video },
                      { value: 'zoom', label: 'Zoom', icon: Video },
                      { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare }
                    ].map(({ value, label, icon: Icon }) => (
                      <Button
                        key={value}
                        type="button"
                        variant={formData.meeting_platform === value ? "default" : "outline"}
                        onClick={() => handleInputChange('meeting_platform', value)}
                        className="h-12 text-sm font-medium"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {label}
                      </Button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Company Name"
                      value={formData.company_name}
                      onChange={(e) => handleInputChange('company_name', e.target.value)}
                      className="h-10"
                      required
                    />
                    <Input
                      placeholder="Your Name"
                      value={formData.contact_name}
                      onChange={(e) => handleInputChange('contact_name', e.target.value)}
                      className="h-10"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-10"
                      required
                    />
                    <div className="flex gap-2">
                      <Select value={formData.countryCode || '+1'} onValueChange={(value) => handleInputChange('countryCode', value)}>
                        <SelectTrigger className="w-24 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+1">🇺🇸 +1</SelectItem>
                          <SelectItem value="+880">🇧🇩 +880</SelectItem>
                          <SelectItem value="+91">🇮🇳 +91</SelectItem>
                          <SelectItem value="+92">🇵🇰 +92</SelectItem>
                          <SelectItem value="+44">🇬🇧 +44</SelectItem>
                          <SelectItem value="+971">🇦🇪 +971</SelectItem>
                          <SelectItem value="+966">🇸🇦 +966</SelectItem>
                          <SelectItem value="+60">🇲🇾 +60</SelectItem>
                          <SelectItem value="+65">🇸🇬 +65</SelectItem>
                          <SelectItem value="+852">🇭🇰 +852</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="WhatsApp Number (Optional)"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                        className="h-10 flex-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Date Selection */}
          {currentStep === 2 && (
            <Card className="border border-blue-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-center text-blue-900">Select Date</h3>
                <p className="text-center text-gray-600 mb-6 text-sm">Available: Thu & Fri within next 30 days</p>
                
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => !isDateAvailable(date)}
                    className="rounded-lg border shadow-sm pointer-events-auto mx-auto"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                      day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md",
                      day_range_end: "day-range-end",
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                      day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                      day_disabled: "text-muted-foreground opacity-50",
                      day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                      day_hidden: "invisible",
                    }}
                  />
                </div>

                {selectedDate && (
                  <div className="mt-6 text-center">
                    <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Time Selection */}
          {currentStep === 3 && (
            <Card className="border border-blue-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-center text-blue-900">Select Time</h3>
                <p className="text-center text-gray-600 mb-6 text-sm">
                  {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')} - US Eastern Time
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-72 overflow-y-auto p-2">
                  {timeSlots.map((time) => {
                    const isBooked = bookedSlots.includes(time);
                    return (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        disabled={isBooked}
                        onClick={() => setSelectedTime(time)}
                        className={`h-10 text-sm font-medium ${isBooked ? 'opacity-40 cursor-not-allowed bg-gray-100' : ''}`}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {format(new Date(`2024-01-01T${time}:00`), 'h:mm a')}
                      </Button>
                    );
                  })}
                </div>

                {selectedTime && (
                  <div className="mt-6 text-center">
                    <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                      <Clock className="w-4 h-4 mr-2" />
                      {format(new Date(`2024-01-01T${selectedTime}:00`), 'h:mm a')} EST (30 min)
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 h-10 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button onClick={nextStep} className="px-6 h-10 text-sm bg-blue-600 hover:bg-blue-700">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedTime}
              className="px-8 h-10 text-sm bg-green-600 hover:green-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <Users className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingScheduler;