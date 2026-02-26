export interface KYCVerification {
  id: string;
  runnerName: string;
  idType: string;
  email: string;
  phone: string;
  dateSubmitted: string;
  status: "pending" | "approved" | "rejected" | "resubmission";
  documents?: {
    idDocument?: string;
    proofOfAddress?: string;
    selfie?: string;
  };
  rejectionReason?: string;
}

export interface KYCListFilters {
  search: string;
}

export interface KYCListResponse {
  data: KYCVerification[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface KYCStats {
  pendingVerifications: number;
  resubmissionRequests: number;
}
