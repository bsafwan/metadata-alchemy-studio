
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/AuthContext';
import Index from './pages/Index';
import GetStarted from './pages/GetStarted';
import CRMAssessment from './pages/CRMAssessment';
import CustomSolution from './pages/CustomSolution';
import ContactDirect from './pages/ContactDirect';
import AdminMessaging from './pages/AdminMessaging';
import MultiChannelSupport from './pages/MultiChannelSupport';
import AICustomerOnboarding from './pages/AICustomerOnboarding';
import ReviewBoost from './pages/ReviewBoost';
import SmartScheduling from './pages/SmartScheduling';
import AutomatedFollowUps from './pages/AutomatedFollowUps';
import PaymentSolutions from './pages/PaymentSolutions';
import CostTracking from './pages/CostTracking';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Toaster />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/crm-assessment" element={<CRMAssessment />} />
            <Route path="/custom-solution" element={<CustomSolution />} />
            <Route path="/contact-direct" element={<ContactDirect />} />
            <Route path="/admin-messaging" element={<AdminMessaging />} />
            <Route path="/multi-channel-support" element={<MultiChannelSupport />} />
            <Route path="/ai-customer-onboarding" element={<AICustomerOnboarding />} />
            <Route path="/review-boost" element={<ReviewBoost />} />
            <Route path="/smart-scheduling" element={<SmartScheduling />} />
            <Route path="/automated-follow-ups" element={<AutomatedFollowUps />} />
            <Route path="/payment-solutions" element={<PaymentSolutions />} />
            <Route path="/cost-tracking" element={<CostTracking />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
