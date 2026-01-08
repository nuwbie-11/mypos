"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Shield,
  Check,
  X,
  Loader2
} from "lucide-react";

// Define role types
type Role = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
};

// Mock data for demonstration
const mockRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full access to all features and settings",
    permissions: ["read", "write", "delete", "manage_users", "manage_settings"],
    createdAt: "2023-01-15"
  },
  {
    id: "2",
    name: "Manager",
    description: "Access to sales, inventory, and reports",
    permissions: ["read", "write", "manage_inventory", "view_reports"],
    createdAt: "2023-02-20"
  },
  {
    id: "3",
    name: "Cashier",
    description: "Access to POS and basic sales functions",
    permissions: ["read", "process_sales", "view_inventory"],
    createdAt: "2023-03-10"
  },
  {
    id: "4",
    name: "Viewer",
    description: "Read-only access to reports and data",
    permissions: ["read"],
    createdAt: "2023-04-05"
  }
];

export default function UserRolesPage() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [filteredRoles, setFilteredRoles] = useState<Role[]>(mockRoles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"list" | "detail" | "create" | "edit">("list");

  // Filter roles based on search term
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    
    if (!value) {
      setFilteredRoles(roles);
      return;
    }

    const filtered = roles.filter(role => 
      role.name.toLowerCase().includes(value.toLowerCase()) ||
      role.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRoles(filtered);
  };

  const handleDeleteRole = () => {
    if (!selectedRole) return;

    setRoles(prevRoles => prevRoles.filter(role => role.id !== selectedRole.id));
    setFilteredRoles(prevRoles => prevRoles.filter(role => role.id !== selectedRole.id));
    setIsDeleteDialogOpen(false);
    setSelectedRole(null);
  };

  const handleViewRole = (role: Role) => {
    setSelectedRole(role);
    setCurrentView("detail");
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setCurrentView("edit");
    setIsAddEditDialogOpen(true);
  };

  const handleDeleteClick = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateNewRole = () => {
    setSelectedRole(null);
    setCurrentView("create");
    setIsAddEditDialogOpen(true);
  };

  const getPermissionBadge = (permission: string) => {
    // Simple mapping for display purposes
    const permissionMap: Record<string, string> = {
      read: "Read",
      write: "Write",
      delete: "Delete",
      manage_users: "Manage Users",
      manage_settings: "Manage Settings",
      manage_inventory: "Manage Inventory",
      view_reports: "View Reports",
      process_sales: "Process Sales",
      view_inventory: "View Inventory"
    };

    return (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">
        {permissionMap[permission] || permission}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Roles</h1>
          <p className="text-muted-foreground">
            Manage user roles and permissions for your POS system
          </p>
        </div>
        <Button onClick={handleCreateNewRole}>
          <Plus className="mr-2 h-4 w-4" />
          Add Role
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Roles</CardTitle>
              <CardDescription>
                {filteredRoles.length} role{filteredRoles.length !== 1 ? 's' : ''} found
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
                className="pl-8 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-500" />
                          {role.name}
                        </div>
                      </TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.slice(0, 3).map((permission, idx) => (
                            <span key={idx} className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                              {permission.replace(/_/g, ' ')}
                            </span>
                          ))}
                          {role.permissions.length > 3 && (
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-100">
                              +{role.permissions.length - 3} more
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(role.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewRole(role)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditRole(role)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(role)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No roles found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Role Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {currentView === "create" ? "Add New Role" : "Edit Role"}
            </DialogTitle>
            <DialogDescription>
              {currentView === "create" 
                ? "Enter the details for the new role." 
                : "Update the role information."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input 
                id="name" 
                className="col-span-3" 
                defaultValue={selectedRole?.name || ""}
                placeholder="Role name"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="description" className="text-right text-sm font-medium pt-2">
                Description
              </label>
              <textarea 
                id="description" 
                className="col-span-3 min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                defaultValue={selectedRole?.description || ""}
                placeholder="Role description"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label className="text-right text-sm font-medium pt-2">
                Permissions
              </label>
              <div className="col-span-3 space-y-2">
                {["read", "write", "delete", "manage_users", "manage_settings", "manage_inventory", "view_reports", "process_sales", "view_inventory"].map((permission) => (
                  <div key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`perm-${permission}`}
                      className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                      defaultChecked={selectedRole?.permissions.includes(permission) || false}
                    />
                    <label htmlFor={`perm-${permission}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {permission.replace(/_/g, ' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsAddEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button>
              {currentView === "create" ? "Create Role" : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the role{" "}
              <strong>{selectedRole?.name}</strong> and remove it from all users.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteRole}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}