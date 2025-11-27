import { use } from 'react';

export default function FilePage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = use(params);
  const filePath = path?.join('/') || 'page.tsx';
  
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Viewing: {filePath}</h2>
          <p className="text-muted-foreground">File content would be displayed here</p>
        </div>
      </div>
    </>
  );
}
