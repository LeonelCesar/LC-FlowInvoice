/* export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  issuedAt: string;
  dueDate: string;
  status: "paid" | "pending";
} */

export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  price: number;
};

export type Invoice = {
  clientName: ReactNode;
  id: string;
  clientId: string;
  amount: number;
  issuedAt: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  items: InvoiceItem[];
  total: number;
};
