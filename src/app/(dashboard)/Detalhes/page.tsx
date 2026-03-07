"use client"

import { useState } from "react"
import { DetailsCard } from "../Detalhes/DetailsCard"
import { Client } from "@/types/client"
import { Invoice } from "@/types/invoice"

export default function DetailsPage() {
  // Dados simulados do Cliente
  const client: Client = {
    id: "1",
    name: "Leonel César",
    email: "leonel@empresa.com",
    phone: "912345678",
    company: "LC Tech", // ajustado para combinar com DetailsCard
    address: "Lisboa, Portugal",
    createdAt: "2026-03-01",
    status: "",
    city: "",
    country: ""
  }

  // Dados simulados da Fatura
  const invoice: Invoice = {
    id: "101",
    clientId: "1",
    amount: 1250,
    status: "pending",
    issuedAt: "2026-03-01", // antes era issueDate
    dueDate: "2026-03-15",
    items: [
      { id: "item_001", description: "React Course License", quantity: 1, price: 150 },
      { id: "item_002", description: "UI Design Template", quantity: 2, price: 550 },
    ],
    total: 1250,
    clientName: undefined
  }

  // Controla se estamos mostrando Cliente ou Fatura
  const [view, setView] = useState<"client" | "invoice">("client")

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Toggle Cliente / Fatura */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={() => setView("client")}
            className={`px-4 py-2 rounded-lg font-medium border transition-colors ${
              view === "client" ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"
            }`}
          >
            Cliente
          </button>
          <button
            onClick={() => setView("invoice")}
            className={`px-4 py-2 rounded-lg font-medium border transition-colors ${
              view === "invoice" ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"
            }`}
          >
            Fatura
          </button>
        </div>

        {/* Renderiza os detalhes */}
        {view === "client" && <DetailsCard client={client} />}
        {view === "invoice" && <DetailsCard invoice={invoice} />}
      </div>
    </div>
  )
}