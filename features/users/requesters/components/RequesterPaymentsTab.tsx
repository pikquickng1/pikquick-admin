'use client'

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RequesterPayment } from "../types/payment.types";
import { RequesterPaymentTable } from "./RequesterPaymentTable";

interface RequesterPaymentsTabProps {
  payments: RequesterPayment[];
}

export function RequesterPaymentsTab({ payments = [] }: RequesterPaymentsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPayments = payments.filter((payment) =>
    payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-light overflow-hidden">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Payment Records</h2>

        {/* Search and Filter Box - No bottom border */}
        <div className="bg-white border border-neutral-200 border-b-0 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-sm relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 py-7 rounded border-neutral-200 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button className="h-14 px-4 rounded border border-neutral-200 text-sm text-text-primary bg-white flex items-center gap-2 hover:bg-neutral-50">
              <span>Filter</span>
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Table */}
      <div className="px-6 pb-6">
        <RequesterPaymentTable payments={filteredPayments} />
      </div>
    </div>
  );
}
