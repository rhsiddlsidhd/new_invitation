"use client";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const navItems = [
  {
    title: "대시보드",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "상품 관리",
    icon: Package,
    submenu: [
      { title: "상품 목록", href: "/admin/products" },
      { title: "상품 등록", href: "/admin/products/new" },
    ],
  },
  {
    title: "프리미엄 기능 관리",
    icon: Star,
    submenu: [
      { title: "프리미엄 기능 목록", href: "/admin/premium-features" },
      { title: "프리미엄 기능 등록", href: "/admin/premium-features/new" },
    ],
  },
  {
    title: "주문 관리",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "회원 관리",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "설정",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminNavItem() {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([
    "상품 관리",
    "프리미엄 기능 관리",
  ]);

  const toggleMenu = (title: string) => {
    setExpandedMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };
  return (
    <nav className="flex-1 overflow-y-auto">
      {navItems.map((item) => (
        <div key={item.title}>
          {item.submenu ? (
            <div>
              <button
                onClick={() => toggleMenu(item.title)}
                className="text-muted-foreground hover:text-foreground hover:bg-accent/50 flex w-full items-center justify-between px-6 py-3 text-sm transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    expandedMenus.includes(item.title) && "rotate-180",
                  )}
                />
              </button>
              {expandedMenus.includes(item.title) && (
                <div className="bg-accent/30">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "block py-2.5 pr-6 pl-14 text-sm transition-colors",
                        pathname === subItem.href
                          ? "text-primary bg-primary/10 font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                      )}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-3 text-sm transition-colors",
                pathname === item.href
                  ? "text-primary bg-primary/10 border-primary border-r-2 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
