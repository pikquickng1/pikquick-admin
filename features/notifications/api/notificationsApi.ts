import { NotificationsResponse } from "../types/notifications.types";

export const notificationsApi = {
  getNotifications: async (): Promise<NotificationsResponse> => {
    // Mock API call
    return {
      notifications: [
        {
          id: "1",
          title: "New KYC Submission",
          description: "John Doe submitted KYC documents for review",
          timestamp: "5 minutes ago",
          isNew: true,
          icon: "shield",
          iconColor: "blue",
        },
        {
          id: "2",
          title: "New User Signup",
          description: "15 new users signed up in the last hour",
          timestamp: "12 minutes ago",
          isNew: true,
          icon: "users",
          iconColor: "green",
        },
        {
          id: "3",
          title: "Dispute Raised",
          description: "Task #4521 has a new dispute from customer",
          timestamp: "23 minutes ago",
          isNew: true,
          icon: "alert",
          iconColor: "red",
        },
        {
          id: "4",
          title: "Payout Request",
          description: "Runner #234 requested payout of ₦45,000",
          timestamp: "1 hour ago",
          isNew: true,
          icon: "dollar",
          iconColor: "purple",
        },
        {
          id: "5",
          title: "KYC Approved",
          description: "Sarah Johnson's KYC has been approved",
          timestamp: "2 hours ago",
          isNew: false,
          icon: "shield",
          iconColor: "blue",
        },
        {
          id: "6",
          title: "User Milestone",
          description: "Congratulations! You reached 4,000 users",
          timestamp: "3 hours ago",
          isNew: false,
          icon: "users",
          iconColor: "green",
        },
      ],
      unreadCount: 4,
    };
  },

  markAsRead: async (notificationId: string): Promise<void> => {
    // Mock API call
    console.log("Marking notification as read:", notificationId);
  },

  markAllAsRead: async (): Promise<void> => {
    // Mock API call
    console.log("Marking all notifications as read");
  },
};
