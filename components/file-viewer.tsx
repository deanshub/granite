import { readFileSync } from 'fs';
import { join } from 'path';
import { TiptapEditor } from './tiptap-editor';

export function FileViewer({ filePath }: { filePath: string }) {
  let fileContent = '';
  try {
    const fullPath = join( process.env.ROOT_DIR || process.cwd(), decodeURIComponent(filePath));
    fileContent = readFileSync(fullPath, 'utf-8');
  } catch (error) {
    fileContent = 'File not found or cannot be read';
  }

  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl p-4">
      <TiptapEditor content={fileContent} />
    </div>
  );
}
