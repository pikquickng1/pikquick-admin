"use client";

import { X, Download, FileText } from "lucide-react";

interface DocumentPreviewModalProps {
  open: boolean;
  onClose: () => void;
  documentType: string;
  documentUrl?: string;
  isImage?: boolean;
  userInitials?: string;
}

export function DocumentPreviewModal({
  open,
  onClose,
  documentType,
  documentUrl,
  isImage = false,
  userInitials,
}: DocumentPreviewModalProps) {
  if (!open) return null;

  const handleDownload = () => {
    console.log("Downloading document:", documentType);
    // TODO: Implement actual download
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-text-primary">{documentType}</h2>
            <button
              onClick={onClose}
              className="p-1 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              {isImage && userInitials ? (
                // Selfie preview
                <div className="bg-blue-500 rounded-full h-48 w-48 flex items-center justify-center mb-6">
                  <span className="text-white text-6xl font-semibold">{userInitials}</span>
                </div>
              ) : (
                // Document preview
                <FileText className="w-32 h-32 text-neutral-400 mb-6" />
              )}
              <p className="text-sm text-text-secondary">Document Preview: {documentType}</p>
              <p className="text-xs text-text-secondary mt-2">Full resolution view</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-3 px-6 py-4 border-t border-neutral-200">
            <button
              onClick={onClose}
              className="px-8 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-full border border-gray-300"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-8 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-full flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
