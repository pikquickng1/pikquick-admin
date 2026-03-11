export interface Profile {
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  memberSince: string;
  lastLogin: {
    date: string;
    time: string;
    device: string;
    location: string;
    ipAddress: string;
  };
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  icon: string;
}
