
import React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
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
  FolderKanban, 
  MessageSquare, 
  Monitor, 
  Eye,
  CreditCard, 
  Activity, 
  Truck, 
  HeadphonesIcon,
  Calculator,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function ProjectAdminLayout() {
  const location = useLocation();
  const { projectId } = useParams();

  const sidebarItems = [
    { title: 'Overview', icon: FolderKanban, url: `/admin/project/${projectId}` },
    { title: 'Messages', icon: MessageSquare, url: `/admin/project/${projectId}/messages` },
    { title: 'Pricing & Phases', icon: Calculator, url: `/admin/project/${projectId}/pricing-phases` },
    { title: 'Demos', icon: Monitor, url: `/admin/project/${projectId}/demos` },
    { title: 'Previews', icon: Eye, url: `/admin/project/${projectId}/previews` },
    { title: 'Payments', icon: CreditCard, url: `/admin/project/${projectId}/payments` },
    { title: 'Status', icon: Activity, url: `/admin/project/${projectId}/status` },
    { title: 'Delivery', icon: Truck, url: `/admin/project/${projectId}/delivery` },
    { title: 'Support', icon: HeadphonesIcon, url: `/admin/project/${projectId}/support` },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <FolderKanban className="text-white w-4 h-4" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Project Admin</h2>
                <p className="text-xs text-muted-foreground">Project Management</p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/admin" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Link>
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
              <h1 className="text-lg font-semibold text-red-700">Project Admin Panel</h1>
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
