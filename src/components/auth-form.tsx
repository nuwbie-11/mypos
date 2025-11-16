import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type AuthFormType = "signin" | "signup";

interface AuthFormProps {
  title: string;
  description: string;
  formType: AuthFormType;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  submitButtonText: string;
}

export default function AuthForm({
  title,
  description,
  formType,
  children,
  onSubmit,
  isLoading,
  submitButtonText,
}: AuthFormProps) {
  const isSignIn = formType === "signin";

  return (
    <div className="h-dvh flex items-center justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              {children}
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading
                  ? `${isSignIn ? "Signing in..." : "Creating account..."}`
                  : submitButtonText}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-muted-foreground">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <Link
              href={isSignIn ? "/en/auth/sign-up" : "/en/auth/sign-in"}
              className="text-primary hover:underline"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </Link>
          </p>
          {isSignIn && (
            <p className="text-xs text-muted-foreground mt-2">
              Demo credentials: admin@example.com / password123
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
