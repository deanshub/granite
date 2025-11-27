import Image from "next/image";

export function TopNav() {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center space-x-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Logo"
            width={80}
            height={16}
          />
          <div className="h-6 w-px bg-border" />
          <span className="text-sm text-muted-foreground">
            Currently viewing: <span className="font-medium text-foreground">page.tsx</span>
          </span>
        </div>
      </div>
    </div>
  );
}
