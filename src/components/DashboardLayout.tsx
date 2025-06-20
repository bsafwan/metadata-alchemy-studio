
import React, { useState, useEffect } from 'react';
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
  Home, 
  MessageSquare, 
  FileText, 
  Monitor, 
  CreditCard, 
  Activity, 
  Truck, 
  HeadphonesIcon,
  User,
  Settings
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const sidebarItems = [
  { title: 'Dashboard', icon: Home, url: '/dashboard' },
  { title: 'Conversations', icon: MessageSquare, url: '/dashboard/conversations' },
  { title: 'Project Overview', icon: FileText, url: '/dashboard/project-overview' },
  { title: 'Demos & Previews', icon: Monitor, url: '/dashboard/demos' },
  { title: 'Payments & Dues', icon: CreditCard, url: '/dashboard/payments' },
  { title: 'Status', icon: Activity, url: '/dashboard/status' },
  { title: 'Delivery Management', icon: Truck, url: '/dashboard/delivery' },
  { title: 'Support Tickets', icon: HeadphonesIcon, url: '/dashboard/support' },
  { title: 'Account', icon: User, url: '/account' },
];

export default function DashboardLayout() {
  const location = useLocation();
  const { user } = useAuth();
  const [currentProject, setCurrentProject] = useState<any>(null);

  useEffect(() => {
    const loadCurrentProject = async () => {
      const selectedProjectId = localStorage.getItem('selected_project_id');
      if (selectedProjectId && user) {
        try {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', selectedProjectId)
            .eq('user_id', user.id)
            .single();

          if (!error && data) {
            setCurrentProject(data);
          }
        } catch (error) {
          console.error('Error loading current project:', error);
        }
      }
    };

    loadCurrentProject();
  }, [user]);

  const projectName = currentProject?.project_name || 'Project Dashboard';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-elismet-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div>
                <h2 className="font-semibold text-lg">Elismet</h2>
                <p className="text-xs text-muted-foreground">{projectName}</p>
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
          <header className="flex h-16 items-center gap-2 px-4 border-b">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">{projectName}</h1>
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
