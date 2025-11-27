import { readFileSync } from 'fs';
import { join } from 'path';
import { TiptapEditor } from './tiptap-editor';

export function FileViewer({ filePath }: { filePath: string }) {
  try {
    const fullPath = join( process.env.ROOT_DIR || process.cwd(), decodeURIComponent(filePath));
    const fileContent = readFileSync(fullPath, 'utf-8');
    return (
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl p-4">
        <TiptapEditor content={fileContent} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl p-4">
        <p className="text-muted-foreground">File not found or cannot be read</p>
      </div>
    );
  }

}
