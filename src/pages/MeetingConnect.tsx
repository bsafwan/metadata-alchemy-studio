import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, User, Building2, ExternalLink } from 'lucide-react';
import { format, parseISO, differenceInMinutes, addMinutes, subMinutes } from 'date-fns';

interface Meeting {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  meeting_platform: string;
  meeting_date: string;
  meeting_time: string;
  meeting_timezone: string;
  duration_minutes: number;
  status: string;
}

const MeetingConnect = () => {
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
  } | null>(null);
  const [meetingStatus, setMeetingStatus] = useState<'waiting' | 'active' | 'expired'>('waiting');

  // Hardcoded meeting links
  const GOOGLE_MEET_LINK = "https://meet.google.com/bfs-xkfv-myz";
  const ZOOM_LINK = "https://zoom.us/wc/join/2325601666?pwd=T9GPv0";

  useEffect(() => {
    fetchMeeting();
  }, [meetingId]);

  useEffect(() => {
    if (meeting) {
      const interval = setInterval(updateTimeAndStatus, 1000);
      return () => clearInterval(interval);
    }
  }, [meeting]);

  const fetchMeeting = async () => {
    try {
      const { data, error } = await supabase
        .from('crm_meetings')
        .select('*')
        .eq('id', meetingId)
        .single();

      if (error) throw error;
      setMeeting(data);
    } catch (error) {
      console.error('Error fetching meeting:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTimeAndStatus = () => {
    if (!meeting) return;

    const meetingDateTime = parseISO(`${meeting.meeting_date}T${meeting.meeting_time}`);
    const now = new Date();
    const minutesToMeeting = differenceInMinutes(meetingDateTime, now);
    
    // Meeting window: 20 minutes before to 30 minutes after
    const windowStart = subMinutes(meetingDateTime, 20);
    const windowEnd = addMinutes(meetingDateTime, meeting.duration_minutes + 30);
    
    if (now < windowStart) {
      setMeetingStatus('waiting');
      // Calculate time left
      const totalMinutes = differenceInMinutes(meetingDateTime, now);
      const days = Math.floor(totalMinutes / (24 * 60));
      const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
      const minutes = totalMinutes % 60;
      setTimeLeft({ days, hours, minutes });
    } else if (now >= windowStart && now <= windowEnd) {
      setMeetingStatus('active');
      setTimeLeft(null);
    } else {
      setMeetingStatus('expired');
      setTimeLeft(null);
    }
  };

  const handleJoinMeeting = () => {
    if (!meeting || !userName.trim()) return;

    let meetingUrl = '';
    if (meeting.meeting_platform === 'google_meet') {
      meetingUrl = GOOGLE_MEET_LINK;
    } else if (meeting.meeting_platform === 'zoom') {
      const encodedName = encodeURIComponent(`${userName} - ${meeting.company_name}`);
      meetingUrl = `${ZOOM_LINK}&uname=${encodedName}`;
    }

    if (meetingUrl) {
      window.open(meetingUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading meeting details...</p>
        </div>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold text-destructive mb-4">Meeting Not Found</h2>
            <p className="text-muted-foreground">The meeting you're looking for doesn't exist or has been cancelled.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const meetingDateTime = parseISO(`${meeting.meeting_date}T${meeting.meeting_time}`);
  const formattedDate = format(meetingDateTime, 'EEEE, MMMM do');
  const formattedTime = format(meetingDateTime, 'h:mm a');

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold mb-2">Meeting Portal</CardTitle>
            <div className="text-4xl font-bold text-primary mb-4">
              Meeting starts at {formattedTime}
            </div>
            <div className="text-xl text-muted-foreground">
              {formattedDate}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Meeting Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">{meeting.company_name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{meeting.contact_name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Platform</p>
                  <p className="font-medium capitalize">{meeting.meeting_platform.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{meeting.duration_minutes} minutes</p>
                </div>
              </div>
            </div>

            {/* Time Status */}
            {meetingStatus === 'waiting' && timeLeft && (
              <div className="text-center py-6 bg-muted/50 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Time Until Meeting</h3>
                <div className="flex justify-center space-x-6 text-center">
                  {timeLeft.days > 0 && (
                    <div>
                      <div className="text-3xl font-bold text-primary">{timeLeft.days}</div>
                      <div className="text-sm text-muted-foreground">Days</div>
                    </div>
                  )}
                  <div>
                    <div className="text-3xl font-bold text-primary">{timeLeft.hours}</div>
                    <div className="text-sm text-muted-foreground">Hours</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">{timeLeft.minutes}</div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">
                  The meeting link will be available 20 minutes before the scheduled time.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Please wait for the owner to get connected.
                </p>
              </div>
            )}

            {meetingStatus === 'active' && (
              <div className="text-center py-6 bg-primary/10 rounded-lg border-2 border-primary/20">
                <h3 className="text-2xl font-bold mb-4 text-primary">Meeting is Ready!</h3>
                
                {meeting.meeting_platform === 'google_meet' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="userName">Your Name</Label>
                      <Input
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                        className="max-w-sm mx-auto"
                      />
                    </div>
                    <Button 
                      onClick={handleJoinMeeting}
                      disabled={!userName.trim()}
                      size="lg"
                      className="w-full max-w-sm"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Join Google Meet
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Click and type your name to join the meeting
                    </p>
                  </div>
                )}

                {meeting.meeting_platform === 'zoom' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="userName">Your Name</Label>
                      <Input
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                        className="max-w-sm mx-auto"
                      />
                    </div>
                    <Button 
                      onClick={handleJoinMeeting}
                      disabled={!userName.trim()}
                      size="lg"
                      className="w-full max-w-sm"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Join Zoom Meeting
                    </Button>
                  </div>
                )}
              </div>
            )}

            {meetingStatus === 'expired' && (
              <div className="text-center py-6 bg-destructive/10 rounded-lg">
                <h3 className="text-2xl font-bold mb-2 text-destructive">Meeting Expired</h3>
                <p className="text-muted-foreground">
                  The meeting is either finished or expired.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeetingConnect;