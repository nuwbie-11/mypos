import PageContainer from "@/components/page-container";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
