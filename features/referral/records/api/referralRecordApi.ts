import {
  ReferralRecord,
  ReferralRecordFilters,
  ReferralRecordListResponse,
} from "../types/referral-record.types";

export const referralRecordApi = {
  getReferralRecords: async (
    filters: ReferralRecordFilters,
    page: number = 1
  ): Promise<ReferralRecordListResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockData: ReferralRecord[] = [
      {
        id: "1",
        referrer: "Adebayo Samuel",
        referrerRole: "Runner",
        referredUser: "John Doe",
        signupDate: "2024-03-12",
        firstTask: {
          completed: true,
          taskId: "TASK-45231",
        },
        status: "Active",
        month: "March",
      },
      {
        id: "2",
        referrer: "Chioma Okoro",
        referrerRole: "Requester",
        referredUser: "Sarah Smith",
        signupDate: "2024-03-14",
        firstTask: {
          completed: true,
          taskId: "TASK-45231",
        },
        status: "Active",
        month: "March",
      },
      {
        id: "3",
        referrer: "Ibrahim Musa",
        referrerRole: "Runner",
        referredUser: "Michael Jordan",
        signupDate: "2024-03-15",
        firstTask: {
          completed: false,
        },
        status: "Pending",
        month: "March",
      },
      {
        id: "4",
        referrer: "Osawele John",
        referrerRole: "Runner",
        referredUser: "Alice Cooper",
        signupDate: "2024-03-15",
        firstTask: {
          completed: false,
        },
        status: "Disqualified",
        month: "March",
      },
      {
        id: "5",
        referrer: "Blessing Udoh",
        referrerRole: "Requester",
        referredUser: "David Beckham",
        signupDate: "2024-03-10",
        firstTask: {
          completed: true,
          taskId: "TASK-45231",
        },
        status: "Active",
        month: "March",
      },
    ];

    return {
      data: mockData,
      pagination: {
        currentPage: page,
        totalPages: 20,
        totalItems: 100,
        itemsPerPage: 5,
      },
    };
  },
};
