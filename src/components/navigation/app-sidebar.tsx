
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Home, ListChecks, Cpu, BarChart3, DollarSign, Settings, LogOut, type LucideIcon, HelpCircle, FileSearch } from 'lucide-react';
import { BatIcon, BallIcon, StadiumIcon } from '@/components/icons/cricket-icons';
import Image from 'next/image';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon | React.ElementType;
  matchSegments?: number; // Number of path segments to match for active state
}

const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home, matchSegments: 1 },
  { href: '/predictions', label: 'Predictions', icon: Cpu, matchSegments: 1 },
  { href: '/matches', label: 'Matches', icon: BallIcon, matchSegments: 1 },
  { href: '/historical-data', label: 'Historical Data', icon: BarChart3, matchSegments: 1 },
  { href: '/analyze-dataset', label: 'Analyze Dataset', icon: FileSearch, matchSegments: 1 },
  { href: '/betting-sites', label: 'Betting Sites', icon: DollarSign, matchSegments: 1 },
];

const secondaryNavItems: NavItem[] = [
  { href: '/settings', label: 'Settings', icon: Settings, matchSegments: 1 },
  { href: '/help', label: 'Help', icon: HelpCircle, matchSegments: 1 },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, matchSegments?: number) => {
    if (matchSegments) {
      const pathSegments = pathname.split('/').filter(Boolean);
      const hrefSegments = href.split('/').filter(Boolean);
      return hrefSegments.every((segment, i) => pathSegments[i] === segment) && pathSegments.length >= hrefSegments.length;
    }
    return pathname === href;
  };
  
  return (
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4 flex items-center gap-2">
           <Link href="/dashboard" className="flex items-center gap-2 group-data-[[data-collapsible=icon]]:hidden">
            <BatIcon className="h-8 w-8 text-primary" />
            <h2 className="text-xl font-semibold text-primary font-headline">IPL Forecaster</h2>
          </Link>
          <SidebarTrigger className="ml-auto group-data-[[data-collapsible=icon]]:hidden" />
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href, item.matchSegments)}
                  tooltip={{ children: item.label, className: "font-headline" }}
                  className="font-body"
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[[data-collapsible=icon]]:hidden">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 mt-auto">
           <Separator className="my-2 group-data-[[data-collapsible=icon]]:hidden" />
           <SidebarMenu>
            {secondaryNavItems.map((item) => (
                 <SidebarMenuItem key={item.label}>
                   <SidebarMenuButton
                     asChild
                     isActive={isActive(item.href, item.matchSegments)}
                     tooltip={{ children: item.label, className: "font-headline" }}
                     className="font-body"
                   >
                     <Link href={item.href}>
                       <item.icon className="h-5 w-5" />
                       <span className="group-data-[[data-collapsible=icon]]:hidden">{item.label}</span>
                     </Link>
                   </SidebarMenuButton>
               </SidebarMenuItem>
            ))}
             <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip={{ children: "Logout", className: "font-headline"}} 
                  className="font-body text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => alert("Logout functionality not implemented.")}
                 >
                    <LogOut className="h-5 w-5" />
                    <span className="group-data-[[data-collapsible=icon]]:hidden">Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
  );
}
