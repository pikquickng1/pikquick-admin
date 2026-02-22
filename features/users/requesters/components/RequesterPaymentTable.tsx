import { DataTable } from "@/components/ui/data-table";
import { RequesterPayment } from "../types/payment.types";

interface RequesterPaymentTableProps {
  payments: RequesterPayment[];
}

export function RequesterPaymentTable({ payments }: RequesterPaymentTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const columns = [
    {
      key: "id",
      header: "Payment ID",
      render: (payment: RequesterPayment) => (
        <span className="text-sm text-text-primary">{payment.id}</span>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (payment: RequesterPayment) => (
        <span className="text-sm text-text-primary">{formatDate(payment.date)}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (payment: RequesterPayment) => (
        <span className="text-sm text-text-primary font-medium">
          {formatCurrency(payment.amount)}
        </span>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (payment: RequesterPayment) => (
        <span className="text-sm text-text-secondary">{payment.type}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (payment: RequesterPayment) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            payment.status === "completed"
              ? "bg-green-100 text-green-700"
              : payment.status === "pending"
              ? "bg-orange-100 text-orange-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={payments}
      keyExtractor={(payment) => payment.id}
      emptyMessage="No payments found"
    />
  );
}
