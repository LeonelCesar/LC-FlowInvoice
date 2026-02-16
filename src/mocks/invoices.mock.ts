import { Invoice } from "@/types/invoice"

export const invoicesMock: Invoice[] = [
  {
    id: "1",
    clientId: "1",
    amount: 1200,
    status: "paid",
    issuedAt: "2022-01-01",
  },
  {
    id: "2",
    clientId: "1",
    amount: 800,
    status: "pending",
    issuedAt: "2024-01-05",
  },
    {
    id: "3",
    clientId: "2",
    amount: 1500,
    status: "paid",
    issuedAt: "2026-01-10",
  },
    {
    id: "4",
    clientId: "1",
    amount: 5000,
    status: "pending",
    issuedAt: "2025-01-01",
  },
]
