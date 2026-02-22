"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

interface Client {
  id: number;
  name: string;
  email: string;
}

// 1️⃣ Schema de validação com Zod
const clientSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("Email inválido"),
});

type ClientFormData = z.infer<typeof clientSchema>;

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // 2️⃣ Configuração do React Hook Form com Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  // 3️⃣ Abrir formulário (novo ou editar)
  const handleOpenForm = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      reset({ name: client.name, email: client.email });
    } else {
      setEditingClient(null);
      reset({ name: "", email: "" });
    }
    setShowForm(true);
  };

  // 4️⃣ Salvar cliente
  const onSubmit = async (data: ClientFormData) => {
    if (editingClient) {
      setClients((prev) =>
        prev.map((c) =>
          c.id === editingClient.id ? { ...c, ...data } : c
        )
      );
    } else {
      const newClient: Client = { id: Date.now(), ...data };
      setClients((prev) => [...prev, newClient]);
    }
    setShowForm(false);
    setEditingClient(null);
    reset();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingClient(null);
    reset();
  };

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button variant="primary" onClick={() => handleOpenForm()}>
          Novo Cliente
        </Button>
      </div>

      {/* Tabela de clientes */}
      <table className="w-full border border-gray-200 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="p-2 border">{client.name}</td>
              <td className="p-2 border">{client.email}</td>
              <td className="p-2 border">
                <Button
                  variant="secondary"
                  onClick={() => handleOpenForm(client)}
                  className="mr-2"
                >
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal/Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded w-96 shadow-lg flex flex-col gap-4"
          >
            <h2 className="text-xl font-bold mb-2">
              {editingClient ? "Editar Cliente" : "Novo Cliente"}
            </h2>

            <div className="flex flex-col gap-2">
              <Input
                label={""} placeholder="Nome"
                {...register("name")}              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}

              <Input
                label={""} placeholder="Email"
                type="email"
                {...register("email")}              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="secondary" type="button" onClick={handleCancel}>
                Sair
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {editingClient ? "Salvar" : "Criar"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

