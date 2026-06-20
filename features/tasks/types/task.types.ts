import {
  ALL_FILTER,
  BidStatus,
  DeliveryFileType,
  TaskStatus,
} from "@/lib/types/enums";

export type TaskDisplayStatus = "In Progress" | "Completed" | "Pending" | "Cancelled";

export interface Bid {
  id: string;
  runnerName: string;
  rating: number;
  amount: number;
  status: BidStatus;
}

export interface TimelineEvent {
  id: string;
  status: string;
  timestamp: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

export interface DeliveryFile {
  id: string;
  type: DeliveryFileType;
  label: string;
  url: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  requesterName: string;
  requesterEmail: string;
  runnerName: string | null;
  runnerEmail: string | null;
  budget: number;
  datePosted: string;
  status: TaskDisplayStatus;
  category: string;
  location: string;
  bids?: Bid[];
  timelineEvents?: TimelineEvent[];
  progress?: number;
  chatMessages?: ChatMessage[];
  deliveryFiles?: DeliveryFile[];
}

export interface TaskListItem {
  id: string;
  title: string;
  requesterName: string;
  runnerName: string | null;
  budget: number;
  datePosted: string;
  status: TaskDisplayStatus;
}

export interface TaskListFilters {
  search: string;
  status: TaskStatus | typeof ALL_FILTER;
  sortBy: string;
}

export interface TaskListResponse {
  data: TaskListItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface TaskStats {
  activeTasks: number;
  approvedRefunds: number;
  activeRunners: number;
}
