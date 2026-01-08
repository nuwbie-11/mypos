"use client";

import PageContainer from "@/components/page-container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  Shield,
  Clock,
  Edit,
  Activity,
  ArrowLeft,
} from "lucide-react";
import { User as UserType } from "@/types/user";
import { useRouter } from "next/navigation";

// Mock user data
const mockUser: UserType = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: "admin",
  status: "active",
  createdAt: "2023-01-15",
  lastLogin: "2024-01-05",
};

export default function UserDetailPage({
  params,
}: {
  params: { userId: string };
}) {
  const router = useRouter();
  const user = mockUser; // In a real app, this would come from params.userId

  const getStatusBadge = () => {
    switch (user.status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="h-9 w-9"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                User Details
              </h1>
              <p className="text-muted-foreground">
                View and manage user information
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              Activity Log
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Basic information about the user
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-full p-2">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-full p-2">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-full p-2">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium capitalize">{user.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-full p-2">
                  <div className="h-5 w-5 rounded-full bg-current" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="font-medium">{getStatusBadge()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>
                Account creation and activity details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-full p-2">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Account Created
                  </p>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-full p-2">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p className="font-medium">
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleString()
                      : "Never"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-full p-2">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Permissions</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.role === "admin" && (
                      <>
                        <Badge variant="secondary">All Access</Badge>
                        <Badge variant="secondary">Manage Users</Badge>
                        <Badge variant="secondary">Manage Settings</Badge>
                      </>
                    )}
                    {user.role === "manager" && (
                      <>
                        <Badge variant="secondary">View Reports</Badge>
                        <Badge variant="secondary">Manage Inventory</Badge>
                        <Badge variant="secondary">Process Sales</Badge>
                      </>
                    )}
                    {user.role === "cashier" && (
                      <>
                        <Badge variant="secondary">Process Sales</Badge>
                        <Badge variant="secondary">View Inventory</Badge>
                      </>
                    )}
                    {user.role === "viewer" && (
                      <Badge variant="secondary">Read Only</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="destructive">Deactivate User</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
