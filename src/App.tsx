
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Author from "./pages/Author";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import GetStarted from "./pages/GetStarted";
import Onboard from "./pages/Onboard";
import ContactDirect from "./pages/ContactDirect";
import LiveChat from "./pages/LiveChat";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/author" element={<Author />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/onboard" element={<Onboard />} />
          <Route path="/contact-direct" element={<ContactDirect />} />
          <Route path="/live-chat" element={<LiveChat />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            {/* Placeholder routes for other sidebar items */}
            <Route path="conversations" element={<div className="p-4">Conversations Page - Coming Soon</div>} />
            <Route path="project-overview" element={<div className="p-4">Project Overview Page - Coming Soon</div>} />
            <Route path="demos" element={<div className="p-4">Demos & Previews Page - Coming Soon</div>} />
            <Route path="payments" element={<div className="p-4">Payments & Dues Page - Coming Soon</div>} />
            <Route path="status" element={<div className="p-4">Status Page - Coming Soon</div>} />
            <Route path="delivery" element={<div className="p-4">Delivery Management Page - Coming Soon</div>} />
            <Route path="support" element={<div className="p-4">Support Tickets Page - Coming Soon</div>} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
