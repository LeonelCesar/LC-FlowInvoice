"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import ImageLogo from "../../../public/icone-fatura.png";

type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "Clientes", href: "/Clientes" },
  { label: "Dashboard Clientes", href: "/Dashboard" },
  { label: "Faturas", href: "/Faturas" },
  { label: "Detalhes", href: "/Detalhes" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLinks />
          <AuthActions />
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={openMenu}
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="rounded-md p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <MobileDrawer isOpen={isOpen} onClose={closeMenu} />
    </header>
  );
}

/* Logo */

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 text-lg font-semibold tracking-tight text-gray-900"
    >
      <Image
        src={ImageLogo}
        alt="Logo LC-FlowInvoice"
        width={48}
        height={48}
        priority
        className="rounded-lg transition-transform duration-300 hover:scale-105"
      />
      <span className="text-gray-600">LC-FlowInvoice</span>
    </Link>
  );
}

/* Navigation Links */

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex w-full flex-col items-start gap-6 text-left md:flex-row md:items-center">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className="text-md font-medium text-gray-500 transition hover:text-gray-900"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

/* Auth Action */

function AuthActions({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex w-full justify-center gap-4 md:w-auto">
      <Link href="/Login" onClick={onNavigate}>
        <Button variant="secondary">Login</Button>
      </Link>

      <Link href="/Register" onClick={onNavigate}>
        <Button variant="danger">Register</Button>
      </Link>
    </div>
  );
}


/* Mobile Drawer */

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl animate-in slide-in-from-right">
        <div className="flex items-center justify-between border-b px-4 py-4">
          <span className="text-sm font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="rounded-md p-2 text-gray-700 transition hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col gap-20 px-4 py-6">
          <NavLinks onNavigate={onClose} />
          <AuthActions onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}
