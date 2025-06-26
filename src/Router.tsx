
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SuperAdminProtectedRoute from './components/SuperAdminProtectedRoute';
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
      <Navbar />
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<Index />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/custom-solution" element={<CustomSolution />} />
        <Route path="/author" element={<Author />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/super-admin-login" element={<SuperAdminLogin />} />

        {/* Protected Dashboard Pages */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/project-setup" element={<ProtectedRoute><ProjectSetup /></ProtectedRoute>} />
        <Route path="/project/:projectId" element={<ProtectedRoute><ProjectOverview /></ProtectedRoute>} />
        <Route path="/project/:projectId/pricing-phases" element={<ProtectedRoute><ProjectPricingPhases /></ProtectedRoute>} />
        <Route path="/payments-and-dues" element={<ProtectedRoute><PaymentsAndDues /></ProtectedRoute>} />
        <Route path="/status" element={<ProtectedRoute><Status /></ProtectedRoute>} />
        <Route path="/conversations" element={<ProtectedRoute><Conversations /></ProtectedRoute>} />
        <Route path="/previews" element={<ProtectedRoute><Previews /></ProtectedRoute>} />
        <Route path="/delivery-management" element={<ProtectedRoute><DeliveryManagement /></ProtectedRoute>} />
        <Route path="/demos-and-previews" element={<ProtectedRoute><DemosAndPreviews /></ProtectedRoute>} />

        {/* Business Feature Pages */}
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/ai-customer-onboarding" element={<AICustomerOnboarding />} />
        <Route path="/crm-assessment" element={<CRMAssessment />} />
        <Route path="/automated-follow-ups" element={<AutomatedFollowUps />} />
        <Route path="/smart-scheduling" element={<SmartScheduling />} />
        <Route path="/multi-channel-support" element={<MultiChannelSupport />} />
        <Route path="/review-boost" element={<ReviewBoost />} />
        <Route path="/payment-solutions" element={<PaymentSolutions />} />
        <Route path="/cost-tracking" element={<CostTracking />} />
        <Route path="/live-chat" element={<LiveChat />} />
        <Route path="/support-tickets" element={<SupportTickets />} />
        <Route path="/contact-direct" element={<ContactDirect />} />

        {/* Super Admin Dashboard Pages */}
        <Route path="/admin" element={<SuperAdminProtectedRoute><AdminDashboardHome /></SuperAdminProtectedRoute>} />
        <Route path="/admin/clients" element={<SuperAdminProtectedRoute><AdminClients /></SuperAdminProtectedRoute>} />
        <Route path="/admin/projects" element={<SuperAdminProtectedRoute><AdminProjects /></SuperAdminProtectedRoute>} />
        <Route path="/admin/project/:projectId/pricing-phases" element={<SuperAdminProtectedRoute><AdminProjectPricingPhases /></SuperAdminProtectedRoute>} />
        <Route path="/admin/messages" element={<SuperAdminProtectedRoute><AdminMessages /></SuperAdminProtectedRoute>} />
        <Route path="/admin/payments" element={<SuperAdminProtectedRoute><AdminPayments /></SuperAdminProtectedRoute>} />
        <Route path="/admin/quote-inquiries" element={<SuperAdminProtectedRoute><AdminQuoteInquiries /></SuperAdminProtectedRoute>} />
        <Route path="/admin/analytics" element={<SuperAdminProtectedRoute><AdminAnalytics /></SuperAdminProtectedRoute>} />
        <Route path="/admin/settings" element={<SuperAdminProtectedRoute><AdminSettings /></SuperAdminProtectedRoute>} />
        <Route path="/admin/status" element={<SuperAdminProtectedRoute><AdminStatus /></SuperAdminProtectedRoute>} />

        {/* Project Admin Pages */}
        <Route path="/admin/project/:projectId" element={<SuperAdminProtectedRoute><ProjectAdminOverview /></SuperAdminProtectedRoute>} />
        <Route path="/admin/project/:projectId/messages" element={<SuperAdminProtectedRoute><ProjectAdminMessages /></SuperAdminProtectedRoute>} />
        <Route path="/admin/project/:projectId/payments" element={<SuperAdminProtectedRoute><ProjectAdminPayments /></SuperAdminProtectedRoute>} />
        <Route path="/admin/project/:projectId/status" element={<SuperAdminProtectedRoute><ProjectAdminStatus /></SuperAdminProtectedRoute>} />
        <Route path="/admin/project/:projectId/delivery" element={<SuperAdminProtectedRoute><ProjectAdminDelivery /></SuperAdminProtectedRoute>} />
        <Route path="/admin/project/:projectId/demos" element={<SuperAdminProtectedRoute><ProjectAdminDemos /></SuperAdminProtectedRoute>} />
        <Route path="/admin/project/:projectId/demos-new" element={<SuperAdminProtectedRoute><ProjectAdminDemosNew /></SuperAdminProtectedRoute>} />
        <Route path="/admin/project/:projectId/previews" element={<SuperAdminProtectedRoute><ProjectAdminPreviews /></SuperAdminProtectedRoute>} />
        <Route path="/admin/project/:projectId/support" element={<SuperAdminProtectedRoute><ProjectAdminSupport /></SuperAdminProtectedRoute>} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
