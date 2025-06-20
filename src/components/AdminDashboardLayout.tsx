
import React from 'react';
import { Outlet } from 'react-router-dom';
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
  Shield, 
  Users, 
  FolderKanban, 
  BarChart3, 
  Settings, 
  Activity, 
  CreditCard, 
  MessageSquare,
  LogOut
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSuperAdmin } from '@/contexts/SuperAdminContext';
import { useToast } from '@/components/ui/use-toast';

const adminSidebarItems = [
  { title: 'Admin Overview', icon: Shield, url: '/admin' },
  { title: 'All Projects', icon: FolderKanban, url: '/admin/projects' },
  { title: 'Manage Clients', icon: Users, url: '/admin/clients' },
  { title: 'System Status', icon: Activity, url: '/admin/status' },
  { title: 'Payments', icon: CreditCard, url: '/admin/payments' },
  { title: 'Messages', icon: MessageSquare, url: '/admin/messages' },
  { title: 'Admin Settings', icon: Settings, url: '/admin/settings' },
];

export default function AdminDashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useSuperAdmin();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "Super admin session ended.",
    });
    navigate('/system-control-panel-auth-gateway-x7k9m2p8q4w1');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white w-4 h-4" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Admin Panel</h2>
                <p className="text-xs text-muted-foreground">Master Dashboard</p>
              </div>
            </div>
            <div className="mt-4">
              <Button 
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {adminSidebarItems.map((item) => (
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
              <h1 className="text-lg font-semibold text-red-700">Admin Control Panel</h1>
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
