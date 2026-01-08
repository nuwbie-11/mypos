"use client";

import { User, ApiResponse, UserFormData } from "@/types/user";

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    createdAt: "2023-01-15",
    lastLogin: "2024-01-05",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "manager",
    status: "active",
    createdAt: "2023-02-20",
    lastLogin: "2024-01-04",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "cashier",
    status: "active",
    createdAt: "2023-03-10",
    lastLogin: "2024-01-06",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "cashier",
    status: "pending",
    createdAt: "2024-01-01",
    lastLogin: undefined,
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "viewer",
    status: "inactive",
    createdAt: "2023-04-05",
    lastLogin: "2023-12-15",
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const userService = {
  // Get all users
  async getUsers(): Promise<ApiResponse<User[]>> {
    try {
      // Simulate API call delay
      await delay(800);

      return {
        success: true,
        data: [...mockUsers], // Return a copy to prevent direct mutation
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch users",
        message: (error as Error).message,
      };
    }
  },

  // Get user by ID
  async getUserById(id: string): Promise<ApiResponse<User>> {
    try {
      await delay(400);

      const user = mockUsers.find((user) => user.id === id);

      if (!user) {
        return {
          success: false,
          error: "User not found",
        };
      }

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch user",
        message: (error as Error).message,
      };
    }
  },

  // Create new user
  async createUser(
    userData: Omit<User, "id" | "createdAt">
  ): Promise<ApiResponse<User>> {
    try {
      await delay(600);

      const newUser: User = {
        ...userData,
        id: `user_${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD
      };

      // In a real app, you would send this to your backend
      // For now, we'll just return the new user
      return {
        success: true,
        data: newUser,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to create user",
        message: (error as Error).message,
      };
    }
  },

  // Update user
  async updateUser(
    id: string,
    userData: Partial<UserFormData>
  ): Promise<ApiResponse<User>> {
    try {
      await delay(600);

      const userIndex = mockUsers.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        return {
          success: false,
          error: "User not found",
        };
      }

      const updatedUser = {
        ...mockUsers[userIndex],
        ...userData,
      };

      // In a real app, you would send this to your backend
      // For now, we'll just return the updated user
      return {
        success: true,
        data: updatedUser,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to update user",
        message: (error as Error).message,
      };
    }
  },

  // Delete user
  async deleteUser(id: string): Promise<ApiResponse<void>> {
    try {
      await delay(500);

      const userIndex = mockUsers.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        return {
          success: false,
          error: "User not found",
        };
      }

      // In a real app, you would send this to your backend
      // For now, we'll just return success
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to delete user",
        message: (error as Error).message,
      };
    }
  },
};
