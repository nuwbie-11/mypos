"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, ApiResponse } from "@/types/user";
import { UserList } from "./_components/user-list";
import { UserForm } from "./_components/user-form";
import { userService } from "./actions";

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response: ApiResponse<User[]> = await userService.getUsers();
      
      if (response.success && response.data) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      } else {
        setError(response.error || "Failed to load users");
      }
    } catch (err) {
      setError("An unexpected error occurred while loading users");
      console.error("Error loading users:", err);
    } finally {
      setIsLoading(false);
    }
  };


  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleDeleteUser = async (user: User) => {
    setIsSubmitting(true);
    
    try {
      const response: ApiResponse<void> = await userService.deleteUser(user.id);
      
      if (response.success) {
        // Remove the user from the local state
        setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
        setFilteredUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
      } else {
        setError(response.error || "Failed to delete user");
      }
    } catch (err) {
      setError("An unexpected error occurred while deleting the user");
      console.error("Error deleting user:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      let response: ApiResponse<User>;
      
      if (formMode === "create") {
        response = await userService.createUser({
          name: formData.name,
          email: formData.email,
          role: formData.role as any,
          status: formData.status as any,
        });
      } else {
        if (!selectedUser) return;
        
        response = await userService.updateUser(selectedUser.id, {
          name: formData.name,
          email: formData.email,
          role: formData.role as any,
          status: formData.status as any,
        });
      }
      
      if (response.success && response.data) {
        if (formMode === "create") {
          // Add the new user to the list
          setUsers(prevUsers => [...prevUsers, response.data!]);
          setFilteredUsers(prevUsers => [...prevUsers, response.data!]);
        } else {
          // Update the user in the list
          setUsers(prevUsers => 
            prevUsers.map(u => u.id === selectedUser?.id ? response.data! : u)
          );
          setFilteredUsers(prevUsers => 
            prevUsers.map(u => u.id === selectedUser?.id ? response.data! : u)
          );
        }
        
        setIsFormOpen(false);
        setSelectedUser(null);
      } else {
        setError(response.error || "Failed to save user");
      }
    } catch (err) {
      setError("An unexpected error occurred while saving the user");
      console.error("Error saving user:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateNewUser = () => {
    setSelectedUser(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions for your POS system
          </p>
        </div>
        <Button onClick={handleCreateNewUser}>
          Add User
        </Button>
      </div>

      <UserList
        users={filteredUsers}
        isLoading={isLoading}
        error={error}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onRetry={loadUsers}
      />

      <UserForm
        user={selectedUser || undefined}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}