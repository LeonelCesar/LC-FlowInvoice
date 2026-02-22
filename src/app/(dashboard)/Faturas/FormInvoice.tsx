import { useState, useEffect } from "react";
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Props = {
  initialData?: Invoice;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
};

export default function InvoiceForm({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const isEditMode = !!initialData;

  const [form, setForm] = useState({
    clientId: "",
    amount: 0,
    status: "pending",
    issuedAt: "",
    dueDate: "",
  });

  // 🔥 Importantíssimo: sincroniza quando muda initialData
  useEffect(() => {
    if (initialData) {
      setForm({
        clientId: initialData.clientId,
        amount: initialData.amount,
        status: initialData.status,
        issuedAt: initialData.issuedAt?.slice(0, 10),
        dueDate: initialData.dueDate?.slice(0, 10),
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "amount"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <Input
        name="clientId"
        value={form.clientId}
        onChange={handleChange}
        placeholder="Cliente"
        className="w-full p-2 rounded text-gray-500 border border-gray-400 outline-none"
        label=""
      />

      <Input
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        placeholder="Valor"
        className="w-full p-2 rounded text-gray-500 border border-gray-400 outline-none"
        label=""
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-2 rounded text-gray-500 border border-gray-400 outline-none"
      >
        <option value="pending">Pendente</option>
        <option value="paid">Pago</option>
        <option value="overdue">Vencido</option>
      </select>

      <Input
        name="issuedAt"
        type="date"
        value={form.issuedAt}
        onChange={handleChange}
        className="w-full p-2 rounded text-gray-500 border border-gray-400 outline-none"
        label=""
      />

      <Input
        name="dueDate"
        type="date"
        value={form.dueDate}
        onChange={handleChange}
        className="w-full border border-gray-400 p-2 rounded text-gray-400 outline-none"
        label=""
      />

      {/* 🔥 Botões consistentes */}
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        )}

        <Button type="submit" variant="primary">
          {isEditMode ? "Atualizar Fatura" : "Criar Fatura"}
        </Button>
      </div>
    </form>
  );
}
