import { Invoice } from "@/types/invoice"
import { invoicesMock } from "@/mocks/invoices.mock"

let invoicesDB: Invoice[] = [...invoicesMock]

export const invoicesService = {
  getByClient: async (clientId: string): Promise<Invoice[]> => {
    await new Promise((res) => setTimeout(res, 400))
    return invoicesDB.filter((inv) => inv.clientId === clientId)
  },

  create: async (data: Omit<Invoice, "id">): Promise<Invoice> => {
    await new Promise((res) => setTimeout(res, 400))

    const newInvoice: Invoice = {
      ...data,
      id: crypto.randomUUID(),
    }

    invoicesDB.push(newInvoice)

    return newInvoice
  },
}
