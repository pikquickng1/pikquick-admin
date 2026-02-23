"use client";

import { Image, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeliveryFile {
  id: string;
  type: "receipt" | "photo";
  label: string;
  url: string;
}

interface TaskDeliveryEvidenceProps {
  files: DeliveryFile[];
}

export function TaskDeliveryEvidence({ files }: TaskDeliveryEvidenceProps) {
  console.log("TaskDeliveryEvidence files:", files);
  
  const handleDownload = (file: DeliveryFile) => {
    // TODO: Implement actual download logic
    console.log("Downloading:", file.url);
  };

  return (
    <div className="bg-white rounded-2xl border border-light p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">
        Uploaded Delivery Evidence
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {files && files.length > 0 ? (
          files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                  <Image className="w-5 h-5 text-gray-500" />
                </div>
                <span className="text-sm text-text-secondary">{file.label}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(file)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
          ))
        ) : (
          <p className="text-sm text-text-secondary text-center py-4 col-span-2">
            No delivery evidence uploaded yet
          </p>
        )}
      </div>
    </div>
  );
}
