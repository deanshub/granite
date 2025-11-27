'use client';
import Image from "next/image";
import Link from "next/link";
import { FileText, FolderPlus, ArrowUpDown, ChevronUp, Folder, FolderOpen, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { useState } from "react";

const fileTree = [
  {
    name: "app",
    type: "folder",
    children: [
      { name: "layout.tsx", type: "file" },
      { name: "page.tsx", type: "file" },
      { name: "globals.css", type: "file" },
    ]
  },
  {
    name: "components",
    type: "folder", 
    children: [
      { name: "app-sidebar.tsx", type: "file" },
      { name: "top-nav.tsx", type: "file" },
      {
        name: "ui",
        type: "folder",
        children: [
          { name: "button.tsx", type: "file" },
          { name: "sidebar.tsx", type: "file" },
          { name: "tooltip.tsx", type: "file" },
        ]
      }
    ]
  },
  { name: "package.json", type: "file" },
  { name: "README.md", type: "file" },
];

function FileTreeItem({ item, level = 0, basePath = "" }: { item: any, level?: number, basePath?: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const fullPath = basePath ? `${basePath}/${item.name}` : item.name;
  
  if (item.type === "file") {
    // For root files, don't add extra path
    const linkPath = level === 0 ? `/${item.name}` : `/${fullPath}`;
    return (
      <Link href={linkPath} className={`flex items-center gap-2 py-1 px-2 hover:bg-accent rounded-sm cursor-pointer`} style={{ paddingLeft: `${level * 12 + 8}px` }}>
        <File className="h-4 w-4 text-blue-500" />
        <span className="text-sm">{item.name}</span>
      </Link>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className={`flex items-center gap-2 py-1 px-2 hover:bg-accent rounded-sm cursor-pointer`} style={{ paddingLeft: `${level * 12 + 8}px` }}>
          {isOpen ? <FolderOpen className="h-4 w-4 text-yellow-500" /> : <Folder className="h-4 w-4 text-yellow-500" />}
          <span className="text-sm">{item.name}</span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {item.children?.map((child: any, index: number) => (
          <FileTreeItem key={index} item={child} level={level + 1} basePath={fullPath} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Logo"
          width={80}
          height={16}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-center p-2">
            <TooltipProvider>
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>New File</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <FolderPlus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>New Folder</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Change Sort Order</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Collapse All</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
          <SidebarGroupContent>
            <div className="space-y-1">
              {fileTree.map((item, index) => (
                <FileTreeItem key={index} item={item} />
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
