"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  Calendar,
  BarChart3,
  BookOpen,
  GitBranch,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { loadUIState, saveUIState } from "@/lib/progress";

const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/plan", label: "Plan", icon: Calendar },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/decisions", label: "Decisions", icon: GitBranch },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCollapsed(loadUIState().sidebarCollapsed);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveUIState({ sidebarCollapsed: collapsed });
    const root = document.documentElement;
    root.style.setProperty("--sidebar-w", collapsed ? "60px" : "220px");
  }, [collapsed, hydrated]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile top header */}
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="gradient-text font-mono text-sm font-bold">karpathy-rust</span>
        </Link>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-md p-1.5 text-white/60 hover:bg-white/5"
          aria-label="toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav className="border-b border-white/[0.07] bg-[var(--color-bg)] md:hidden">
          <ul className="px-2 py-2">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-white/[0.06] text-white"
                        : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-white/[0.07] bg-[var(--color-bg)]/85 backdrop-blur-md transition-[width] duration-200 md:flex",
          collapsed ? "w-[60px]" : "w-[220px]"
        )}
      >
        <div
          className={cn(
            "flex items-center border-b border-white/[0.05] px-4 py-4",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <span className="gradient-text font-mono text-sm font-bold">karpathy-rust</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="rounded-md p-1 text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
            aria-label="collapse sidebar"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      collapsed && "justify-center px-0",
                      active
                        ? "bg-white/[0.06] text-white"
                        : "text-white/55 hover:bg-white/[0.03] hover:text-white"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {!collapsed && (
          <div className="border-t border-white/[0.05] px-4 py-3 font-mono text-[11px] text-white/30">
            <kbd>g h</kbd> · <kbd>g p</kbd> · <kbd>g r</kbd>
          </div>
        )}
      </aside>
    </>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}
