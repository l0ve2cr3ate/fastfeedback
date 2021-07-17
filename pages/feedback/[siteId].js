import useSWR from "swr";
import { useRouter } from "next/router";

import DashboardShell from "@/components/DashboardShell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import FeedbackTable from "@/components/FeedbackTable";
import SiteFeedbackTableHeader from "@/components/SiteFeedbackTableHeader";
import FeedbackEmptyState from "@/components/FeedbackEmptyState";

const FeedbackPage = () => {
  const { user } = useAuth();
  const { query } = useRouter();
  const { data } = useSWR(
    user ? [`/api/feedback/${query.siteId}`, user.token] : null,
    fetcher
  );

  if (!data) {
    return (
      <DashboardShell>
        <SiteFeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteFeedbackTableHeader siteName={data?.site?.name} />
      {data?.feedback?.length ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
};

export default FeedbackPage;
