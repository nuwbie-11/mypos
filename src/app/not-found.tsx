import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-6 p-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="max-w-md text-base text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have
            been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <div className="pt-4">
          <Link href="/" passHref>
            <Button variant="default">Go Back Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}