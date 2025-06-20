
import { AppSidebar } from '@/components/navigation/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import type React from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      {/* SidebarProvider's root div is already a flex container with min-h-svh and w-full */}
      <AppSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {children}
      </main>
    </SidebarProvider>
  );
}
