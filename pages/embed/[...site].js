import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

import Feedback from "@/components/Feedback";
import { getAllFeedback, getAllSites, getSite } from "@/lib/db-admin";
import { useTheme } from "@/utils/useTheme";
import FeedbackLink from "@/components/FeedbackLink";

export const getStaticProps = async (context) => {
  const [siteId, route] = context.params.site;
  const { feedback } = await getAllFeedback(siteId, route);
  const { site } = await getSite(siteId);

  return {
    props: {
      initialFeedback: feedback,
      site,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const { sites } = await getAllSites();

  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()],
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

const SiteFeedback = ({ initialFeedback, site }) => {
  const router = useRouter();
  const colorMode = useTheme();
  const textColor = {
    light: "gray.900",
    dark: "gray.200",
  };

  return (
    <Box display="flex" flexDirection="column" width="full">
      <FeedbackLink paths={router?.query?.site || []} />
      {initialFeedback?.length ? (
        initialFeedback.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            settings={site?.settings}
            isLast={index === initialFeedback.length - 1}
            {...feedback}
          />
        ))
      ) : (
        <Text color={textColor[colorMode]}>
          There are no comments for this site.
        </Text>
      )}
    </Box>
  );
};

export default SiteFeedback;
