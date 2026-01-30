"use client";

import Image from "next/image";
import ImageLogo from "../../../public/icone-fatura.png";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Funcionalidades", href: "/funcionalidades" },
  { label: "Preços", href: "/precos" },
  { label: "Clientees", href: "/clientes" },
  { label: "Suporte", href: "/suporte" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 sm:px-2 bg-white backdrop-blur py-4">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-gray-900"
        >
          <Image
            src={ImageLogo}
            alt="Fatura LC-FlowInvoice"
            className="rounded-xl transform transition-transform duration-500 hover:scale-105 hover:rotate-1"
            width={62} // ajuste para o tamanho desejado
            height={62} // ajuste proporcional
          />
          <span className="text-gray-500">LC-FlowInvoice</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/Login"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            href="/Register"
            className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-200"
          >
            Register
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-72 bg-gray-900 shadow-2xl">
            <div className="flex items-center justify-between border-b px-4 py-4">
              <span className="text-sm font-semibold text-gray-900">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-2 text-gray-700 transition hover:bg-gray-100"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 px-4 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-gray-700 transition hover:text-gray-900"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/Login"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  href="/Register"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Register
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
