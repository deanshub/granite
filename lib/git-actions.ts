'use server'

import { $ } from 'bun'

export async function commitChanges(message: string) {
  try {
    const rootDir = process.env.ROOT_DIR || process.cwd()
    
    // Use Bun's $ if available, otherwise fallback to execSync
    await $`git add . && git commit -m ${message}`.cwd(rootDir);
    await $`git push`.cwd(rootDir);
    
    return { success: true, message: 'Changes committed successfully' }
  } catch (error) {
    console.error('Git commit failed:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to commit changes' 
    }
  }
}
