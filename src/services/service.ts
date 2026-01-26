// src/services/dashboard.service.ts
import { DashboardMetrics } from "../types/dashboard";

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  return {
    totalRevenue: 12450,
    pendingInvoices: 8,
    paidInvoices: 32,
    overdueInvoices: 3,
  }
}
