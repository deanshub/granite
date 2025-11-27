'use server';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { redirect } from 'next/navigation';

export async function createFile(formData: FormData) {
  const filePath = formData.get("filepath") as string;
  try {
    const fullPath = join(process.env.ROOT_DIR || process.cwd(), decodeURIComponent(filePath));
    console.log({fullPath});
    const dir = dirname(fullPath);
    console.log({dir});
    // Create directory if it doesn't exist
    mkdirSync(dir, { recursive: true });
    console.log('Directory created');
    // Create empty file
    writeFileSync(fullPath, '');
    console.log('File created');
  } catch (error) {
    throw new Error('Failed to create file');
  }
  // Redirect to the new file
  redirect(`/${filePath}`);
}
