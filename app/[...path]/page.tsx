import { use } from 'react';
import { FileViewer } from '@/components/file-viewer';
import { ImageViewer } from '@/components/image-viewer';

export default function FilePage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = use(params);
  const filePath = path?.join('/') || 'page.tsx';
  
  // Check if file is an image
  const isImage = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(filePath);
  
  return (
    <>
      {isImage ? (
        <ImageViewer filePath={filePath} />
      ) : (
        <FileViewer filePath={filePath} />
      )}
    </>
  );
}
