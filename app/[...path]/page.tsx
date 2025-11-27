import { use } from 'react';
import { FileViewer } from '@/components/file-viewer';

export default function FilePage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = use(params);
  const filePath = path?.join('/') || 'page.tsx';
  
  return (
    <>
      {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div> */}
      <FileViewer filePath={filePath} />
    </>
  );
}
