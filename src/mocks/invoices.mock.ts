import { Invoice } from "@/types/invoice";

export const invoicesMock: Invoice[] = [
  {
    id: "inv_001",
    clientId: "cli_01",
    issuedAt: "2026-03-01",
    amount: 2 * 150, // sempre número
    dueDate: "2026-03-15",
    status: "pending",
    items: [
      { id: "item_001", description: "React Course License", quantity: 1, price: 150 },
      { id: "item_002", description: "UI Design Template", quantity: 2, price: 75 },
    ],
    total: 300,
  },
  {
    id: "inv_002",
    clientId: "cli_02",
    issuedAt: "2026-02-20",
     amount: 2 * 150, // sempre número
    dueDate: "2026-03-05",
    status: "paid",
    items: [
      { id: "item_003", description: "Next.js Workshop", quantity: 1, price: 200 },
      { id: "item_004", description: "Tailwind Components Pack", quantity: 3, price: 50 },
    ],
    total: 350,
  },
  {
    id: "inv_003",
    clientId: "cli_03",
    issuedAt: "2026-01-15",
     amount: 2 * 150, // sempre número
    dueDate: "2026-01-30",
    status: "overdue",
    items: [
      { id: "item_005", description: "Frontend Consulting", quantity: 5, price: 100 },
    ],
    total: 500,
  },
];