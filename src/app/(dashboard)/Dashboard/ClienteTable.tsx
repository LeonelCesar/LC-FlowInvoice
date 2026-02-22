"use client";

import { Container } from "@/components/Container/Container";
import { Modal } from "@/components/ui/Modal";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Client } from "@/types/client";
import { clientsService } from "@/services/clients.service";
import { Button } from "@/components/ui/Button";

export default function ClienteTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const pageSize = 8;

  // 🔹 Carregar todos os clientes
  useEffect(() => {
    setLoading(true);
    clientsService.getAll().then((data) => {
      setClients(data);
      setLoading(false);
    });
  }, []);

  const totalPages = Math.ceil(clients.length / pageSize);

  const paginatedClients = clients.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  // 🔹 Carregar cliente selecionado ao abrir modal
  useEffect(() => {
    if (!selectedClientId) {
      setSelectedClient(null);
      return;
    }

    setSelectedClient(null);
    clientsService
      .getById(selectedClientId)
      .then((client) => setSelectedClient(client));
  }, [selectedClientId]);

  return (
    <Container>
      <div className="w-full mt-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-500">
            Últimos Clientes
          </h2>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              onClick={() =>
                alert(
                  "Funcionalidade de criação de cliente ainda não implementada",
                )
              }
            >
              Novo Cliente
            </Button>
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Carregando clientes...
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-700">
                    Cliente
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-700">Email</th>
                  <th className="px-6 py-4 font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-700 text-center">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{client.email}</td>
                    <td className="px-6 py-4 text-gray-600">{client.status}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedClientId(client.id)}
                        className="px-3 py-1 text-sm border border-gray-400 text-gray-500 rounded-md hover:bg-gray-100"
                      >
                        Ver detalhes
                      </button>
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
                    page === pageNumber
                      ? "bg-gray-500 text-white"
                      : "hover:bg-gray-100"
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

      {/* Modal */}
      <Modal
        open={!!selectedClientId}
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
