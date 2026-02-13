"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-6 z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-md border border-gray-500 text-gray-500 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
