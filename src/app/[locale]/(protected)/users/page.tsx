import { redirect } from "next/navigation";
import { PageContainer } from "@/components/page-container";

export default function UsersPage() {
  // Redirect to user management as the default user page
  redirect("/users/management");
}