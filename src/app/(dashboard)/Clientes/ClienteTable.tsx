"use client";

import { Container } from "@/components/Container/Container";
import { Modal } from "@/components/ui/Modal";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Client } from "@/types/client";
import { clientsService } from "@/services/clients.service";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema de validação
const clientSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("Email inválido"),
});

type ClientFormData = z.infer<typeof clientSchema>;

export default function ClienteTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Estado para modal/form
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const pageSize = 5; // ✅ agora mostra 5 clientes por página

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  // Carregar todos os clientes
  useEffect(() => {
    setLoading(true);
    clientsService.getAll().then((data) => {
      setClients(data);
      setLoading(false);
    });
  }, []);

  // Calcula totalPages sempre que clients mudar
  const totalPages = Math.ceil(clients.length / pageSize);

  // Paginação
  const paginatedClients = clients.slice((page - 1) * pageSize, page * pageSize);

  // ⚡ Ajusta a página atual se necessário
  useEffect(() => {
    if (page > totalPages) setPage(totalPages || 1);
  }, [clients, totalPages, page]);

  // Abrir formulário para criar ou editar
  const handleOpenForm = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      reset({ name: client.name, email: client.email });
    } else {
      setEditingClient(null);
      reset({ name: "", email: "" });
    }
    setSelectedClientId("form"); // Flag para abrir modal de formulário
  };

  // Salvar cliente
  const onSubmit = async (data: ClientFormData) => {
    if (editingClient) {
      // Editando
      setClients((prev) =>
        prev.map((c) => (c.id === editingClient.id ? { ...c, ...data } : c))
      );
    } else {
      // Criando
      const newClient: Client = { id: Date.now().toString(), status: "Ativo", ...data };
      setClients((prev) => [...prev, newClient]);
      setPage(totalPages); // Vai para a última página ao criar
    }
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setSelectedClientId(null);
    setEditingClient(null);
    reset();
  };

  // Carregar cliente selecionado para modal de detalhes
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  useEffect(() => {
    if (!selectedClientId || selectedClientId === "form") {
      setSelectedClient(null);
      return;
    }
    setSelectedClient(null);
    clientsService.getById(selectedClientId).then((client) => setSelectedClient(client));
  }, [selectedClientId]);

  return (
    <Container>
      <div className="w-full mt-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-500">Últimos Clientes</h2>

          <div className="flex items-center gap-3">
            <Button variant="primary" onClick={() => handleOpenForm()}>
              Novo Cliente
            </Button>
          </div>
        </div>

        {/* Tabela de clientes */}
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Carregando clientes...</div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-700">Cliente</th>
                  <th className="px-6 py-4 font-medium text-gray-700">Email</th>
                  <th className="px-6 py-4 font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 font-medium text-gray-700 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{client.name}</td>
                    <td className="px-6 py-4 text-gray-600">{client.email}</td>
                    <td className="px-6 py-4 text-gray-600">{client.status}</td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        variant="secondary"
                        onClick={() => setSelectedClientId(client.id)}
                      >
                        Ver detalhes
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleOpenForm(client)}
                        className="ml-2"
                      >
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-400 text-gray-500 bg-white rounded-lg disabled:opacity-40 hover:bg-gray-100"
          >
            <ChevronLeft size={16} />
            Anterior
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`px-3 py-1 text-sm rounded-md border border-gray-400 text-gray-500 ${
                    page === pageNumber ? "bg-gray-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-400 text-gray-500 bg-white rounded-lg disabled:opacity-40 hover:bg-gray-100"
          >
            Próxima
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Modal/Formulário */}
      <Modal
        open={selectedClientId === "form"}
        onClose={handleCloseForm}
        title={editingClient ? "Editar Cliente" : "Novo Cliente"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Input label={""} placeholder="Nome" {...register("name")} />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

            <Input label={""} placeholder="Email" type="email" {...register("email")} />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" type="button" onClick={handleCloseForm}>
              Sair
            </Button>
            <Button variant="danger" type="submit" disabled={isSubmitting}>
              {editingClient ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de detalhes existente */}
      <Modal
        open={!!selectedClientId && selectedClientId !== "form"}
        onClose={() => setSelectedClientId(null)}
        title="Detalhes do Cliente"
      >
        {!selectedClient ? (
          <div className="text-sm text-gray-500">Carregando...</div>
        ) : (
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <strong>Nome:</strong> {selectedClient.name}
            </div>
            <div>
              <strong>Email:</strong> {selectedClient.email}
            </div>
            <div>
              <strong>Status:</strong> {selectedClient.status}
            </div>
            <div>
              <strong>ID:</strong> {selectedClient.id}
            </div>
          </div>
        )}
      </Modal>
    </Container>
  );
}
