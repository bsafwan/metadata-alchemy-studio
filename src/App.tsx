
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
import Author from "./pages/Author";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import GetStarted from "./pages/GetStarted";
import Onboard from "./pages/Onboard";
import VerifyOTP from "./pages/VerifyOTP";
import ProjectSetup from "./pages/ProjectSetup";
import Login from "./pages/Login";
import ContactDirect from "./pages/ContactDirect";
import LiveChat from "./pages/LiveChat";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Conversations from "./pages/Conversations";
import ProjectOverview from "./pages/ProjectOverview";
import DemosAndPreviews from "./pages/DemosAndPreviews";
import PaymentsAndDues from "./pages/PaymentsAndDues";
import Status from "./pages/Status";
import DeliveryManagement from "./pages/DeliveryManagement";
import SupportTickets from "./pages/SupportTickets";
import AdminDashboardLayout from "./components/AdminDashboardLayout";
import AdminDashboardHome from "./pages/AdminDashboardHome";
import AdminClients from "./pages/AdminClients";
import AdminProjects from "./pages/AdminProjects";
import AdminStatus from "./pages/AdminStatus";
import AdminPayments from "./pages/AdminPayments";
import AdminMessages from "./pages/AdminMessages";
import AdminSettings from "./pages/AdminSettings";
import ProjectAdminLayout from "./components/ProjectAdminLayout";
import ProjectAdminOverview from "./pages/ProjectAdminOverview";
import ProjectAdminMessages from "./pages/ProjectAdminMessages";
import ProjectAdminDemos from "./pages/ProjectAdminDemos";
import ProjectAdminPayments from "./pages/ProjectAdminPayments";
import ProjectAdminStatus from "./pages/ProjectAdminStatus";
import ProjectAdminDelivery from "./pages/ProjectAdminDelivery";
import ProjectAdminSupport from "./pages/ProjectAdminSupport";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";

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
                <Route path="project-overview" element={<ProjectOverview />} />
                <Route path="demos" element={<DemosAndPreviews />} />
                <Route path="payments" element={<PaymentsAndDues />} />
                <Route path="status" element={<Status />} />
                <Route path="delivery" element={<DeliveryManagement />} />
                <Route path="support" element={<SupportTickets />} />
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
                <Route path="status" element={<AdminStatus />} />
                <Route path="payments" element={<AdminPayments />} />
                <Route path="messages" element={<AdminMessages />} />
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
                <Route path="demos" element={<ProjectAdminDemos />} />
                <Route path="payments" element={<ProjectAdminPayments />} />
                <Route path="status" element={<ProjectAdminStatus />} />
                <Route path="delivery" element={<ProjectAdminDelivery />} />
                <Route path="support" element={<ProjectAdminSupport />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SuperAdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
