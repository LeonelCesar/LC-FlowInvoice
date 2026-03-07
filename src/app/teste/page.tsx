"use client";

import { useState } from "react";
import { Modal } from "../../components/ui/Modal";

export default function TestPage() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button onClick={() => setOpen(true)}>Abrir</button>

      <Modal open={open} onClose={() => setOpen(false)} title="Teste Modal">
        <p className="text-gray-500">Funciona?</p>
      </Modal>
    </>
  );
}
