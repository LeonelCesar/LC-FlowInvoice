"use client";

import { useState, useMemo, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Plus, Filter, DollarSign, CheckCircle, Clock, AlertCircle, Edit, Eye, Trash2 } from "lucide-react";

// --- Tipos ---
type InvoiceStatus = "paid" | "pending" | "overdue";

interface Invoice {
  id: string;
  customer: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
}

// --- Geração de dados mockados ---
const generateMockInvoices = (): Invoice[] => {
  return Array.from({ length: 12 }, () => ({
    id: faker.string.uuid(),
    customer: faker.company.name(),
    amount: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
    dueDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement(["paid", "pending", "overdue"]),
  }));
};

const generateMonthlyData = () => {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return months.map((month) => ({
    month,
    faturamento: faker.number.int({ min: 2000, max: 15000 }),
  }));
};

// --- Componente principal ---
export default function InvoiceDashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>(generateMockInvoices());
  const [filterStatus, setFilterStatus] = useState<InvoiceStatus | "all">("all");
  const [showModal, setShowModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ customer: "", amount: 0, dueDate: "" });

  // Estados para edição e detalhes
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);
  const [editForm, setEditForm] = useState({ customer: "", amount: 0, dueDate: "", status: "pending" as InvoiceStatus });

  // Métricas
  const metrics = useMemo(() => {
    const total = invoices.reduce((acc, inv) => acc + inv.amount, 0);
    const paid = invoices.filter((inv) => inv.status === "paid").reduce((acc, inv) => acc + inv.amount, 0);
    const pending = invoices.filter((inv) => inv.status === "pending").reduce((acc, inv) => acc + inv.amount, 0);
    const overdue = invoices.filter((inv) => inv.status === "overdue").reduce((acc, inv) => acc + inv.amount, 0);
    return { total, paid, pending, overdue };
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    if (filterStatus === "all") return invoices;
    return invoices.filter((inv) => inv.status === filterStatus);
  }, [invoices, filterStatus]);

  // Adicionar nova fatura
  const handleAddInvoice = useCallback(() => {
    if (!newInvoice.customer || newInvoice.amount <= 0 || !newInvoice.dueDate) return;
    const newId = faker.string.uuid();
    const invoice: Invoice = {
      id: newId,
      customer: newInvoice.customer,
      amount: newInvoice.amount,
      dueDate: newInvoice.dueDate,
      status: "pending",
    };
    setInvoices((prev) => [invoice, ...prev]);
    setNewInvoice({ customer: "", amount: 0, dueDate: "" });
    setShowModal(false);
  }, [newInvoice]);

  // Excluir fatura
  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta fatura?")) {
      setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    }
  };

  // Abrir modal de edição
  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setEditForm({
      customer: invoice.customer,
      amount: invoice.amount,
      dueDate: invoice.dueDate,
      status: invoice.status,
    });
  };

  // Salvar edição
  const handleSaveEdit = () => {
    if (!editingInvoice) return;
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === editingInvoice.id
          ? { ...inv, ...editForm, amount: Number(editForm.amount) }
          : inv
      )
    );
    setEditingInvoice(null);
  };

  // Badge de status
  const StatusBadge = ({ status }: { status: InvoiceStatus }) => {
    const config = {
      paid: { label: "Paga", className: "bg-green-100 text-green-800" },
      pending: { label: "Pendente", className: "bg-yellow-100 text-yellow-800" },
      overdue: { label: "Vencida", className: "bg-red-100 text-red-800" },
    };
    const { label, className } = config[status];
    return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${className}`}>{label}</span>;
  };

  const chartData = useMemo(() => generateMonthlyData(), []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard de Faturas</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={18} /> Nova Fatura
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards de métricas (mesmo código) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Total Faturado" value={`R$ ${metrics.total.toFixed(2)}`} icon={<DollarSign className="text-blue-500" size={28} />} bgColor="bg-blue-50" />
          <MetricCard title="Recebido" value={`R$ ${metrics.paid.toFixed(2)}`} icon={<CheckCircle className="text-green-500" size={28} />} bgColor="bg-green-50" />
          <MetricCard title="Pendente" value={`R$ ${metrics.pending.toFixed(2)}`} icon={<Clock className="text-yellow-500" size={28} />} bgColor="bg-yellow-50" />
          <MetricCard title="Vencido" value={`R$ ${metrics.overdue.toFixed(2)}`} icon={<AlertCircle className="text-red-500" size={28} />} bgColor="bg-red-50" />
        </div>

        {/* Gráfico */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Faturamento Mensal</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value}`} />
                <Legend />
                <Bar dataKey="faturamento" fill="#3b82f6" name="Faturamento (R$)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabela com botões de ação */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Faturas</h2>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm"
              >
                <option value="all">Todos</option>
                <option value="paid">Pagas</option>
                <option value="pending">Pendentes</option>
                <option value="overdue">Vencidas</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {invoice.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(invoice.dueDate).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setViewingInvoice(invoice)}
                          className="text-blue-600 hover:text-blue-900 transition"
                          title="Ver detalhes"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(invoice)}
                          className="text-yellow-600 hover:text-yellow-900 transition"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(invoice.id)}
                          className="text-red-600 hover:text-red-900 transition"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredInvoices.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Nenhuma fatura encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal de Nova Fatura (mesmo código, mantido) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Nova Fatura</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Cliente" value={newInvoice.customer} onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })} className="w-full border rounded-lg p-2" />
              <input type="number" placeholder="Valor (R$)" value={newInvoice.amount || ""} onChange={(e) => setNewInvoice({ ...newInvoice, amount: parseFloat(e.target.value) })} className="w-full border rounded-lg p-2" />
              <input type="date" placeholder="Vencimento" value={newInvoice.dueDate} onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })} className="w-full border rounded-lg p-2" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-100">Cancelar</button>
              <button onClick={handleAddInvoice} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Adicionar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      {viewingInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Detalhes da Fatura</h2>
            <div className="space-y-3">
              <p><strong>Cliente:</strong> {viewingInvoice.customer}</p>
              <p><strong>Valor:</strong> R$ {viewingInvoice.amount.toFixed(2)}</p>
              <p><strong>Vencimento:</strong> {new Date(viewingInvoice.dueDate).toLocaleDateString("pt-BR")}</p>
              <p><strong>Status:</strong> <StatusBadge status={viewingInvoice.status} /></p>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setViewingInvoice(null)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Fechar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {editingInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Editar Fatura</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Cliente" value={editForm.customer} onChange={(e) => setEditForm({ ...editForm, customer: e.target.value })} className="w-full border rounded-lg p-2" />
              <input type="number" placeholder="Valor (R$)" value={editForm.amount || ""} onChange={(e) => setEditForm({ ...editForm, amount: parseFloat(e.target.value) })} className="w-full border rounded-lg p-2" />
              <input type="date" placeholder="Vencimento" value={editForm.dueDate} onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })} className="w-full border rounded-lg p-2" />
              <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value as InvoiceStatus })} className="w-full border rounded-lg p-2">
                <option value="pending">Pendente</option>
                <option value="paid">Paga</option>
                <option value="overdue">Vencida</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditingInvoice(null)} className="px-4 py-2 border rounded-lg hover:bg-gray-100">Cancelar</button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ title, value, icon, bgColor }: { title: string; value: string; icon: React.ReactNode; bgColor: string }) {
  return (
    <div className={`${bgColor} rounded-xl p-4 shadow-sm flex items-center justify-between transition hover:scale-105`}>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="p-2 bg-white rounded-full shadow">{icon}</div>
    </div>
  );
}