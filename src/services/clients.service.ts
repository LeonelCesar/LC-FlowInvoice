import { Client } from "@/types/client"
import { clientsMock } from "@/mocks/clients.mock"

export const clientsService = {
  getAll: async (): Promise<Client[]> => {
    await new Promise((res) => setTimeout(res, 500))
    return clientsMock
  },

  getById: async (id: string): Promise<Client | undefined> => {
    await new Promise((res) => setTimeout(res, 300))
    return clientsMock.find((c) => c.id === id)
  },
}
