import useSWR from "swr";
import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import SiteTable from "@/components/SiteTable";
import SiteTableHeader from "@/components/SiteTableHeader";
import Page from "@/components/Page";

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ["/api/sites", user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  if (data.sites?.length) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTable sites={data.sites} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader />
      <EmptyState />
    </DashboardShell>
  );
};

const DashboardPage = () => (
  <Page name="Dashboard" path="/sites">
    <Dashboard />
  </Page>
);

export default DashboardPage;
