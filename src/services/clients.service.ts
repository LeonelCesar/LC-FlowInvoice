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

    const client = clientsMock.find((c) => c.id === id);

    return client ?? null;
  },
};
