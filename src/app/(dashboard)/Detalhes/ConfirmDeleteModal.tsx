"use client"

type Props = {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmDeleteModal({ open, onCancel, onConfirm }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] space-y-4">
        <h2 className="text-lg font-semibold">Confirmar exclusão</h2>
        <p className="text-sm text-gray-600">
          Tens certeza que queres apagar este item?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg"
          >
            Apagar
          </button>
        </div>
      </div>
    </div>
  )
}