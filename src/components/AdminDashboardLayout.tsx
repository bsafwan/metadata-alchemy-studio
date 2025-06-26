
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
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  CreditCard, 
  MessageSquare, 
  Settings,
  Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSuperAdmin } from '@/contexts/SuperAdminContext';
import { Button } from '@/components/ui/button';

const sidebarItems = [
  { title: 'Dashboard', icon: LayoutDashboard, url: '/admin' },
  { title: 'Clients', icon: Users, url: '/admin/clients' },
  { title: 'Projects', icon: FolderKanban, url: '/admin/projects' },
  { title: 'Payments', icon: CreditCard, url: '/admin/payments' },
  { title: 'Messages', icon: MessageSquare, url: '/admin/messages' },
  { title: 'Quote Inquiries', icon: Quote, url: '/admin/quote-inquiries' },
  { title: 'Settings', icon: Settings, url: '/admin/settings' },
];

export default function AdminDashboardLayout() {
  const location = useLocation();
  const { logout } = useSuperAdmin();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="text-white w-4 h-4" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Super Admin</h2>
                <p className="text-xs text-muted-foreground">System Control Panel</p>
              </div>
            </div>
            <Button onClick={logout} variant="outline" size="sm" className="w-full">
              Logout
            </Button>
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
          <header className="flex h-16 items-center gap-2 px-4 border-b bg-red-50">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-red-700">Super Admin Panel</h1>
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
