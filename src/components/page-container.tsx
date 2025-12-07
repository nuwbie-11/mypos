import React from "react";
import { ScrollArea } from "./ui/scroll-area";

interface PageContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export default function PageContainer({
  children,
  scrollable = true,
}: PageContainerProps) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100vh-112px)]">
          <div className="h-full p-4 md:px-8">{children}</div>
        </ScrollArea>
      ) : (
        <div className="h-full p-4 md:px-8">{children}</div>
      )}
    </>
  );
}
