import { Invoice } from "@/types/invoice";
import { invoicesMock } from "@/mocks/invoices.mock";

/**
 * Simulação de base de dados em memória.
 * Nunca exportar isto.
 */
let invoicesDB: Invoice[] = [...invoicesMock];

/**
 * Simula latência de rede.
 */
const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Garante retorno imutável.
 */
const clone = <T>(data: T): T =>
  JSON.parse(JSON.stringify(data));

export const invoicesService = {
  /**
   * Retorna todas as faturas ordenadas por data decrescente.
   */
  async getAll(): Promise<Invoice[]> {
    await delay(500);

    const sorted = [...invoicesDB].sort(
      (a, b) =>
        new Date(b.issuedAt).getTime() -
        new Date(a.issuedAt).getTime()
    );

    return clone(sorted);
  },

  /**
   * Retorna fatura por ID.
   */
  async getById(id: string): Promise<Invoice | null> {
    await delay(400);

    const invoice = invoicesDB.find(
      (inv) => inv.id === id
    );

    return invoice ? clone(invoice) : null;
  },

  /**
   * Retorna faturas de um cliente específico.
   */
  async getByClient(clientId: string): Promise<Invoice[]> {
    await delay(400);

    const filtered = invoicesDB.filter(
      (inv) => inv.clientId === clientId
    );

    return clone(filtered);
  },

  /**
   * Cria nova fatura.
   */
  async create(
    data: Omit<Invoice, "id">
  ): Promise<Invoice> {
    await delay(400);

    const newInvoice: Invoice = {
      ...data,
      id: crypto.randomUUID(),
    };

    invoicesDB = [...invoicesDB, newInvoice];

    return clone(newInvoice);
  },

  /**
   * Atualiza uma fatura existente.
   */
  async update(
    id: string,
    data: Partial<Omit<Invoice, "id">>
  ): Promise<Invoice | null> {
    await delay(400);

    const index = invoicesDB.findIndex(
      (inv) => inv.id === id
    );

    if (index === -1) return null;

    const updated = {
      ...invoicesDB[index],
      ...data,
    };

    invoicesDB[index] = updated;

    return clone(updated);
  },

  /**
   * Remove uma fatura.
   */
  async remove(id: string): Promise<boolean> {
    await delay(400);

    const initialLength = invoicesDB.length;

    invoicesDB = invoicesDB.filter(
      (inv) => inv.id !== id
    );

    return invoicesDB.length < initialLength;
  },
};
