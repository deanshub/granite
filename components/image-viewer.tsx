/* eslint-disable react-hooks/error-boundaries */
import { join } from "path";
import { readFileSync } from "fs";

export function ImageViewer({ filePath }: { filePath: string }) {
  try {
    const fullPath = join(process.cwd(), filePath);
    const imageBuffer = readFileSync(fullPath);
    const base64Image = `data:image/${filePath.split('.').pop()};base64,${imageBuffer.toString('base64')}`;
    return (
      <div className="bg-muted/50 min-h-screen flex-1 rounded-xl p-4 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={base64Image}
          alt={filePath}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    );
  } catch {
    return (
      <div className="bg-muted/50 min-h-screen flex-1 rounded-xl p-4 flex items-center justify-center">
        <p className="text-muted-foreground">Image not found or cannot be loaded</p>
      </div>
    );
  }
}
