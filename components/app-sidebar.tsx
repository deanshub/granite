'use client';
import Image from "next/image";
import { FileText, ArrowUpDown, ChevronUp, ChevronDown, Folder, FolderOpen, File } from "lucide-react";
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
} from "@/components/ui/sidebar";
import React, { useState } from "react";
import { type FileTreeItem  } from "@/lib/file-tree";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { NewFileModal } from "./new-file-modal";
import Link from "next/link";

function FileTreeItem({ item, level = 0, basePath = "", isCollapsed = false }: { item: FileTreeItem, level?: number, basePath?: string, isCollapsed?: boolean }) {
  const [isOpen, setIsOpen] = useState(!isCollapsed);
  const fullPath = basePath ? `${basePath}/${item.name}` : item.name;
  
  React.useEffect(() => {
    setIsOpen(!isCollapsed);
  }, [isCollapsed]);
  
  if (item.type === "file") {
    // For root files, don't add extra path
    const linkPath = level === 0 ? `/${item.name}` : `/${fullPath}`;
    return (
      <Link href={linkPath}
        prefetch={false}
        className={`flex items-center gap-2 py-1 px-2 hover:bg-accent rounded-sm cursor-pointer`} 
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        <File className="h-4 w-4 text-blue-500" />
        <span className="text-sm">{item.name.replace(/\.md$/, '')}</span>
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
        {item.children?.map((child: FileTreeItem, index: number) => (
          <FileTreeItem key={index} item={child} level={level + 1} basePath={fullPath} isCollapsed={isCollapsed} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function AppSidebar({ fileTree }: { fileTree: FileTreeItem[] }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sortOrder, setSortOrder] = useState<'name' | 'type'>('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewFileModal, setShowNewFileModal] = useState(false);

  const sortedFileTree = [...fileTree].sort((a, b) => {
    if (sortOrder === 'type') {
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }
    }
    return a.name.localeCompare(b.name);
  });

  const sortChildren = (items: FileTreeItem[]): FileTreeItem[] => {
    return items.map(item => ({
      ...item,
      children: item.children ? sortChildren(item.children.sort((a: FileTreeItem, b: FileTreeItem) => {
        if (sortOrder === 'type') {
          if (a.type !== b.type) {
            return a.type === 'folder' ? -1 : 1;
          }
        }
        return a.name.localeCompare(b.name);
      })) : undefined
    }));
  };

  const filterTree = (items: FileTreeItem[]): FileTreeItem[] => {
    if (!searchTerm) return items;
    
    return items.filter(item => {
      if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      if (item.children) {
        const filteredChildren = filterTree(item.children);
        return filteredChildren.length > 0;
      }
      return false;
    }).map(item => ({
      ...item,
      children: item.children ? filterTree(item.children) : undefined
    }));
  };

  const finalSortedTree = sortChildren(filterTree(sortedFileTree));
  return (
    <Sidebar>
      <SidebarHeader>
        <Link 
          href="/"
        >
          <Image
            width={80}
            height={20}
            src="/granite.png"
            alt="Granite Logo"
            className="object-contain mx-auto"
          />
        </Link>

        <div className="flex items-center justify-center p-2">
            <TooltipProvider>
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 cursor-pointer" onClick={() => setShowNewFileModal(true)}>
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>New File</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 cursor-pointer" onClick={() => setSortOrder(sortOrder === 'name' ? 'type' : 'name')}>
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Sort by {sortOrder === 'name' ? 'Type' : 'Name'}</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
                      {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isCollapsed ? "Expand All" : "Collapse All"}</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
          <div className="px-2 pb-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="space-y-1">
              {finalSortedTree.map((item, index) => (
                <FileTreeItem key={index} item={item} isCollapsed={isCollapsed} />
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <NewFileModal 
        open={showNewFileModal} 
        onOpenChange={setShowNewFileModal} 
      />
    </Sidebar>
  )
}
