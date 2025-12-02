'use client';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { BranchSelector } from "@/components/branch-selector";
import ModeToggle from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GitCommit } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { type FileTreeItem } from "@/lib/file-tree";
import { AppSidebar } from "@/components/app-sidebar";
import { useServiceWorker } from "@/hooks/use-service-worker";
import { commitChanges } from "@/lib/git-actions";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";

export function LayoutClient({ 
  children, 
  fileTree,
  branches
}: { 
  children: React.ReactNode;
  fileTree: FileTreeItem[];
  branches?: { value: string, label: string }[];
}) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const fileName = pathSegments[pathSegments.length - 1];
  const folderPath = pathSegments.length > 1 ? pathSegments.slice(0, -1).join('/') :  'root';
  const [isCommitting, setIsCommitting] = useState(false);

  useServiceWorker();

  const handleCommit = async () => {
    setIsCommitting(true);
    try {
      const result = await commitChanges('Update files via Granite');
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error('Failed to commit changes');
    } finally {
      setIsCommitting(false);
    }
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar fileTree={fileTree} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    {folderPath}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{fileName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex-1 flex justify-center">
              {
                branches ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="cursor-pointer"
                    onClick={handleCommit}
                    disabled={isCommitting}
                  >
                    <GitCommit className="h-4 w-4" />
                    {isCommitting ? 'Committing...' : 'Commit Changes'}
                  </Button>
                ): null
              }
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle />
              {
                branches ? (
                  <BranchSelector branches={branches} />
                ) : null
              }
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4">
            {children}
          </main>
        </SidebarInset>
        <Toaster closeButton richColors />
      </SidebarProvider>
    </ThemeProvider>
  );
}
