import { ReferralDetails } from "../types/referral-detail.types";

export const referralDetailApi = {
  getReferralDetails: async (id: string): Promise<ReferralDetails> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      referrer: {
        id: "RUN-2045",
        name: "Adebayo Samuel",
        role: "Runner",
        email: "a.samuel@example.com",
        phone: "+234 812 345 6789",
        joinedDate: "2023-08-15",
        totalReferrals: 42,
      },
      referredUser: {
        id: "REQ-1522",
        name: "John Doe",
        role: "Requester",
        email: "j.doe@example.com",
        phone: "+234 803 111 2233",
        joinedDate: "2024-03-12",
        status: "Verified",
      },
      timeline: [
        {
          id: "1",
          event: "Invite sent",
          timestamp: "2024-03-10 14:30",
          completed: true,
        },
        {
          id: "2",
          event: "Signup via referral link",
          timestamp: "2024-03-12 09:15",
          completed: true,
        },
        {
          id: "3",
          event: "First task requested",
          timestamp: "2024-03-12 11:45",
          completed: true,
        },
        {
          id: "4",
          event: "First task completed",
          timestamp: "2024-03-14 16:20",
          completed: true,
        },
      ],
      qualificationTask: {
        taskId: "TASK-4521",
        serviceType: "Grocery Shopping",
        totalPaid: 12500,
        completionDate: "March 14, 2024",
        status: "Completed",
      },
      fraudIndicators: [
        {
          type: "device_similarity",
          label: "Device Similarity",
          level: "Low",
          value: "Low (0%)",
          status: "safe",
        },
        {
          type: "ip_match",
          label: "IP Match Warning",
          level: "Medium",
          value: "Medium (15%)",
          status: "warning",
        },
        {
          type: "rapid_referral",
          label: "Rapid Referral Flag",
          level: "Low",
          value: "Safe",
          status: "safe",
        },
      ],
      systemMetadata: {
        referralId: "REF-883921",
        trackingCode: "PIK-AD72",
        utmSource: "mobile_app",
        referrerIp: "192.168.1.45",
      },
      internalNotes: "",
    };
  },

  updateInternalNotes: async (id: string, notes: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Updating notes for referral:", id, notes);
  },

  approveReferral: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Approving referral:", id);
  },

  disqualifyReferral: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Disqualifying referral:", id);
  },
};
