import { CheckCircle } from "lucide-react";
import { USE_MOCKS } from "@/lib/config/feature-flags";
import { StatusBadge } from "@/components/ui/status-badge";

interface KYCDocument {
  id: string;
  type: string;
  title: string;
  description: string;
  verifiedDate: string;
  status: "verified" | "pending" | "rejected";
}

const MOCK_DOCUMENTS: KYCDocument[] = USE_MOCKS
  ? [
      {
        id: "1",
        type: "ID Verification",
        title: "National ID Card",
        description: "",
        verifiedDate: "Oct 15, 2025",
        status: "verified",
      },
      {
        id: "2",
        type: "Selfie",
        title: "Face Match Confirmed",
        description: "",
        verifiedDate: "Oct 15, 2025",
        status: "verified",
      },
      {
        id: "3",
        type: "Address",
        title: "Utility Bill",
        description: "",
        verifiedDate: "Oct 15, 2025",
        status: "verified",
      },
    ]
  : [];

export function RunnerKYCTab() {
  const documents = MOCK_DOCUMENTS;
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
