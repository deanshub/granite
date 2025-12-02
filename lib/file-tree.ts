import { readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { $ } from 'bun';

export interface FileTreeItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileTreeItem[];
}

async function cloneRepoIfNeeded(dirPath: string) {
  const repoUrl = process.env.REPO_URL;
  
  if (!repoUrl) return;
  
  const isEmpty = !existsSync(dirPath) || readdirSync(dirPath).length === 0;
  
  if (isEmpty) {
    try {
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }
      
      // Use Bun's $ if available, otherwise fallback to execSync
      if (typeof Bun !== 'undefined') {
        await $`git clone ${repoUrl} ${dirPath}`;
      } else {
        execSync(`git clone ${repoUrl} ${dirPath}`, { stdio: 'inherit' });
      }
    } catch (error) {
      console.error('Failed to clone repository:', error);
    }
  }
}

export async function getFileTree(dirPath: string): Promise<FileTreeItem[]> {
  try {
    // Clone repo if directory is empty and REPO_URL is provided
    await cloneRepoIfNeeded(dirPath);
    
    const items = readdirSync(dirPath);
    
    const results = await Promise.all(
      items
        .filter(item => !item.startsWith('.')) // Skip hidden files
        .map(async item => {
          const fullPath = join(dirPath, item);
          const stats = statSync(fullPath);
          
          if (stats.isDirectory()) {
            return {
              name: item,
              type: 'folder' as const,
              children: await getFileTree(fullPath)
            };
          } else {
            return {
              name: item,
              type: 'file' as const
            };
          }
        })
    );
    
    return results;
  } catch {
    return [];
  }
}
