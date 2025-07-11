"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingCart,
  Phone,
  User,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/lib/mock-data";
import type { NavItem } from "@/types";

const Logo = () => (
  <Link href="/" className="font-headline text-2xl font-bold text-primary">
    NEWSUN
  </Link>
);

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm">
                <div className="p-4">
                  <Logo />
                  <nav className="mt-8 flex flex-col space-y-2">
                    {navItems.map((item) =>
                      item.children ? (
                        <MobileSubMenu key={item.title} item={item} setOpen={setOpen} />
                      ) : (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="py-2 text-lg font-medium"
                          onClick={() => setOpen(false)}
                        >
                          {item.title}
                        </Link>
                      )
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Logo />
            <DesktopNavigation />
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Tìm kiếm sản phẩm..." className="pl-10 w-40 md:w-64" />
            </div>
            <Button variant="ghost" size="icon">
              <Phone className="h-6 w-6" />
              <span className="sr-only">Hotline</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Giỏ hàng</span>
            </Button>
             <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
              <span className="sr-only">Tài khoản</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

const DesktopNavigation = () => (
  <NavigationMenu>
    <NavigationMenuList>
      {navItems.map((item) =>
        item.children ? (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {item.children.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem key={item.title}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )
      )}
    </NavigationMenuList>
  </NavigationMenu>
);

const MobileSubMenu = ({ item, setOpen }: { item: NavItem, setOpen: (open: boolean) => void }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between items-center py-2 text-lg font-medium"
        onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
      >
        <span>{item.title}</span>
        <ChevronRight className={cn("h-5 w-5 transition-transform", isSubMenuOpen && "rotate-90")} />
      </div>
      {isSubMenuOpen && item.children && (
        <div className="pl-4 flex flex-col space-y-2 mt-2">
          {item.children.map((child) => (
            <Link
              key={child.title}
              href={child.href}
              className="py-2 text-base text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
