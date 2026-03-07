"use client";

import { useState, useEffect, useCallback } from "react";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Pencil, Trash2, Mail } from "lucide-react";

import { Client } from "../../../types/client";
import { Invoice } from "../../../types/invoice";
import { clientsService } from "../../../services/clients.service";
import { invoicesService } from "../../../services/invoices.service";

type Props = {
  clientId: string | null;
  onClose: () => void;
};

type ClientForm = Pick<Client, "name" | "email" | "status">;

const INITIAL_FORM: ClientForm = {
  name: "",
  email: "",
  status: "active",
};

export default function ClientDetailsModal({ clientId, onClose }: Props) {
  const isOpen = Boolean(clientId);

  const [client, setClient] = useState<Client | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [form, setForm] = useState<ClientForm>(INITIAL_FORM);

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  console.log("clientId:", clientId);
  console.log("Render client:", client);

  const resetState = useCallback(() => {
    setClient(null);
    setInvoices([]);
    setEditing(false);
    setLoading(false);
    setForm(INITIAL_FORM);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen, resetState]);

  const fetchClientData = useCallback(async () => {
    if (!clientId) return;

    try {
      setLoading(true);

      const [clientData, invoicesData] = await Promise.all([
        clientsService.getById(clientId),
        invoicesService.getByClient(clientId),
      ]);

      if (!clientData) {
        console.warn("Cliente não encontrado");
        return;
      }

      setClient(clientData);

      setForm({
        name: clientData.name,
        email: clientData.email,
        status: clientData.status,
      });

      setInvoices(invoicesData ?? []);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    if (!clientId) return;

    fetchClientData();
  }, [clientId, fetchClientData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "status" ? (value as Client["status"]) : value,
    }));
  };

  const handleSave = async () => {
    if (!client?.id) return;

    try {
      const updatedClient = await clientsService.update(client.id, form);

      setClient(updatedClient);
      setEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  };

  const handleDelete = async () => {
    if (!client) return;

    const confirmed = window.confirm(`Deseja apagar ${client.name}?`);
    if (!confirmed) return;

    try {
      await clientsService.remove(client.id);
      onClose();
    } catch (error) {
      console.error("Erro ao apagar cliente:", error);
    }
  };

  const handleSendEmail = () => {
    if (!client) return;

    alert(`Simulação: Enviar email para ${client.email}`);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={client?.name ?? "Detalhes do Cliente"}
      size="xl"
    >
      {loading && (
        <div className="text-gray-500 text-center py-10">
          Carregando cliente...
        </div>
      )}

      {!loading && !client && (
        <div className="text-gray-500 text-center py-10">
          Cliente não encontrado
        </div>
      )}

      {!loading && client && (
        <div className="space-y-6">
          {/* CLIENT INFO */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-500">
                Nome
              </label>

              {editing ? (
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full"
                  label=""
                />
              ) : (
                <p className="mt-1 text-gray-700">{client.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-500">
                Email
              </label>

              {editing ? (
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 w-full"
                  label=""
                />
              ) : (
                <p className="mt-1 text-gray-700">{client.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-500">
                Status
              </label>

              {editing ? (
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              ) : (
                <p className="mt-1 text-gray-700 capitalize">
                  {client.status}
                </p>
              )}
            </div>
          </section>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-3">
            {editing ? (
              <>
                <Button variant="primary" onClick={handleSave}>
                  Salvar
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => setEditing(false)}
                >
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={() => setEditing(true)}
                  icon={<Pencil />}
                >
                  Editar
                </Button>

                <Button
                  variant="danger"
                  onClick={handleDelete}
                  icon={<Trash2 />}
                >
                  Apagar
                </Button>

                <Button
                  variant="secondary"
                  onClick={handleSendEmail}
                  icon={<Mail />}
                >
                  Enviar Email
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}