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
import { navItems, megaMenu } from "@/lib/mock-data";
import type { NavItem, MegaMenuCategory } from "@/types";

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

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex h-20 items-center justify-between gap-4 md:gap-8">
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
         
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <MessageSquare className="w-8 h-8 text-primary"/>
            <div>
              <p className="text-sm font-semibold">Tư vấn bán hàng</p>
              <p className="text-lg font-bold text-primary">0963.997.355 | 0965.997.355</p>
            </div>
            <Button>Tư vấn chọn mua</Button>
          </div>
          
           <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm p-0">
                <MobileMenu setOpen={setOpen} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <nav className="hidden lg:flex bg-primary text-primary-foreground">
        <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 flex items-center max-w-6xl">
            <MegaMenu />
            <div className="h-6 w-px bg-primary-foreground/30 mx-2"></div>
            <DesktopNavigation />
        </div>
      </nav>
    </header>
  );
}

const MegaMenu = () => {
    const [activeCategory, setActiveCategory] = React.useState<MegaMenuCategory | null>(megaMenu[0] ?? null);

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 focus:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10 font-bold text-base h-12 p-4">
                        <Menu className="mr-2"/>
                        Tất cả danh mục sản phẩm
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid grid-cols-5 gap-4 p-4 w-[1200px]">
                           <div className="col-span-1">
                             <ul className="space-y-1">
                                {megaMenu.map(category => (
                                    <li key={category.title} onMouseEnter={() => setActiveCategory(category)}>
                                        <NavigationMenuLink asChild>
                                             <a href={category.href} className={cn("flex items-center justify-between p-2 text-sm font-medium rounded-md hover:bg-accent focus:outline-none focus:bg-accent transition-colors group",
                                                activeCategory?.title === category.title ? "bg-accent" : ""
                                             )}>
                                                <span>{category.title}</span>
                                                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                                            </a>
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


const MobileMenu = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  return (
    <div className="h-full flex flex-col">
       <div className="p-4 border-b">
         <Logo />
       </div>
        <div className="p-4 flex-1 overflow-y-auto">
            <nav className="flex flex-col space-y-1">
                 {megaMenu.map((item) =>
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
            </nav>
        </div>
         <div className="p-4 border-t bg-muted/50">
            <div className="flex items-center space-x-2">
                 <Phone className="w-5 h-5 text-primary"/>
                <div>
                  <p className="text-xs">Tư vấn bán hàng</p>
                  <p className="text-sm font-bold text-primary">0963.997.355</p>
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

  if (!item.children || item.children.length === 0) {
      return (
        <Link href={item.href} className="py-2 font-medium" style={{ paddingLeft }} onClick={handleLinkClick}>
            {item.title}
        </Link>
      )
  }

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between items-center py-2 font-medium"
        onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
        style={{ paddingLeft: level > 0 ? paddingLeft : '0' }}
      >
        <span>{item.title}</span>
        <ChevronDown className={cn("h-5 w-5 transition-transform", isSubMenuOpen && "rotate-180")} />
      </div>
      {isSubMenuOpen && item.children && (
        <div className="flex flex-col space-y-1 mt-1">
          {item.children.map((child) => (
             <MobileSubMenu key={child.title} item={child} setOpen={setOpen} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
