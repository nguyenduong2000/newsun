
'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { Skeleton } from '../ui/skeleton';

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
        router.push(`/login?from=${pathname}`);
    }
  }, [isAuthenticated, isAuthLoading, router, pathname]);

  if (isAuthLoading || !isAuthenticated) {
    // You can show a loading spinner or a skeleton screen here
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full h-full p-8">
                <Skeleton className="w-full h-full rounded-lg"/>
            </div>
        </div>
    );
  }

  return <>{children}</>;
}
