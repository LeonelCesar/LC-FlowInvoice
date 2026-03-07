import { Client } from "@/types/client";

export const clientsMock: Client[] = [
  {
    id: "cli_01",
    name: "Leonel César",
    email: "leonel@example.com",
    phone: "+351 912 345 678",
    address: "Rua do Desenvolvimento, 123",
    status: "active",
    city: "Lisbon",
    country: "Portugal",
  },
  {
    id: "cli_02",
    name: "Maria Silva",
    email: "maria@example.com",
    phone: "+351 923 456 789",
    address: "Avenida da Code, 45",
    status: "unactive",
    city: "Porto",
    country: "Portugal",
  },
  {
    id: "cli_03",
    name: "João Pereira",
    email: "joao@example.com",
    phone: "+351 934 567 890",
    address: "Travessa do React, 7",
    status: "active",
    city: "Coimbra",
    country: "Portugal",
  },
];