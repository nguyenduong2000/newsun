

"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  MessageSquare,
  Phone,
  ChevronRight,
  ChevronDown,
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/lib/mock-data";
import type { NavItem, MegaMenuCategory, ApiCategory } from "@/types";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "../ui/dropdown-menu";
import { getCategories } from "@/services/api";
import { mapCategoriesToMegaMenu } from "@/lib/data-mapper";
import { Skeleton } from "../ui/skeleton";

const Logo = () => (
  <Link href="/" className="block">
    <div className="font-headline text-3xl sm:text-4xl font-bold text-primary tracking-tighter">
      NEWSUN
    </div>
    <div className="text-xs text-muted-foreground font-semibold -mt-1">
      CHUYÊN GIA MÁY THỰC PHẨM
    </div>
  </Link>
);

const CartIcon = () => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <Button variant="ghost" asChild>
      <Link href="/cart" className="relative">
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {itemCount}
          </span>
        )}
        <span className="sr-only">Giỏ hàng</span>
      </Link>
    </Button>
  );
};

const AuthNav = () => {
    const { isAuthenticated, user, logout } = useAuth();

    if (isAuthenticated && user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://placehold.co/40x40.png" alt={user.name} data-ai-hint="person" />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Đăng xuất</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <Button asChild>
            <Link href="/login">
                <User className="mr-2" />
                Đăng nhập
            </Link>
        </Button>
    )

}

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [megaMenuData, setMegaMenuData] = React.useState<MegaMenuCategory[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = React.useState(true);
  
  React.useEffect(() => {
    async function fetchMenuData() {
      try {
        setIsLoadingMenu(true);
        const apiData = await getCategories();
        const mappedData = mapCategoriesToMegaMenu(apiData);
        setMegaMenuData(mappedData);
      } catch (error) {
        console.error("Failed to fetch categories for menu:", error);
      } finally {
        setIsLoadingMenu(false);
      }
    }
    fetchMenuData();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4 md:gap-8 max-w-6xl mx-auto">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="flex-1 flex justify-center lg:justify-start">
             <div className="relative hidden sm:block w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm..."
                className="pl-10 w-full border-2 focus-visible:ring-primary"
              />
            </div>
          </div>
         
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            <CartIcon />
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-primary"/>
              <div>
                <p className="text-sm font-semibold">Tư vấn bán hàng</p>
                <p className="text-lg font-bold text-primary">0366635562</p>
              </div>
            </div>
            <AuthNav />
            <Button>Tư vấn chọn mua</Button>
          </div>
          
           <div className="lg:hidden flex items-center">
            <CartIcon />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm p-0">
                <MobileMenu setOpen={setOpen} megaMenu={megaMenuData} isLoading={isLoadingMenu} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <nav className="hidden lg:flex bg-primary text-primary-foreground">
        <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 flex items-center max-w-6xl">
            <MegaMenu megaMenu={megaMenuData} isLoading={isLoadingMenu}/>
            <div className="h-6 w-px bg-primary-foreground/30 mx-2"></div>
            <DesktopNavigation />
        </div>
      </nav>
    </header>
  );
}

const MegaMenu = ({ megaMenu, isLoading }: { megaMenu: MegaMenuCategory[], isLoading: boolean }) => {
    const [activeCategory, setActiveCategory] = React.useState<MegaMenuCategory | null>(null);

    React.useEffect(() => {
        if (!isLoading && megaMenu.length > 0) {
            setActiveCategory(megaMenu[0]);
        }
    }, [isLoading, megaMenu]);

    if (isLoading) {
        return (
            <div className="flex items-center h-12 p-4">
                <Skeleton className="h-6 w-64 bg-white/20" />
            </div>
        );
    }
    
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 focus:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10 font-bold text-base h-12 p-4">
                        <Menu className="mr-2"/>
                        Tất cả danh mục sản phẩm
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid grid-cols-5 gap-4 p-4 md:w-[1000px]">
                           <div className="col-span-1">
                             <ul className="space-y-1">
                                {megaMenu.map(category => (
                                    <li key={category.title} onMouseEnter={() => setActiveCategory(category)}>
                                        <NavigationMenuLink asChild>
                                             <Link href={category.href} className={cn("flex items-center justify-between p-2 text-sm font-medium rounded-md hover:bg-accent focus:outline-none focus:bg-accent transition-colors group",
                                                activeCategory?.title === category.title ? "bg-accent" : ""
                                             )}>
                                                <span>{category.title}</span>
                                                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                             </ul>
                           </div>
                           <div className="col-span-4 p-4 bg-accent/50 rounded-md min-h-[200px]">
                                {activeCategory && activeCategory.children && activeCategory.children.length > 0 && (
                                  <div className="grid grid-cols-4 gap-x-6 gap-y-4">
                                      {activeCategory.children.map(subCategory => (
                                          <div key={subCategory.title}>
                                              <h3 className="font-bold text-primary mb-2 text-sm">
                                                  <Link href={subCategory.href} className="hover:underline">{subCategory.title}</Link>
                                              </h3>
                                              <ul className="space-y-1.5">
                                                  {subCategory.children?.map(item => (
                                                      <li key={item.title}>
                                                          <Link href={item.href} className="text-sm hover:text-primary transition-colors text-muted-foreground hover:text-foreground">{item.title}</Link>
                                                      </li>
                                                  ))}
                                              </ul>
                                          </div>
                                      ))}
                                  </div>
                                )}
                           </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const DesktopNavigation = () => (
  <div className="flex items-center space-x-1">
      {navItems.map((item) => (
         <Link key={item.title} href={item.href} className="px-4 py-2 text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
            {item.title}
        </Link>
      ))}
  </div>
);


const MobileMenu = ({ setOpen, megaMenu, isLoading }: { setOpen: (open: boolean) => void, megaMenu: MegaMenuCategory[], isLoading: boolean }) => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className="h-full flex flex-col">
       <div className="p-4 border-b">
         <Logo />
       </div>
        <div className="p-4 flex-1 overflow-y-auto">
            <nav className="flex flex-col space-y-1">
                 {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-8 w-2/3" />
                    </div>
                 ) : megaMenu.map((item) =>
                  item.children ? (
                    <MobileSubMenu key={item.title} item={item} setOpen={setOpen} level={0} />
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
                <div className="border-t my-4"></div>
                 {navItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="py-2 text-base font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                ))}
                 <div className="border-t my-4"></div>
                 {isAuthenticated ? (
                    <>
                        <Link href="/admin/dashboard" className="py-2 text-base font-medium" onClick={() => setOpen(false)}>Dashboard</Link>
                        <button onClick={() => { logout(); setOpen(false); }} className="py-2 text-base font-medium text-left">Đăng xuất</button>
                    </>
                 ) : (
                    <Link
                        href="/login"
                        className="py-2 text-base font-medium"
                        onClick={() => setOpen(false)}
                        >
                        Đăng nhập / Đăng ký
                    </Link>
                 )}
            </nav>
        </div>
         <div className="p-4 border-t bg-muted/50">
            <div className="flex items-center space-x-2">
                 <Phone className="w-5 h-5 text-primary"/>
                <div>
                  <p className="text-xs">Tư vấn bán hàng</p>
                  <p className="text-sm font-bold text-primary">0366635562</p>
                </div>
            </div>
         </div>
    </div>
  );
};


const MobileSubMenu = ({ item, setOpen, level }: { item: MegaMenuCategory, setOpen: (open: boolean) => void, level: number }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

  const paddingLeft = `${(level + 1) * 1}rem`;

  const handleLinkClick = () => {
    setOpen(false);
  }

  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between items-center py-2 font-medium"
        onClick={() => hasChildren && setIsSubMenuOpen(!isSubMenuOpen)}
        style={{ paddingLeft: level > 0 ? paddingLeft : '0' }}
      >
        <Link href={item.href} onClick={handleLinkClick}>{item.title}</Link>
        {hasChildren && <ChevronDown className={cn("h-5 w-5 transition-transform", isSubMenuOpen && "rotate-180")} />}
      </div>
      {isSubMenuOpen && hasChildren && (
        <div className="flex flex-col space-y-1 mt-1">
          {item.children?.map((child) => (
             <MobileSubMenu key={child.title} item={child} setOpen={setOpen} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
