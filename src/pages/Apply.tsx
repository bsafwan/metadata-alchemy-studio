import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import FileUploader from '@/components/FileUploader';
import { useZohoMail } from '@/hooks/useZohoMail';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, CheckCircle2, Briefcase, Upload, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  experience: string;
  whyJoin: string;
  resumeUrl: string;
}

const Apply = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { sendEmail, isSending } = useZohoMail();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    experience: '',
    whyJoin: '',
    resumeUrl: '',
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.experience || !formData.whyJoin) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.resumeUrl) {
        toast({
          title: "Resume Required",
          description: "Please upload your resume to continue",
          variant: "destructive",
        });
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      // Send detailed email to admin
      const adminSuccess = await sendEmail({
        to: ['bsafwanjamil677@gmail.com'],
        subject: `New Job Application - Marketing Co-founder`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a1a1a; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">New Job Application Received</h2>
            
            <h3 style="color: #0066cc; margin-top: 30px;">Position</h3>
            <p style="font-size: 16px; margin: 5px 0;"><strong>Marketing Co-founder (Outreach Expert)</strong></p>
            <p style="color: #666;">Payment: Commission Based</p>
            
            <h3 style="color: #0066cc; margin-top: 30px;">Personal Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666;">Full Name:</td>
                <td style="padding: 8px 0;"><strong>${formData.fullName}</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Email:</td>
                <td style="padding: 8px 0;"><strong>${formData.email}</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Phone:</td>
                <td style="padding: 8px 0;"><strong>${formData.phone}</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">LinkedIn:</td>
                <td style="padding: 8px 0;"><strong>${formData.linkedIn || 'Not provided'}</strong></td>
              </tr>
            </table>
            
            <h3 style="color: #0066cc; margin-top: 30px;">Professional Details</h3>
            <p style="color: #666; margin: 5px 0;">Experience:</p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${formData.experience}</p>
            
            <p style="color: #666; margin: 20px 0 5px 0;">Why they want to join:</p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${formData.whyJoin}</p>
            
            <h3 style="color: #0066cc; margin-top: 30px;">Resume</h3>
            <p><a href="${formData.resumeUrl}" style="color: #0066cc; text-decoration: none;" target="_blank">Download Resume</a></p>
            <p style="color: #666; font-size: 12px;">URL: ${formData.resumeUrl}</p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
              <p>Application received on ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      });

      // Send confirmation email to applicant
      const applicantSuccess = await sendEmail({
        to: [formData.email],
        subject: 'Application Received - Marketing Co-founder Position',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a1a1a; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">Thank You for Your Application!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">Dear ${formData.fullName},</p>
            
            <p style="font-size: 14px; line-height: 1.6; color: #666;">
              We have successfully received your application for the <strong>Marketing Co-founder (Outreach Expert)</strong> position.
            </p>
            
            <div style="background: #f0f8ff; border-left: 4px solid #0066cc; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #0066cc; font-weight: bold;">Application Status: Under Review</p>
            </div>
            
            <p style="font-size: 14px; line-height: 1.6; color: #666;">
              Our team will carefully review your application and reach out to you soon via email, WhatsApp, or phone.
            </p>
            
            <p style="font-size: 14px; line-height: 1.6; color: #666;">
              If you have any questions in the meantime, feel free to contact us.
            </p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="font-size: 14px; color: #333; margin: 5px 0;">Best regards,</p>
              <p style="font-size: 14px; color: #333; margin: 5px 0;"><strong>Elismet Team</strong></p>
            </div>
            
            <div style="margin-top: 20px; color: #999; font-size: 12px;">
              <p>Submitted on ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      });

      if (adminSuccess && applicantSuccess) {
        toast({
          title: "Application Submitted!",
          description: "Check your email for confirmation",
        });
        setCurrentStep(totalSteps);
      } else {
        throw new Error('Failed to send emails');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Personal Information</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedIn">LinkedIn Profile (Optional)</Label>
              <Input
                id="linkedIn"
                placeholder="https://linkedin.com/in/yourprofile"
                value={formData.linkedIn}
                onChange={(e) => updateFormData('linkedIn', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Professional Details</h3>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border">
              <p className="font-medium">Position: Marketing Co-founder (Outreach Expert)</p>
              <p className="text-sm text-muted-foreground mt-1">Payment: Commission Based</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Your Experience *</Label>
              <Textarea
                id="experience"
                placeholder="Tell us about your marketing and outreach experience..."
                rows={5}
                value={formData.experience}
                onChange={(e) => updateFormData('experience', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Include relevant roles, achievements, and skills
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whyJoin">Why do you want to join us? *</Label>
              <Textarea
                id="whyJoin"
                placeholder="What motivates you to join as a Marketing Co-founder?"
                rows={5}
                value={formData.whyJoin}
                onChange={(e) => updateFormData('whyJoin', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Share your vision and what you can bring to the team
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <Upload className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Upload Your Resume</h3>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg border">
              <FileUploader
                onFilesUploaded={(files) => {
                  if (files.length > 0) {
                    updateFormData('resumeUrl', files[0].url);
                    toast({
                      title: "Resume Uploaded",
                      description: "You can now proceed to the next step",
                    });
                  }
                }}
                maxFiles={1}
                acceptedTypes={['.pdf', '.doc', '.docx']}
              />
            </div>

            {formData.resumeUrl && (
              <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
                <span>Resume uploaded successfully</span>
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              Accepted formats: PDF, DOC, DOCX (Max 20MB)
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Review Your Application</h3>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Full Name:</span>
                    <span className="font-medium">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                  {formData.linkedIn && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">LinkedIn:</span>
                      <span className="font-medium truncate max-w-[200px]">{formData.linkedIn}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Position</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="font-medium">Marketing Co-founder (Outreach Expert)</p>
                  <p className="text-muted-foreground">Commission Based</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Resume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Resume uploaded</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">
                By submitting this application, you confirm that all information provided is accurate and complete.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (currentStep > totalSteps) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle>Application Submitted!</CardTitle>
              <CardDescription>
                Thank you for applying. We've sent a confirmation email to {formData.email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Our team will review your application and reach out to you soon via email, WhatsApp, or phone.
              </p>
              <Button onClick={() => navigate('/')} className="w-full">
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Join Our Team</h1>
            <p className="text-muted-foreground">Marketing Co-founder (Outreach Expert)</p>
            <p className="text-sm text-muted-foreground mt-1">Commission Based</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <CardTitle>Application Form</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep} of {totalSteps}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              {renderStep()}

              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1 || isSending}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                {currentStep < totalSteps ? (
                  <Button onClick={handleNext} disabled={isSending}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSending}>
                    {isSending ? 'Submitting...' : 'Submit Application'}
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

export default Apply;
