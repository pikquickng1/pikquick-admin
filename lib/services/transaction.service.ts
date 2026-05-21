import { apiClient } from "@/lib/api/client";

export const transactionService = {
  getTransactions(params: Record<string, unknown>) {
    return apiClient.get("/admin/transactions", { params }).then((r) => r.data);
  },
  getTransactionById(id: string) {
    return apiClient.get(`/admin/transactions/${id}`).then((r) => r.data);
  },
  getTransactionStats() {
    return apiClient.get("/admin/transactions/stats").then((r) => r.data);
  },
  downloadReceipt(transactionId: string) {
    return apiClient.get(`/admin/transactions/${transactionId}/receipt`, { responseType: "blob" }).then((r) => r.data);
  },
  exportTransactions(params: Record<string, unknown>, format: string) {
    return apiClient.get("/admin/transactions/export", { params: { ...params, format }, responseType: "blob" }).then((r) => r.data);
  },
};
