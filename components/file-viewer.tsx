import { readFileSync } from 'fs';
import { join } from 'path';

export function FileViewer({ filePath }: { filePath: string }) {
  let fileContent = '';
  try {
    const fullPath = join(process.cwd(), filePath);
    fileContent = readFileSync(fullPath, 'utf-8');
  } catch (error) {
    fileContent = 'File not found or cannot be read';
  }

  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl p-4">
      <pre className="text-sm overflow-auto whitespace-pre-wrap">{fileContent}</pre>
    </div>
  );
}
