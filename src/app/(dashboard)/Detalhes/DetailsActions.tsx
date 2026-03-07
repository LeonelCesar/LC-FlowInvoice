"use client"

import { Pencil, Trash2, Mail } from "lucide-react"

type Props = {
  onEdit: () => void
  onDelete: () => void
  onEmail?: () => void
}

export function DetailsActions({ onEdit, onDelete, onEmail }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={onEdit}
        className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
      >
        <Pencil size={16} />
        Editar
      </button>

      {onEmail && (
        <button
          onClick={onEmail}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
        >
          <Mail size={16} />
          Enviar Email
        </button>
      )}

      <button
        onClick={onDelete}
        className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border text-red-600 hover:bg-red-50"
      >
        <Trash2 size={16} />
        Apagar
      </button>
    </div>
  )
}