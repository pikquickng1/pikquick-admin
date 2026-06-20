import { UserType } from "@/lib/types/enums";

export interface Wallet {
  id: string;
  userId: string;
  userName: string;
  userType: UserType;
  currentBalance: number;
  lastTransaction: string;
  totalTransactions: number;
}

export interface WalletDetails extends Wallet {
  email: string;
  phone: string;
  accountCreated: string;
}

export interface WalletListFilters {
  search: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface WalletListResponse {
  data: Wallet[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface WalletStats {
  totalRequesterBalance: number;
  totalRunnerBalance: number;
  totalWallets: number;
}
