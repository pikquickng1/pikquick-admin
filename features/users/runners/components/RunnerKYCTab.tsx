"use client";

import { CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { StatusBadge } from "@/components/ui/status-badge";
import { runnerDocumentsService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import { formatDate } from "@/lib/utils/date";
import { DocumentVerificationStatus } from "@/lib/types/enums";
import type { RunnerDocument } from "@/lib/types";

interface KYCDocument {
  id: string;
  type: string;
  title: string;
  description: string;
  verifiedDate: string;
  status: "verified" | "pending" | "rejected";
}

interface RunnerKYCTabProps {
  runnerId: string;
}

function toKycDocument(doc: RunnerDocument): KYCDocument {
  const status = (doc.verification_status ??
    DocumentVerificationStatus.PENDING) as KYCDocument["status"];
  return {
    id: doc.id,
    type: doc.document_type_name ?? doc.document_name ?? "Document",
    title: doc.document_name ?? doc.document_number ?? "—",
    description:
      status === "rejected" ? (doc.rejection_reason ?? "") : "",
    verifiedDate: formatDate(doc.verified_at ?? doc.submitted_at),
    status,
  };
}

export function RunnerKYCTab({ runnerId }: RunnerKYCTabProps) {
  const { data } = useQuery({
    queryKey: queryKeys.runners.documents(runnerId),
    queryFn: () => runnerDocumentsService.getByRunnerId(runnerId),
    enabled: Boolean(runnerId),
  });

  const documents = (data ?? []).map(toKycDocument);
  const allVerified =
    documents.length > 0 && documents.every((doc) => doc.status === "verified");

  return (
    <div className="bg-white rounded-2xl border border-light p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">KYC Verification Status</h2>
        {allVerified && (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-600">
            All Verified
            <CheckCircle className="w-4 h-4" />
          </span>
        )}
      </div>

      {documents.length === 0 ? (
        <p className="text-sm text-text-secondary text-center py-8">
          No KYC documents uploaded
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <StatusBadge status={doc.status} />
              </div>

              <h3 className="text-base font-semibold text-text-primary mb-1">{doc.type}</h3>
              <p className="text-sm text-text-secondary mb-1">{doc.title}</p>
              {doc.description && (
                <p className="text-sm text-text-secondary mb-3">{doc.description}</p>
              )}
              <p className="text-xs text-text-secondary mb-4">
                Verified on {doc.verifiedDate}
              </p>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-text-primary transition-colors">
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
