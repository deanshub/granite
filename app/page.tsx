import { FileText, FolderPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <div className="rounded-full bg-primary/10 p-4">
            <FolderPlus className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Granite</h1>
          <p className="text-lg text-muted-foreground max-w-md">
            A modern file explorer and editor. Create new files or browse existing ones to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
