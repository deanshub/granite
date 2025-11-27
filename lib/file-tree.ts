import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export interface FileTreeItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileTreeItem[];
}

export function getFileTree(dirPath: string): FileTreeItem[] {
  try {
    const items = readdirSync(dirPath);
    
    return items
      .filter(item => !item.startsWith('.')) // Skip hidden files
      .map(item => {
        const fullPath = join(dirPath, item);
        const stats = statSync(fullPath);
        
        if (stats.isDirectory()) {
          return {
            name: item,
            type: 'folder' as const,
            children: getFileTree(fullPath)
          };
        } else {
          return {
            name: item,
            type: 'file' as const
          };
        }
      });
  } catch (error) {
    return [];
  }
}
