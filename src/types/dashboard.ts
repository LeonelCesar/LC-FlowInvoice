// src/types/dashboard.ts
export interface DashboardMetrics {
  totalRevenue: number,
  pendingInvoices: number,
  paidInvoices: number,
  overdueInvoices: number,
}

export interface RevenueByMonth {
  month: string,
  total: number,
}
