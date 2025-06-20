
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Mail, Lock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSuperAdmin } from '@/contexts/SuperAdminContext';
import { useToast } from '@/components/ui/use-toast';

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useSuperAdmin();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast({
          title: "Access Granted",
          description: "Welcome to Super Admin Panel",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid credentials. Unauthorized access attempt logged.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "System error occurred. Contact system administrator.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">RESTRICTED ACCESS</h1>
          <p className="text-red-400 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Super Administrator Only
          </p>
        </div>

        <Card className="shadow-2xl border-red-900 bg-gray-900">
          <CardHeader className="text-center">
            <CardTitle className="text-red-400">System Authentication</CardTitle>
            <CardDescription className="text-gray-400">
              Enter super administrator credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-red-400" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-red-400" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "AUTHENTICATING..." : "AUTHENTICATE"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-xs text-gray-500">
          Unauthorized access attempts are monitored and logged
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
