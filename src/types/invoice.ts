export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  issuedAt: string;
  dueDate: string;
  status: "paid" | "pending";
}
