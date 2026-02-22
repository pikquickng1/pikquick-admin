import { CheckCircle, Search } from "lucide-react";

interface KYCDocument {
  id: string;
  type: string;
  title: string;
  description: string;
  verifiedDate: string;
  status: "Verified" | "Pending" | "Rejected";
}

export function RunnerKYCTab() {
  const kycDocuments: KYCDocument[] = [
    {
      id: "1",
      type: "ID Verification",
      title: "National ID Card",
      description: "",
      verifiedDate: "Oct 15, 2025",
      status: "Verified",
    },
    {
      id: "2",
      type: "Selfie",
      title: "Face Match Confirmed",
      description: "",
      verifiedDate: "Oct 15, 2025",
      status: "Verified",
    },
    {
      id: "3",
      type: "Address",
      title: "Utility Bill",
      description: "",
      verifiedDate: "Oct 15, 2025",
      status: "Verified",
    },
  ];

  const allVerified = kycDocuments.every((doc) => doc.status === "Verified");

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kycDocuments.map((doc) => (
          <div key={doc.id} className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">Verified</span>
            </div>

            <h3 className="text-base font-semibold text-text-primary mb-1">{doc.type}</h3>
            <p className="text-sm text-text-secondary mb-1">{doc.title}</p>
            {doc.description && (
              <p className="text-sm text-text-secondary mb-3">{doc.description}</p>
            )}
            <p className="text-xs text-text-secondary mb-4">Verified on {doc.verifiedDate}</p>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-text-primary transition-colors">
              <Search className="w-4 h-4" />
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
