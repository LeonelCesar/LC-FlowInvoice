"use client";

import { Container } from "@/components/Container/Container";
import { Modal } from "@/components/ui/Modal";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Invoice } from "@/types/invoice";
import { invoicesService } from "@/services/invoices.service";
import { Button } from "@/components/ui/Button";

export default function InvoicesTable() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const pageSize = 8;

  // Carregar todas as faturas
  useEffect(() => {
    setLoading(true);
    invoicesService.getAll().then((data) => {
      setInvoices(data);
      setLoading(false);
    });
  }, []);

  const totalPages = Math.ceil(invoices.length / pageSize);
  const paginatedInvoices = invoices.slice((page - 1) * pageSize, page * pageSize);

  // Lazy fetch para fatura selecionada
  useEffect(() => {
    if (!selectedInvoiceId) {
      setSelectedInvoice(null);
      return;
    }
    setSelectedInvoice(null);
    invoicesService.getById(selectedInvoiceId).then((f: any) => setSelectedInvoice(f || null));
  }, [selectedInvoiceId]);

  return (
    <Container>
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-500">Últimas Faturas</h2>
       
          <Button variant="primary" onClick={() => alert("Funcionalidade de criação de fatura ainda não implementada")}>
            Nova Fatura
          </Button>
        </div>

        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Carregando faturas...</div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-700">Cliente</th>
                  <th className="px-6 py-4 font-medium text-gray-700">Valor (€)</th>
                  <th className="px-6 py-4 font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 font-medium text-gray-700">Emitida</th>
                  <th className="px-6 py-4 font-medium text-gray-700">Vencimento</th>
                  <th className="px-6 py-4 font-medium text-gray-700 text-center">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{invoice.clientId}</td>
                    <td className="px-6 py-4 text-gray-600">€ {invoice.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-600">{invoice.status}</td>
                    <td className="px-6 py-4 text-gray-600">{new Date(invoice.issuedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-gray-600">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedInvoiceId(invoice.id)}
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

      {/* Modal */}
      <Modal
        open={!!selectedInvoiceId}
        onClose={() => setSelectedInvoiceId(null)}
        title="Detalhes da Fatura"
      >
        {!selectedInvoice ? (
          <div className="text-sm text-gray-500">Carregando...</div>
        ) : (
          <div className="space-y-3 text-sm text-gray-700">
            <div><strong>Cliente:</strong> {selectedInvoice.clientId}</div>
            <div><strong>Valor:</strong> € {selectedInvoice.amount.toLocaleString()}</div>
            <div><strong>Status:</strong> {selectedInvoice.status}</div>
            <div><strong>Emitida em:</strong> {new Date(selectedInvoice.issuedAt).toLocaleString()}</div>
            <div><strong>Vencimento:</strong> {new Date(selectedInvoice.dueDate).toLocaleString()}</div>
            <div><strong>ID:</strong> {selectedInvoice.id}</div>
          </div>
        )}
      </Modal>
    </Container>
  );
}
