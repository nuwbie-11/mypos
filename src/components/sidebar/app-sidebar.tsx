"use client";

import * as React from "react";
import {
  AlertCircleIcon,
  Boxes,
  BoxIcon,
  GalleryVerticalEnd,
  LayoutDashboard,
  ShoppingBasket,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { url } from "inspector";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [],
  navMain: [
    {
      title: "dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "users",
      url: "/users",
      icon: Users,
      items: [
        {
          title: "user-management",
          url: "/users/management",
        },
        {
          title: "user-roles",
          url: "/users/roles",
        },
      ],
    },
    {
      title: "products",
      url: "/products",
      icon: BoxIcon,
      items: [
        {
          title: "product-management",
          url: "/product/management",
        },
        {
          title: "product-categories",
          url: "/product/categories",
        },
      ],
    },
    {
      title: "sales",
      url: "/sales",
      icon: ShoppingBasket,
      items: [
        {
          title: "entry-sales",
          url: "/sales/entry",
        },
        {
          title: "transaction-sales",
          url: "/sales/transactions",
        },
      ],
    },
    {
      title: "alerts",
      url: "/alert",
      icon: AlertCircleIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const corpName = process.env.NEXT_PUBLIC_CORP_NAME || "Point of Sale";

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <GalleryVerticalEnd className="!size-5" />
                <span className="text-base font-semibold">{corpName}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
