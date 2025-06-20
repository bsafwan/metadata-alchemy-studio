
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft, Shield } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { EmailService } from '@/utils/emailService';
import { supabase } from '@/integrations/supabase/client';
import { hashPassword, createUserSession } from '@/utils/auth';
import { useAuth } from '@/contexts/AuthContext';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [countdown, setCountdown] = useState(60);

  const registrationData = location.state?.registrationData;

  useEffect(() => {
    if (!registrationData) {
      navigate('/onboard');
      return;
    }
    
    sendOTP();
  }, [registrationData, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTP = async () => {
    const newOTP = generateOTP();
    setGeneratedOTP(newOTP);
    console.log('Generated OTP:', newOTP);

    try {
      const emailSent = await EmailService.sendEmail({
        to: [registrationData.email],
        subject: 'Your Elismet Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Verify Your Email Address</h2>
            <p>Hello ${registrationData.firstName},</p>
            <p>Your verification code is:</p>
            <div style="font-size: 32px; font-weight: bold; color: #2563eb; text-align: center; padding: 20px; margin: 20px 0; background: #f0f9ff; border-radius: 8px;">
              ${newOTP}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <p>Best regards,<br>The Elismet Team</p>
          </div>
        `,
        text: `Your Elismet verification code is: ${newOTP}. This code will expire in 10 minutes.`
      });

      if (emailSent) {
        toast({
          title: "OTP Sent",
          description: `Verification code sent to ${registrationData.email}`,
        });
      } else {
        toast({
          title: "Email Error",
          description: "Failed to send verification code. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Failed to send OTP:', error);
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setCountdown(60);
    await sendOTP();
    setIsResending(false);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }

    if (otp !== generatedOTP) {
      toast({
        title: "Invalid OTP",
        description: "The verification code you entered is incorrect.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Hash the password
      const passwordHash = await hashPassword(registrationData.password);

      // Create user in database
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          first_name: registrationData.firstName,
          last_name: registrationData.lastName,
          email: registrationData.email,
          business_name: registrationData.businessName,
          business_category: registrationData.businessCategory,
          password_hash: passwordHash,
          is_verified: true
        })
        .select()
        .single();

      if (userError) {
        if (userError.code === '23505') { // Unique constraint violation
          toast({
            title: "Account Exists",
            description: "An account with this email already exists.",
            variant: "destructive"
          });
          return;
        }
        throw userError;
      }

      // Create session
      await createUserSession(userData.id);
      
      // Set user in context
      login(userData);

      toast({
        title: "Email Verified!",
        description: "Your account has been created successfully.",
      });

      navigate('/project-setup');
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: "Verification Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!registrationData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <Link to="/onboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Registration
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
            <p className="text-gray-600">We've sent a verification code to {registrationData.email}</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <Shield className="w-5 h-5 mr-2" />
                Enter Verification Code
              </CardTitle>
              <CardDescription>
                Enter the 6-digit code we sent to your email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  value={otp}
                  onChange={setOtp}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button 
                onClick={handleVerifyOTP} 
                className="w-full" 
                size="lg"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Didn't receive the code?
                </p>
                {countdown > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend code in {countdown} seconds
                  </p>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={handleResendOTP}
                    disabled={isResending}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {isResending ? "Sending..." : "Resend Code"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VerifyOTP;
