import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SuperAdminProvider } from "@/contexts/SuperAdminContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import SuperAdminProtectedRoute from "@/components/SuperAdminProtectedRoute";
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import About from "./pages/About";
import CustomSolution from "./pages/CustomSolution";
import MultiChannelSupport from "./pages/MultiChannelSupport";
import AICustomerOnboarding from "./pages/AICustomerOnboarding";
import ReviewBoost from "./pages/ReviewBoost";
import SmartScheduling from "./pages/SmartScheduling";
import AutomatedFollowUps from "./pages/AutomatedFollowUps";
import PaymentSolutions from "./pages/PaymentSolutions";
import CostTracking from "./pages/CostTracking";
import Author from "./pages/Author";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import GetStarted from "./pages/GetStarted";
import Onboard from "./pages/Onboard";
import VerifyOTP from "./pages/VerifyOTP";
import ProjectSetup from "./pages/ProjectSetup";
import Login from "./pages/Login";
import ContactDirect from "./pages/ContactDirect";
import Schedule from "./pages/Schedule";
import LiveChat from "./pages/LiveChat";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Conversations from "./pages/Conversations";
import Previews from "./pages/Previews";
import PaymentsAndDues from "./pages/PaymentsAndDues";
import DeliveryManagement from "./pages/DeliveryManagement";
import AdminDashboardLayout from "./components/AdminDashboardLayout";
import AdminDashboardHome from "./pages/AdminDashboardHome";
import AdminClients from "./pages/AdminClients";
import AdminProjects from "./pages/AdminProjects";
import AdminPayments from "./pages/AdminPayments";
import AdminMessages from "./pages/AdminMessages";
import AdminQuoteInquiries from "./pages/AdminQuoteInquiries";
import AdminSettings from "./pages/AdminSettings";
import ProjectAdminLayout from "./components/ProjectAdminLayout";
import ProjectAdminOverview from "./pages/ProjectAdminOverview";
import ProjectAdminMessages from "./pages/ProjectAdminMessages";
import ProjectAdminDemos from "./pages/ProjectAdminDemos";
import ProjectAdminDemosNew from "./pages/ProjectAdminDemosNew";
import ProjectAdminPreviews from "./pages/ProjectAdminPreviews";
import ProjectAdminPayments from "./pages/ProjectAdminPayments";
import ProjectAdminDelivery from "./pages/ProjectAdminDelivery";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import MeetingConnect from "./pages/MeetingConnect";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import ProjectPricingPhases from "./pages/ProjectPricingPhases";
import AdminProjectPricingPhases from "./pages/AdminProjectPricingPhases";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SuperAdminProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/about" element={<About />} />
              <Route path="/custom-solution" element={<CustomSolution />} />
              <Route path="/multi-channel-support" element={<MultiChannelSupport />} />
              <Route path="/ai-customer-onboarding" element={<AICustomerOnboarding />} />
              <Route path="/review-boost" element={<ReviewBoost />} />
              <Route path="/smart-scheduling" element={<SmartScheduling />} />
              <Route path="/automated-follow-ups" element={<AutomatedFollowUps />} />
              <Route path="/payment-solutions" element={<PaymentSolutions />} />
              <Route path="/cost-tracking" element={<CostTracking />} />
              <Route path="/author" element={<Author />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/onboard" element={<Onboard />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/project-setup" element={
                <ProtectedRoute>
                  <ProjectSetup />
                </ProtectedRoute>
              } />
              <Route path="/account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/contact-direct" element={<ContactDirect />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/live-chat" element={<LiveChat />} />
              
              {/* Super Admin Login - Complex Hidden URL */}
              <Route path="/system-control-panel-auth-gateway-x7k9m2p8q4w1" element={<SuperAdminLogin />} />
              
              {/* Client Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute requireProject={true}>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardHome />} />
                <Route path="conversations" element={<Conversations />} />
                <Route path="pricing-phases" element={<ProjectPricingPhases />} />
                <Route path="previews" element={<Previews />} />
                <Route path="payments" element={<PaymentsAndDues />} />
                <Route path="delivery" element={<DeliveryManagement />} />
              </Route>

              {/* Super Admin Protected Routes */}
              <Route path="/admin" element={
                <SuperAdminProtectedRoute>
                  <AdminDashboardLayout />
                </SuperAdminProtectedRoute>
              }>
                <Route index element={<AdminDashboardHome />} />
                <Route path="clients" element={<AdminClients />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="payments" element={<AdminPayments />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="quote-inquiries" element={<AdminQuoteInquiries />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Project-specific Admin Routes */}
              <Route path="/admin/project/:projectId" element={
                <SuperAdminProtectedRoute>
                  <ProjectAdminLayout />
                </SuperAdminProtectedRoute>
              }>
                <Route index element={<ProjectAdminOverview />} />
                <Route path="messages" element={<ProjectAdminMessages />} />
                <Route path="pricing-phases" element={<AdminProjectPricingPhases />} />
                <Route path="demos" element={<ProjectAdminDemosNew />} />
                <Route path="previews" element={<ProjectAdminPreviews />} />
                <Route path="payments" element={<ProjectAdminPayments />} />
                <Route path="delivery" element={<ProjectAdminDelivery />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/meeting/:meetingId/connect" element={<MeetingConnect />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SuperAdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
