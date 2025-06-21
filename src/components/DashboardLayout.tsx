
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset 
} from '@/components/ui/sidebar';
import { 
  Home,
  MessageSquare, 
  Eye,
  CreditCard, 
  Truck, 
  Calculator
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const sidebarItems = [
  { title: 'Dashboard', icon: Home, url: '/dashboard' },
  { title: 'Conversations', icon: MessageSquare, url: '/dashboard/conversations' },
  { title: 'Pricing & Phases', icon: Calculator, url: '/dashboard/pricing-phases' },
  { title: 'Previews', icon: Eye, url: '/dashboard/previews' },
  { title: 'Payments & Dues', icon: CreditCard, url: '/dashboard/payments' },
  { title: 'Delivery', icon: Truck, url: '/dashboard/delivery' },
];

export default function DashboardLayout() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-elismet-orange rounded-lg flex items-center justify-center">
                <Eye className="text-white w-4 h-4" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Dashboard</h2>
                <p className="text-xs text-muted-foreground">{user?.business_name}</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center gap-2 px-4 border-b bg-elismet-orange/5">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-elismet-orange">Client Dashboard</h1>
            </div>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
