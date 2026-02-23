import { Task, TaskListFilters, TaskListResponse, TaskStats } from "../types/task.types";

export const taskApi = {
  getTasksList: async (
    filters: TaskListFilters,
    page: number = 1
  ): Promise<TaskListResponse> => {
    // TODO: Replace with actual API call

    // Mock data
    const mockData = Array.from({ length: 8 }, (_, i) => ({
      id: `TSK${String(i + 1).padStart(3, "0")}`,
      title: "Grocery Shopping at Shoprite",
      requesterName: "Adewale Johnson",
      runnerName: i === 2 ? "Unassigned" : "Ibrahim Musa",
      budget: 2500,
      datePosted: "2025-10-28",
      status:
        i === 0 ? ("In Progress" as const) :
          i === 2 ? ("Pending" as const) :
            i === 4 ? ("Cancelled" as const) :
              ("Completed" as const),
    }));

    return {
      data: mockData,
      pagination: {
        currentPage: page,
        totalPages: 13,
        totalItems: 100,
        itemsPerPage: 8,
      },
    };
  },

  getTaskById: async (id: string): Promise<Task> => {
    // TODO: Replace with actual API call
    return {
      id: "TSK001",
      title: "Grocery Shopping at Shoprite",
      description: "Need someone to help with grocery shopping at Shoprite",
      requesterName: "Adewale Johnson",
      requesterEmail: "adewale.j@email.com",
      runnerName: "Ibrahim Musa",
      runnerEmail: "ibrahim.musa@email.com",
      budget: 2500,
      datePosted: "2025-10-28",
      status: "In Progress",
      category: "Shopping",
      location: "Lekki, Lagos",
      bids: [
        {
          id: "BID001",
          runnerName: "Ibrahim Musa",
          rating: 4.8,
          amount: 2500,
          status: "Accepted",
        },
        {
          id: "BID002",
          runnerName: "Ibrahim Musa",
          rating: 4.8,
          amount: 2800,
          status: "Declined",
        },
        {
          id: "BID003",
          runnerName: "Ibrahim Musa",
          rating: 4.8,
          amount: 3800,
          status: "Declined",
        },
      ],
      timelineEvents: [
        {
          id: "EVT001",
          status: "Posted",
          timestamp: "2025-10-28 09:00 AM",
          completed: true,
        },
        {
          id: "EVT002",
          status: "Runner Assigned",
          timestamp: "2025-10-28 09:30 AM",
          completed: true,
        },
        {
          id: "EVT003",
          status: "In Progress",
          timestamp: "2025-10-28 10:00 AM",
          completed: true,
        },
        {
          id: "EVT004",
          status: "Completed",
          timestamp: "2025-10-28 12:30 PM",
          completed: true,
        },
      ],
      progress: 100,
      chatMessages: [
        {
          id: "MSG001",
          sender: "Adewale",
          message: "Please get the freshest vegetables",
          timestamp: "09:35 AM",
        },
        {
          id: "MSG002",
          sender: "Ibrahim",
          message: "Sure, I will check carefully",
          timestamp: "09:36 AM",
        },
        {
          id: "MSG003",
          sender: "Ibrahim",
          message: "Task completed and delivered",
          timestamp: "12:30 PM",
        },
      ],
      deliveryFiles: [
        {
          id: "FILE001",
          type: "receipt",
          label: "Receipt",
          url: "/files/receipt.pdf",
        },
        {
          id: "FILE002",
          type: "photo",
          label: "Delivery Photo",
          url: "/files/delivery-photo.jpg",
        },
      ],
    };
  },

  getTaskStats: async (): Promise<TaskStats> => {
    // TODO: Replace with actual API call
    return {
      activeTasks: 1145,
      approvedRefunds: 12500,
      activeRunners: 362,
    };
  },
};
