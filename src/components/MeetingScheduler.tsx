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
    meeting_platform: ''
  });

  // Available time slots (9 AM to 5 PM EST, 30-minute intervals)
  const timeSlots = [];
  for (let hour = 9; hour < 17; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
  }

  // Check if date is available (Thursday or Friday, not in past)
  const isDateAvailable = (date: Date) => {
    const today = startOfDay(new Date());
    return !isBefore(date, today) && (isThursday(date) || isFriday(date));
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
          
          if (nextHour < 17) { // Don't block beyond 5 PM
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
      const { error } = await supabase.functions.invoke('send-meeting-notifications', {
        body: {
          company_name: formData.company_name,
          contact_name: formData.contact_name,
          email: formData.email,
          whatsapp: formData.whatsapp || null,
          meeting_platform: formData.meeting_platform,
          meeting_date: format(selectedDate, 'yyyy-MM-dd'),
          meeting_time: selectedTime,
          meeting_timezone: 'America/New_York',
          duration_minutes: 30
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
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="border-b pb-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-3xl font-bold text-blue-900">
              Schedule Professional Meeting
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>
          <p className="text-blue-600 mt-2">Only Thursday & Friday available • 30-minute sessions • US Eastern Time</p>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-center my-8">
          <div className="flex items-center space-x-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-2 mx-3 rounded-full ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[500px] px-2">
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <Card className="border-2 border-blue-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-8 text-center text-blue-900">Contact Information</h3>
                
                <div className="space-y-6">
                  {/* Platform Selection */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
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
                        className="h-16 text-lg font-medium"
                      >
                        <Icon className="w-6 h-6 mr-3" />
                        {label}
                      </Button>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      placeholder="Company Name"
                      value={formData.company_name}
                      onChange={(e) => handleInputChange('company_name', e.target.value)}
                      className="h-14 text-lg"
                      required
                    />
                    <Input
                      placeholder="Your Name"
                      value={formData.contact_name}
                      onChange={(e) => handleInputChange('contact_name', e.target.value)}
                      className="h-14 text-lg"
                      required
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-14 text-lg"
                      required
                    />
                    <Input
                      placeholder="WhatsApp (Optional)"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      className="h-14 text-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Date Selection */}
          {currentStep === 2 && (
            <Card className="border-2 border-blue-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-blue-900">Select Date</h3>
                <p className="text-center text-gray-600 mb-8 text-lg">Only Thursday and Friday are available</p>
                
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => !isDateAvailable(date)}
                    className="rounded-xl border-2 shadow-lg scale-125 pointer-events-auto"
                    classNames={{
                      day_disabled: "text-gray-300 opacity-30",
                      day_selected: "bg-blue-600 text-white font-bold",
                      day: "h-12 w-12 text-base font-medium hover:bg-blue-50",
                      caption: "text-xl font-bold",
                      nav_button: "h-10 w-10",
                      table: "w-full border-collapse space-y-1"
                    }}
                  />
                </div>

                {selectedDate && (
                  <div className="mt-8 text-center">
                    <Badge variant="outline" className="px-6 py-3 text-lg font-medium">
                      <CalendarIcon className="w-5 h-5 mr-3" />
                      {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Time Selection */}
          {currentStep === 3 && (
            <Card className="border-2 border-blue-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-center text-blue-900">Select Time</h3>
                <p className="text-center text-gray-600 mb-8 text-lg">
                  {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')} - US Eastern Time
                </p>
                
                <div className="grid grid-cols-4 gap-4 max-h-80 overflow-y-auto p-2">
                  {timeSlots.map((time) => {
                    const isBooked = bookedSlots.includes(time);
                    return (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        disabled={isBooked}
                        onClick={() => setSelectedTime(time)}
                        className={`h-16 text-base font-medium ${isBooked ? 'opacity-40 cursor-not-allowed bg-gray-100' : ''}`}
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        {format(new Date(`2024-01-01T${time}:00`), 'h:mm a')}
                      </Button>
                    );
                  })}
                </div>

                {selectedTime && (
                  <div className="mt-8 text-center">
                    <Badge variant="outline" className="px-6 py-3 text-lg font-medium">
                      <Clock className="w-5 h-5 mr-3" />
                      {format(new Date(`2024-01-01T${selectedTime}:00`), 'h:mm a')} EST (30 minutes)
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 border-t">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-8 h-12 text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button onClick={nextStep} className="px-8 h-12 text-lg bg-blue-600 hover:bg-blue-700">
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedTime}
              className="px-12 h-12 text-lg bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <Users className="w-5 h-5 mr-3" />
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