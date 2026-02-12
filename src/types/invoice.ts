export interface Invoice {
  id: string
  clientId: string
  amount: number
  status: "paid" | "pending"
  issuedAt: string
}
