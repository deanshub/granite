import { join } from "path";
import { readFileSync } from "fs";

export function ImageViewer({ filePath }: { filePath: string }) {
  const fullPath = join( process.env.ROOT_DIR || process.cwd(), decodeURIComponent(filePath));
  
  try {
    const imageBuffer = readFileSync(fullPath);
    const base64Image = `data:image/${filePath.split('.').pop()};base64,${imageBuffer.toString('base64')}`;
    
    return (
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl p-4 flex items-center justify-center">
        <img
          src={base64Image}
          alt={filePath}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl p-4 flex items-center justify-center">
        <p className="text-muted-foreground">Image not found or cannot be loaded</p>
      </div>
    );
  }
}
