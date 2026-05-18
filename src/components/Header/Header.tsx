"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  FileText,
  Info,
  LucideIcon,
} from "lucide-react";

import { Button } from "../ui/Button";
import ImageLogo from "../../../public/icone-fatura.png";
import { usePathname } from "next/navigation";

/* TYPES */

type NavLinkItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/*  DATA */

const NAV_LINKS: NavLinkItem[] = [
  { label: "Dashboard", href: "/dashboardInvent", icon: LayoutDashboard },
  { label: "Clientes", href: "/clientes", icon: Users },
  { label: "Faturas", href: "/faturas", icon: FileText },
  { label: "Detalhes", href: "/detalhes", icon: Info },
];

/*  HOOKS */

function useLockBodyScroll(isLocked: boolean) {
  useEffect(() => {
    const original = document.body.style.overflow;

    document.body.style.overflow = isLocked ? "hidden" : original;

    return () => {
      document.body.style.overflow = original;
    };
  }, [isLocked]);
}

/* HEADER */

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useLockBodyScroll(isOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-10">
          <NavLinks orientation="horizontal" />
          <AuthActions />
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={openMenu}
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="rounded-md p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <MobileDrawer isOpen={isOpen} onClose={closeMenu} />
    </header>
  );
}

/* LOGO */

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 text-lg font-semibold tracking-tight text-gray-500"
    >
      <Image
        src={ImageLogo}
        alt="LC Flow Invoice"
        width={44}
        height={44}
        priority
        className="rounded-lg transition-transform duration-300 hover:scale-105"
      />
      <span className="text-gray-500">LC-FlowInvoice</span>
    </Link>
  );
}

/* NAVIGATION */

type NavLinksProps = {
  onNavigate?: () => void;
  orientation?: "horizontal" | "vertical";
};

function NavLinks({ onNavigate, orientation = "vertical" }: NavLinksProps) {
  const pathname = usePathname();
  const isHorizontal = orientation === "horizontal";

  return (
    <nav
      className={`flex ${
        isHorizontal ? "flex-row items-center gap-6" : "flex-col gap-2"
      }`}
    >
      {NAV_LINKS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`
              flex flex-row items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition border border-gray-500 md:border-0
              ${
                isActive
                  ? "bg-gray-100 text-gray-500"
                  : "text-gray-500 hover:border-gray"
              }
            `}
          >
            <Icon
              className={`h-4 w-4 ${
                isActive ? "text-gray-500" : "text-gray-500"
              }`}
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

/* AUTH ACTIONS */

function AuthActions({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <Link href="/login" onClick={onNavigate}>
        <Button variant="secondary">Login</Button>
      </Link>

      <Link href="/register" onClick={onNavigate}>
        <Button variant="danger">Register</Button>
      </Link>
    </div>
  );
}

/* MOBILE DRAWER */

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed z-10 flex flex-col bg-gray-200 shadow-xl w-screen h-screen rounded-lg py-8">
        <div className="flex items-center justify-between border-b px-2 py-2">
          <span className="text-sm font-semibold text-gray-500">Menu</span>

          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500"/>
          </button>
        </div>

      
        <div className="flex flex-1 flex-col px-6 py-8">
         
          <div className="flex flex-1 items-center justify-center">
            <AuthActions onNavigate={onClose} />
          </div>

          {/* FOOTER (links fixos em baixo) */}
          <div className="mt-auto pt-6">
            <NavLinks onNavigate={onClose} />
          </div>
        </div>
      </aside>
    </div>
  );
}
