"use client";

import { useState } from "react";
import { Client } from "@/types/client";
import { Invoice } from "@/types/invoice";

import { DetailsHeader } from "./Header";
import { DetailsSection } from "./DetailsSection";
import { DetailsActions } from "./DetailsActions";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

type Props = {
  client?: Client;
  invoice?: Invoice;
};

export function DetailsCard({ client, invoice }: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const isClient = !!client;

  const title = isClient ? client?.name || "" : `Invoice #${invoice?.id}`;

  const subtitle = isClient ? client?.email || "" : invoice?.clientId || "";

  function handleDelete() {
    console.log("Item apagado");
    setDeleteOpen(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <DetailsHeader
        title={title || ""}
        subtitle={subtitle}
        actions={
          <DetailsActions
            onEdit={() => console.log("editar")}
            onDelete={() => setDeleteOpen(true)}
            onEmail={() => console.log("enviar email")}
          />
        }
      />

      {client && (
        <DetailsSection title="Informações do Cliente">
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium text-gray-500">{client.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Telefone</p>
              <p className="font-medium text-gray-500">{client.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">Empresa</p>
              <p className="font-medium text-gray-500">{client.company}</p>
            </div>
            <div>
              <p className="text-gray-500">Criado em</p>
              <p className="font-medium text-gray-500">{client.createdAt}</p>
            </div>
          </div>
        </DetailsSection>
      )}

      {invoice && (
        <DetailsSection title="Detalhes da Fatura">
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Cliente</p>
              <p className="font-medium text-gray-500">{invoice.clientId}</p>
            </div>
            <div>
              <p className="text-gray-500">Valor</p>
              <p className="font-medium text-gray-500">€ {invoice.amount}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-medium text-gray-500">{invoice.status}</p>
            </div>
            <div>
              <p className="text-gray-500">Vencimento</p>
              <p className="font-medium text-gray-500">{invoice.dueDate}</p>
            </div>
          </div>
        </DetailsSection>
      )}

      <ConfirmDeleteModal
        open={deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
