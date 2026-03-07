"use client"

import { useState } from "react"
import { Client } from "@/types/client"
import { Invoice } from "@/types/invoice"

import { DetailsHeader } from "../Detalhes/Header"
import { DetailsSection } from "./DetailsSection"
import { DetailsActions } from "./DetailsActions"
import { ConfirmDeleteModal } from "./ConfirmDeleteModal"
import { clientsMock } from "@/mocks/clients.mock"
import { title } from "framer-motion/m"

type Props = {
  client?: Client
  invoice?: Invoice
}

export function DetailsCard({ client, invoice }: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const isClient = !!client

   const title = isClient  
  ? client?.name || "" 
  : `Invoice #${invoice?.id}`

  const subtitle = isClient 
  ? client?.email || ""
  : invoice?.clientId || "" 

 /*  const clientForInvoice = clientsMock.find(c => c.id === invoice?.clientId)
const subtitle = isClient
  ? client?.email || ""
  : clientForInvoice?.name || invoice?.clientId */

  function handleDelete() {
    console.log("Item apagado")
    setDeleteOpen(false)
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
              <p className="font-medium">{client.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Telefone</p>
              <p className="font-medium">{client.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">Empresa</p>
              <p className="font-medium">{client.company}</p>
            </div>
            <div>
              <p className="text-gray-500">Criado em</p>
              <p className="font-medium">{client.createdAt}</p>
            </div>
          </div>
        </DetailsSection>
      )}

      {invoice && (
        <DetailsSection title="Detalhes da Fatura">
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Cliente</p>
              <p className="font-medium">{invoice.clientName}</p>
            </div>
            <div>
              <p className="text-gray-500">Valor</p>
              <p className="font-medium">€ {invoice.amount}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-medium">{invoice.status}</p>
            </div>
            <div>
              <p className="text-gray-500">Vencimento</p>
              <p className="font-medium">{invoice.dueDate}</p>
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
  )
}