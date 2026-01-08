// User-related types
export type UserRole = "admin" | "manager" | "cashier" | "viewer";
export type UserStatus = "active" | "inactive" | "pending";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User form types
export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}