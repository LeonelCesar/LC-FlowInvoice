import { Client } from "@/types/client";
import { clientsMock } from "@/mocks/clients.mock";

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const clientsService = {
  async getAll(): Promise<Client[]> {
    await delay(500);
    return [...clientsMock];
  },

  async getById(id: string): Promise<Client | null> {
    await delay(300);
    return clientsMock.find((c) => c.id === id) ?? null;
  },

  async update(id: string, data: Partial<Client>): Promise<Client> {
    await delay(400);

    const index = clientsMock.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new Error("Cliente não encontrado");
    }

    clientsMock[index] = {
      ...clientsMock[index],
      ...data,
    };

    return clientsMock[index];
  },

  async remove(id: string): Promise<void> {
    await delay(400);

    const index = clientsMock.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new Error("Cliente não encontrado");
    }

    clientsMock.splice(index, 1);
  },
};
