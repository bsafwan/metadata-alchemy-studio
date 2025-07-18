import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, MessageSquare, Phone, User, Building, Mail, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MeetingSchedulerProps {
  onClose: () => void;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
  
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    whatsapp: '',
    meeting_platform: ''
  });

  // Generate time slots from 9 AM to 5 PM EST (30-minute intervals)
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const slotKey = `${selectedDate}_${time}`;
        slots.push({
          time,
          available: !bookedSlots.has(slotKey)
        });
      }
    }
    return slots;
  };

  // Get available dates (only Thursdays and Fridays, next 8 weeks)
  const getAvailableDates = (): string[] => {
    const dates: string[] = [];
    const today = new Date();
    const currentDay = today.getDay();
    
    // Find next Thursday (4) or Friday (5)
    let daysToAdd = 0;
    if (currentDay <= 4) {
      daysToAdd = 4 - currentDay; // Next Thursday
    } else {
      daysToAdd = 7 - currentDay + 4; // Next week Thursday
    }
    
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + daysToAdd);
    
    // Generate 8 weeks of Thursdays and Fridays
    for (let week = 0; week < 8; week++) {
      const thursday = new Date(startDate);
      thursday.setDate(startDate.getDate() + (week * 7));
      
      const friday = new Date(thursday);
      friday.setDate(thursday.getDate() + 1);
      
      dates.push(thursday.toISOString().split('T')[0]);
      dates.push(friday.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  // Load booked slots for selected date
  const loadBookedSlots = async (date: string) => {
    try {
      const { data, error } = await supabase
        .from('crm_meetings')
        .select('meeting_time')
        .eq('meeting_date', date)
        .eq('status', 'scheduled');

      if (error) throw error;

      const bookedTimes = new Set(
        data.map(meeting => `${date}_${meeting.meeting_time}`)
      );
      setBookedSlots(bookedTimes);
    } catch (error) {
      console.error('Error loading booked slots:', error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      loadBookedSlots(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    setAvailableSlots(generateTimeSlots());
  }, [selectedDate, bookedSlots]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeSlot = (time: string): string => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
    return `${displayHour}:${minute} ${period} EST`;
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!(formData.company_name && formData.contact_name && formData.email && formData.meeting_platform);
      case 2:
        return !!selectedDate;
      case 3:
        return !!selectedTime;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    try {
      // Save meeting to database
      const { data, error } = await supabase
        .from('crm_meetings')
        .insert([{
          company_name: formData.company_name,
          contact_name: formData.contact_name,
          email: formData.email,
          whatsapp: formData.whatsapp || null,
          meeting_platform: formData.meeting_platform,
          meeting_date: selectedDate,
          meeting_time: selectedTime,
          meeting_timezone: 'America/New_York',
          duration_minutes: 30,
          status: 'scheduled'
        }])
        .select()
        .single();

      if (error) throw error;

      // Send notifications via edge function
      const { error: notificationError } = await supabase.functions.invoke('send-meeting-notifications', {
        body: {
          meeting: data,
          type: 'scheduled'
        }
      });

      if (notificationError) {
        console.error('Notification error:', notificationError);
      }

      toast({
        title: "Meeting Scheduled Successfully!",
        description: "You'll receive a confirmation email with meeting details and a reminder 20 minutes before the meeting.",
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              Schedule a Professional Meeting
            </CardTitle>
            <Button variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ×
            </Button>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {num}
                </div>
                {num < 3 && <div className={`w-12 h-1 mx-2 
                  ${step > num ? 'bg-blue-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            {step === 1 && "Contact Information & Platform"}
            {step === 2 && "Choose Your Date"}
            {step === 3 && "Select Time Slot"}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Step 1: Contact Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Let's Get Your Meeting Details</h3>
                <p className="text-gray-600">Choose your preferred platform and provide your contact information</p>
              </div>

              {/* Meeting Platform Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Choose Meeting Platform *
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'google_meet', label: 'Google Meet', icon: Video },
                    { value: 'zoom', label: 'Zoom', icon: Video },
                    { value: 'whatsapp', label: 'WhatsApp Call', icon: MessageSquare }
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleInputChange('meeting_platform', value)}
                      className={`p-4 border-2 rounded-lg text-center transition-all hover:border-blue-300
                        ${formData.meeting_platform === value 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <div className="font-medium text-gray-900">{label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company_name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Company Name *
                    </Label>
                    <Input
                      id="company_name"
                      value={formData.company_name}
                      onChange={(e) => handleInputChange('company_name', e.target.value)}
                      placeholder="Your company name"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact_name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Your Name *
                    </Label>
                    <Input
                      id="contact_name"
                      value={formData.contact_name}
                      onChange={(e) => handleInputChange('contact_name', e.target.value)}
                      placeholder="Your full name"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@company.com"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    WhatsApp Number {formData.meeting_platform !== 'whatsapp' && '(Optional)'}
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.meeting_platform === 'whatsapp' 
                      ? 'Required for WhatsApp calls' 
                      : 'We\'ll send additional updates via WhatsApp if provided'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Date Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Meeting Date</h3>
                <p className="text-gray-600">Available only on Thursdays and Fridays (US Eastern Time)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {getAvailableDates().map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`p-4 border-2 rounded-lg text-left transition-all hover:border-blue-300
                      ${selectedDate === date 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <div className="font-medium text-gray-900">{formatDate(date)}</div>
                    <div className="text-sm text-gray-600">Eastern Time Zone</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Time Selection */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Your Time Slot</h3>
                <p className="text-gray-600">Available times for {formatDate(selectedDate)}</p>
                <p className="text-sm text-blue-600 font-medium">30-minute meeting duration</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {availableSlots.map(({ time, available }) => (
                  <button
                    key={time}
                    type="button"
                    disabled={!available}
                    onClick={() => available && setSelectedTime(time)}
                    className={`p-3 border-2 rounded-lg text-center transition-all
                      ${!available 
                        ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : selectedTime === time
                          ? 'border-blue-600 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                  >
                    <div className="font-medium">{formatTimeSlot(time)}</div>
                    {!available && (
                      <div className="text-xs text-red-500 mt-1">Booked</div>
                    )}
                  </button>
                ))}
              </div>

              {availableSlots.filter(slot => slot.available).length === 0 && (
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No available slots for this date. Please select another date.</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => step > 1 ? setStep(step - 1) : onClose()}
              className="px-6"
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>

            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!validateStep(step)}
                className="px-6 bg-blue-600 hover:bg-blue-700"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!validateStep(3) || isSubmitting}
                className="px-6 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Scheduling...
                  </>
                ) : (
                  <>
                    Schedule Meeting
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Meeting Summary (Step 3) */}
          {step === 3 && selectedTime && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Meeting Summary</h4>
              <div className="text-sm space-y-1 text-blue-800">
                <p><strong>Platform:</strong> {formData.meeting_platform.replace('_', ' ').toUpperCase()}</p>
                <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
                <p><strong>Time:</strong> {formatTimeSlot(selectedTime)}</p>
                <p><strong>Duration:</strong> 30 minutes</p>
                <p><strong>Contact:</strong> {formData.contact_name} ({formData.email})</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingScheduler;