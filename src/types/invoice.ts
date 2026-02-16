// src/types/invoice.ts

export type InvoiceStatus = "paid" | "pending";

export interface Invoice {
  id: string; 
  clientId: string; 
  amount: number;
  status: InvoiceStatus;
  issuedAt: string;
   dueDate: string;
}

