"use client";

import { useMemo, useState } from "react"
import { clientsMock } from "@/mocks/clients.mock";
import  ClientsHeader  from "@/components/clients/ClientsHeader";
import  ClientsFilters  from "@/components/clients/ClientsFilter";
import { ClientsTable } from "@/components/clients/ClientsTable"

export default function ClientsPage() {
  const [search, setSearch] = useState("")

  const filteredClients = useMemo(() => {
    return clientsMock.filter((client) =>
      `${client.name} ${client.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [search])

  return (
    <section className="space-y-6">
      <ClientsHeader />

      <ClientsFilters
        search={search}
        onSearchChange={setSearch}
      />

      <ClientsTable clients={filteredClients} />
    </section>
  )
}
