
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
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
  ArrowLeft,
  Calculator
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const projectSidebarItems = [
  { title: 'Project Overview', icon: Home, url: '' },
  { title: 'Messages', icon: MessageSquare, url: '/messages' },
  { title: 'Pricing & Phases', icon: Calculator, url: '/pricing-phases' },
  { title: 'Demos & Previews', icon: Monitor, url: '/demos' },
  { title: 'Payments', icon: CreditCard, url: '/payments' },
  { title: 'Status', icon: Activity, url: '/status' },
  { title: 'Delivery', icon: Truck, url: '/delivery' },
  { title: 'Support Tickets', icon: HeadphonesIcon, url: '/support' },
];

export default function ProjectAdminLayout() {
  const location = useLocation();
  const { projectId } = useParams();
  
  // Mock project data - in real app this would come from API
  const projectName = "E-commerce Platform";
  const clientName = "Tech Solutions Inc";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/projects" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Projects
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="text-white w-4 h-4" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{projectName}</h2>
                <p className="text-xs text-muted-foreground">{clientName}</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {projectSidebarItems.map((item) => {
                const fullUrl = `/admin/project/${projectId}${item.url}`;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location.pathname === fullUrl}>
                      <Link to={fullUrl} className="flex items-center gap-3 px-3 py-2">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center gap-2 px-4 border-b bg-blue-50">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-blue-700">Project Management: {projectName}</h1>
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
