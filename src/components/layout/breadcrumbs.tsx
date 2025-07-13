
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { products } from '@/lib/mock-data';

const pathTranslations: Record<string, string> = {
  products: 'Sản phẩm',
  contact: 'Liên hệ',
  cart: 'Giỏ hàng',
  checkout: 'Thanh toán',
  about: 'Về chúng tôi',
  stores: 'Chi nhánh/Đại lý',
  blog: 'Tin tức',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === '/') {
    return null;
  }

  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    let text = pathTranslations[segment] || segment;

    if (segment === 'products' && pathSegments[index + 1]) {
      const product = products.find(p => p.slug === pathSegments[index + 1]);
      if (product) {
        text = product.name;
        // This is a product page, so we will handle the full breadcrumb in the next iteration.
      }
    } else if (index > 0 && pathSegments[index - 1] === 'products') {
        const product = products.find(p => p.slug === segment);
        if(product) {
             text = product.name;
        } else {
             // It's a product slug, find it
            const product = products.find(p => p.slug === segment);
            text = product ? product.name : decodeURIComponent(segment);
        }
    }

    return { href, text };
  });

  const items = [{ href: '/', text: 'Trang chủ' }, ...breadcrumbItems];
  
  if (pathSegments.length > 1 && pathSegments[0] === 'products') {
    const productSlug = pathSegments[1];
    const product = products.find(p => p.slug === productSlug);
    if(product) {
        items.splice(1, 1, { href: '/products', text: 'Sản phẩm' });
        items[2] = { href: `/products/${productSlug}`, text: product.name };
    }
  }


  return (
    <div className="bg-muted/50 border-b">
      <nav className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 py-3 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <li key={item.href}>
              <div className="flex items-center">
                {index > 0 && <ChevronRight className="h-4 w-4 flex-shrink-0" />}
                <Link
                  href={item.href}
                  className={`ml-2 text-sm font-medium hover:text-primary ${
                    index === items.length - 1 ? 'text-foreground' : ''
                  }`}
                >
                  {index === 0 ? <Home className="h-4 w-4" /> : item.text}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
