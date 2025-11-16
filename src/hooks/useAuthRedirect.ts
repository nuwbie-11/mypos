import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

export function useAuthRedirect() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !user) {
      router.push('/en/auth/sign-in'); // Adjust this path based on your locale needs
    }
  }, [isAuthenticated, user, router]);

  return { isAuthenticated, user };
}