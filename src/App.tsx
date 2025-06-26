import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SuperAdminProvider } from "@/contexts/SuperAdminContext";
import { UniversalNotificationPrompt } from "@/components/UniversalNotificationPrompt";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "@/pages/Index";
import GetStarted from "@/pages/GetStarted";
import ContactDirect from "@/pages/ContactDirect";
import Onboard from "@/pages/Onboard";
import CRMAssessment from "@/pages/CRMAssessment";
import AICustomerOnboarding from "@/pages/AICustomerOnboarding";
import AutomatedFollowUps from "@/pages/AutomatedFollowUps";
import MultiChannelSupport from "@/pages/MultiChannelSupport";
import SmartScheduling from "@/pages/SmartScheduling";
import CostTracking from "@/pages/CostTracking";
import ReviewBoost from "@/pages/ReviewBoost";
import PaymentSolutions from "@/pages/PaymentSolutions";
import CustomSolution from "@/pages/CustomSolution";
import Login from "@/pages/Login";
import VerifyOTP from "@/pages/VerifyOTP";
import ProtectedRoute from "@/components/ProtectedRoute";
import Account from "@/pages/Account";
import DashboardHome from "@/pages/DashboardHome";
import ProjectSetup from "@/pages/ProjectSetup";
import ProjectOverview from "@/pages/ProjectOverview";
import ProjectPricingPhases from "@/pages/ProjectPricingPhases";
import PaymentsAndDues from "@/pages/PaymentsAndDues";
import Status from "@/pages/Status";
import Conversations from "@/pages/Conversations";
import LiveChat from "@/pages/LiveChat";
import SupportTickets from "@/pages/SupportTickets";
import DemosAndPreviews from "@/pages/DemosAndPreviews";
import Previews from "@/pages/Previews";
import DeliveryManagement from "@/pages/DeliveryManagement";
import SuperAdminLogin from "@/pages/SuperAdminLogin";
import SuperAdminProtectedRoute from "@/components/SuperAdminProtectedRoute";
import AdminDashboardHome from "@/pages/AdminDashboardHome";
import AdminProjects from "@/pages/AdminProjects";
import AdminClients from "@/pages/AdminClients";
import AdminMessages from "@/pages/AdminMessages";
import AdminPayments from "@/pages/AdminPayments";
import AdminAnalytics from "@/pages/AdminAnalytics";
import AdminSettings from "@/pages/AdminSettings";
import AdminStatus from "@/pages/AdminStatus";
import AdminProjectPricingPhases from "@/pages/AdminProjectPricingPhases";
import AdminQuoteInquiries from "@/pages/AdminQuoteInquiries";
import ProjectAdminOverview from "@/pages/ProjectAdminOverview";
import ProjectAdminMessages from "@/pages/ProjectAdminMessages";
import ProjectAdminPayments from "@/pages/ProjectAdminPayments";
import ProjectAdminStatus from "@/pages/ProjectAdminStatus";
import ProjectAdminSupport from "@/pages/ProjectAdminSupport";
import ProjectAdminDemos from "@/pages/ProjectAdminDemos";
import ProjectAdminDemosNew from "@/pages/ProjectAdminDemosNew";
import ProjectAdminPreviews from "@/pages/ProjectAdminPreviews";
import ProjectAdminDelivery from "@/pages/ProjectAdminDelivery";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Author from "@/pages/Author";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <SuperAdminProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/contact-direct" element={<ContactDirect />} />
              <Route path="/onboard" element={<Onboard />} />
              <Route path="/crm-assessment" element={<CRMAssessment />} />
              <Route path="/ai-customer-onboarding" element={<AICustomerOnboarding />} />
              <Route path="/automated-follow-ups" element={<AutomatedFollowUps />} />
              <Route path="/multi-channel-support" element={<MultiChannelSupport />} />
              <Route path="/smart-scheduling" element={<SmartScheduling />} />
              <Route path="/cost-tracking" element={<CostTracking />} />
              <Route path="/review-boost" element={<ReviewBoost />} />
              <Route path="/payment-solutions" element={<PaymentSolutions />} />
              <Route path="/custom-solution" element={<CustomSolution />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
              <Route path="/project-setup" element={<ProtectedRoute><ProjectSetup /></ProtectedRoute>} />
              <Route path="/project-overview" element={<ProtectedRoute><ProjectOverview /></ProtectedRoute>} />
              <Route path="/project-pricing-phases" element={<ProtectedRoute><ProjectPricingPhases /></ProtectedRoute>} />
              <Route path="/payments-and-dues" element={<ProtectedRoute><PaymentsAndDues /></ProtectedRoute>} />
              <Route path="/status" element={<ProtectedRoute><Status /></ProtectedRoute>} />
              <Route path="/conversations" element={<ProtectedRoute><Conversations /></ProtectedRoute>} />
              <Route path="/live-chat" element={<ProtectedRoute><LiveChat /></ProtectedRoute>} />
              <Route path="/support-tickets" element={<ProtectedRoute><SupportTickets /></ProtectedRoute>} />
              <Route path="/demos-and-previews" element={<ProtectedRoute><DemosAndPreviews /></ProtectedRoute>} />
              <Route path="/previews" element={<ProtectedRoute><Previews /></ProtectedRoute>} />
              <Route path="/delivery-management" element={<ProtectedRoute><DeliveryManagement /></ProtectedRoute>} />
              <Route path="/admin/login" element={<SuperAdminLogin />} />
              <Route path="/admin" element={<SuperAdminProtectedRoute><AdminDashboardHome /></SuperAdminProtectedRoute>} />
              <Route path="/admin/projects" element={<SuperAdminProtectedRoute><AdminProjects /></SuperAdminProtectedRoute>} />
              <Route path="/admin/clients" element={<SuperAdminProtectedRoute><AdminClients /></SuperAdminProtectedRoute>} />
              <Route path="/admin/messages" element={<SuperAdminProtectedRoute><AdminMessages /></SuperAdminProtectedRoute>} />
              <Route path="/admin/payments" element={<SuperAdminProtectedRoute><AdminPayments /></SuperAdminProtectedRoute>} />
              <Route path="/admin/analytics" element={<SuperAdminProtectedRoute><AdminAnalytics /></SuperAdminProtectedRoute>} />
              <Route path="/admin/settings" element={<SuperAdminProtectedRoute><AdminSettings /></SuperAdminProtectedRoute>} />
              <Route path="/admin/status" element={<SuperAdminProtectedRoute><AdminStatus /></SuperAdminProtectedRoute>} />
              <Route path="/admin/project-pricing-phases" element={<SuperAdminProtectedRoute><AdminProjectPricingPhases /></SuperAdminProtectedRoute>} />
              <Route path="/admin/quote-inquiries" element={<SuperAdminProtectedRoute><AdminQuoteInquiries /></SuperAdminProtectedRoute>} />
              <Route path="/project-admin/overview" element={<SuperAdminProtectedRoute><ProjectAdminOverview /></SuperAdminProtectedRoute>} />
              <Route path="/project-admin/messages" element={<SuperAdminProtectedRoute><ProjectAdminMessages /></SuperAdminProtectedRoute>} />
              <Route path="/project-admin/payments" element={<SuperAdminProtectedRoute><ProjectAdminPayments /></SuperAdminProtectedRoute>} />
              <Route path="/project-admin/status" element={<SuperAdminProtectedRoute><ProjectAdminStatus /></SuperAdminProtectedRoute>} />
              <Route path="/project-admin/support" element={<SuperAdminProtectedRoute><ProjectAdminSupport /></SuperAdminProtectedRoute>} />
              <Route path="/project-admin/demos" element={<SuperAdminProtectedRoute><ProjectAdminDemos /></SuperAdminProtectedRoute>} />
              <Route path="/project-admin/demos-new" element={<SuperAdminProtectedRoute><ProjectAdminDemosNew /></SuperAdminProtectedRoute>} />
              <Route path="/project-admin/previews" element={<SuperAdminProtectedRoute><ProjectAdminPreviews /></SuperAdminProtectedRoute>} />
              <Route path="/project-admin/delivery" element={<SuperAdminProtectedRoute><ProjectAdminDelivery /></SuperAdminProtectedRoute>} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/author" element={<Author />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Universal notification prompt appears on all pages */}
            <UniversalNotificationPrompt />
          </SuperAdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
