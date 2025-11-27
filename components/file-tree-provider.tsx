import { getFileTree } from "@/lib/file-tree";
import { AppSidebar } from "./app-sidebar";

export function FileTreeProvider() {
  const fileTree = getFileTree(process.cwd());
  
  return <AppSidebar fileTree={fileTree} />;
}
