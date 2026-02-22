export interface RequesterPayment {
  id: string;
  date: string;
  amount: number;
  type: string;
  status: "completed" | "pending" | "failed";
}
