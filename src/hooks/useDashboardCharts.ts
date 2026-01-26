// hooks/useDashboardCharts.ts
import {
  revenueByMonth,
  invoiceStatusDistribution,
} from "../lib/mockDashboardCharts";

export const useDashboardCharts = () => {
  return {
    revenueByMonth,
    invoiceStatusDistribution,
    isLoading: false,
  };
};
