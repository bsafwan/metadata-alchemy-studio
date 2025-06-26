import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SuperAdminProtectedRoute from './components/SuperAdminProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import ProjectAdminLayout from './components/ProjectAdminLayout';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

// Landing Pages
import Index from './pages/Index';
import GetStarted from './pages/GetStarted';
import CustomSolution from './pages/CustomSolution';
import Author from './pages/Author';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Auth Pages
import Login from './pages/Login';
import VerifyOTP from './pages/VerifyOTP';
import SuperAdminLogin from './pages/SuperAdminLogin';

// Dashboard Pages
import DashboardHome from './pages/DashboardHome';
import Account from './pages/Account';
import ProjectSetup from './pages/ProjectSetup';
import ProjectOverview from './pages/ProjectOverview';
import ProjectPricingPhases from './pages/ProjectPricingPhases';
import PaymentsAndDues from './pages/PaymentsAndDues';
import Status from './pages/Status';
import Conversations from './pages/Conversations';
import Previews from './pages/Previews';
import DeliveryManagement from './pages/DeliveryManagement';
import DemosAndPreviews from './pages/DemosAndPreviews';

// Business Feature Pages
import Onboard from './pages/Onboard';
import AICustomerOnboarding from './pages/AICustomerOnboarding';
import CRMAssessment from './pages/CRMAssessment';
import AutomatedFollowUps from './pages/AutomatedFollowUps';
import SmartScheduling from './pages/SmartScheduling';
import MultiChannelSupport from './pages/MultiChannelSupport';
import ReviewBoost from './pages/ReviewBoost';
import PaymentSolutions from './pages/PaymentSolutions';
import CostTracking from './pages/CostTracking';
import LiveChat from './pages/LiveChat';
import SupportTickets from './pages/SupportTickets';
import ContactDirect from './pages/ContactDirect';

// Admin Dashboard Pages
import AdminDashboardHome from './pages/AdminDashboardHome';
import AdminClients from './pages/AdminClients';
import AdminProjects from './pages/AdminProjects';
import AdminProjectPricingPhases from './pages/AdminProjectPricingPhases';
import AdminMessages from './pages/AdminMessages';
import AdminPayments from './pages/AdminPayments';
import AdminQuoteInquiries from './pages/AdminQuoteInquiries';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminSettings from './pages/AdminSettings';
import AdminStatus from './pages/AdminStatus';

// Project Admin Pages
import ProjectAdminOverview from './pages/ProjectAdminOverview';
import ProjectAdminMessages from './pages/ProjectAdminMessages';
import ProjectAdminPayments from './pages/ProjectAdminPayments';
import ProjectAdminStatus from './pages/ProjectAdminStatus';
import ProjectAdminDelivery from './pages/ProjectAdminDelivery';
import ProjectAdminDemos from './pages/ProjectAdminDemos';
import ProjectAdminDemosNew from './pages/ProjectAdminDemosNew';
import ProjectAdminPreviews from './pages/ProjectAdminPreviews';
import ProjectAdminSupport from './pages/ProjectAdminSupport';

// 404 Page
import NotFound from './pages/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Landing Pages - WITH Navbar */}
        <Route path="/" element={<><Navbar /><Index /></>} />
        <Route path="/get-started" element={<><Navbar /><GetStarted /></>} />
        <Route path="/custom-solution" element={<><Navbar /><CustomSolution /></>} />
        <Route path="/author" element={<><Navbar /><Author /></>} />
        <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicy /></>} />
        <Route path="/terms-of-service" element={<><Navbar /><TermsOfService /></>} />

        {/* Auth Pages - WITH Navbar */}
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/verify-otp" element={<><Navbar /><VerifyOTP /></>} />
        <Route path="/super-admin-login" element={<><Navbar /><SuperAdminLogin /></>} />
        <Route path="/system-control-panel-auth-gateway-x7k9m2p8q4w1" element={<><Navbar /><SuperAdminLogin /></>} />

        {/* Business Feature Pages - WITH Navbar */}
        <Route path="/onboard" element={<><Navbar /><Onboard /></>} />
        <Route path="/ai-customer-onboarding" element={<><Navbar /><AICustomerOnboarding /></>} />
        <Route path="/crm-assessment" element={<><Navbar /><CRMAssessment /></>} />
        <Route path="/automated-follow-ups" element={<><Navbar /><AutomatedFollowUps /></>} />
        <Route path="/smart-scheduling" element={<><Navbar /><SmartScheduling /></>} />
        <Route path="/multi-channel-support" element={<><Navbar /><MultiChannelSupport /></>} />
        <Route path="/review-boost" element={<><Navbar /><ReviewBoost /></>} />
        <Route path="/payment-solutions" element={<><Navbar /><PaymentSolutions /></>} />
        <Route path="/cost-tracking" element={<><Navbar /><CostTracking /></>} />
        <Route path="/live-chat" element={<><Navbar /><LiveChat /></>} />
        <Route path="/support-tickets" element={<><Navbar /><SupportTickets /></>} />
        <Route path="/contact-direct" element={<><Navbar /><ContactDirect /></>} />

        {/* Client Dashboard - WITH Sidebar Layout */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
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

        {/* Other Protected Routes - WITH Navbar */}
        <Route path="/account" element={<><Navbar /><ProtectedRoute><Account /></ProtectedRoute></>} />
        <Route path="/project-setup" element={<><Navbar /><ProtectedRoute><ProjectSetup /></ProtectedRoute></>} />
        <Route path="/project/:projectId" element={<><Navbar /><ProtectedRoute><ProjectOverview /></ProtectedRoute></>} />
        <Route path="/project/:projectId/pricing-phases" element={<><Navbar /><ProtectedRoute><ProjectPricingPhases /></ProtectedRoute></>} />
        <Route path="/payments-and-dues" element={<><Navbar /><ProtectedRoute><PaymentsAndDues /></ProtectedRoute></>} />
        <Route path="/status" element={<><Navbar /><ProtectedRoute><Status /></ProtectedRoute></>} />
        <Route path="/conversations" element={<><Navbar /><ProtectedRoute><Conversations /></ProtectedRoute></>} />
        <Route path="/previews" element={<><Navbar /><ProtectedRoute><Previews /></ProtectedRoute></>} />
        <Route path="/delivery-management" element={<><Navbar /><ProtectedRoute><DeliveryManagement /></ProtectedRoute></>} />
        <Route path="/demos-and-previews" element={<><Navbar /><ProtectedRoute><DemosAndPreviews /></ProtectedRoute></>} />

        {/* Super Admin Dashboard - WITH Sidebar Layout */}
        <Route path="/admin/*" element={
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
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="status" element={<AdminStatus />} />
        </Route>

        {/* Project Admin Routes - WITH Sidebar Layout */}
        <Route path="/admin/project/:projectId/*" element={
          <SuperAdminProtectedRoute>
            <ProjectAdminLayout />
          </SuperAdminProtectedRoute>
        }>
          <Route index element={<ProjectAdminOverview />} />
          <Route path="messages" element={<ProjectAdminMessages />} />
          <Route path="pricing-phases" element={<AdminProjectPricingPhases />} />
          <Route path="payments" element={<ProjectAdminPayments />} />
          <Route path="status" element={<ProjectAdminStatus />} />
          <Route path="delivery" element={<ProjectAdminDelivery />} />
          <Route path="demos" element={<ProjectAdminDemos />} />
          <Route path="demos-new" element={<ProjectAdminDemosNew />} />
          <Route path="previews" element={<ProjectAdminPreviews />} />
          <Route path="support" element={<ProjectAdminSupport />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<><Navbar /><NotFound /></>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
