
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  LineChart,
  LayoutGrid,
  MessageSquare,
  Mail,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/products', icon: Package, label: 'Sản phẩm' },
  { href: '/categories', icon: LayoutGrid, label: 'Danh mục' },
  { href: '/orders', icon: ShoppingCart, label: 'Đơn hàng', notificationCount: 6 },
  { href: '/consultations', icon: MessageSquare, label: 'Tư vấn' },
  { href: '/feedback', icon: Mail, label: 'Góp ý' },
  { href: '/customers', icon: Users, label: 'Khách hàng' },
  { href: '/analytics', icon: LineChart, label: 'Phân tích' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span className="">Admin Panel</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinks.map(({ href, icon: Icon, label, notificationCount }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname === href && 'bg-muted text-primary'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
                {notificationCount && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {notificationCount}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
         <div className="mt-auto p-4 border-t">
            <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4"/>
                Đăng xuất
            </Button>
        </div>
      </div>
    </div>
  );
}
