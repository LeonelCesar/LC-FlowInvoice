export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  price: number;
};

export type Invoice = {
 /*  clientName: string | undefined;  */
  id: string;
  clientId: string;
  amount: number;
  issuedAt: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  items: InvoiceItem[];
  total: number;
};
