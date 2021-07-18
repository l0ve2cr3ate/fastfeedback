import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

import Feedback from "@/components/Feedback";
import { useAuth } from "@/lib/auth";
import { getAllFeedback, getAllSites, getSite } from "@/lib/db-admin";
import { createFeedback } from "@/lib/db";
import DashboardShell from "@/components/DashboardShell";
import SiteHeader from "@/components/SiteHeader";

export const getStaticProps = async (context) => {
  const [siteId] = context.params.site;
  const { feedback } = await getAllFeedback(siteId);
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

const SiteFeedback = ({ initialFeedback }) => {
  const { user } = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const [siteId, route] = router.query.site;

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  const onSubmit = (event) => {
    event.preventDefault();

    const newFeedback = {
      author: user.name,
      route: route || "/",
      authorId: user.uid,
      siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: "pending",
    };

    inputEl.current.value = "";
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };
  return (
    <DashboardShell>
      <SiteHeader isSiteOwner={true} siteName={"test"} siteId={siteId} />
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="760px"
        margin="0 auto"
      >
        <Box as="form" onSubmit={onSubmit}>
          <FormControl id="comment-control" my={8}>
            <FormLabel mb={8} htmlFor="comment">
              Comment
            </FormLabel>
            <Textarea
              ref={inputEl}
              id="comment"
              placeholder="Leave a comment"
              isDisabled={!user}
              h="100px"
              backgroundColor="white"
            />

            <Button mt={2} fontWeight="medium" type="submit">
              Add comment
            </Button>
          </FormControl>
        </Box>
        {allFeedback?.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            isLast={index === allFeedback.length - 1}
            {...feedback}
          />
        ))}
      </Box>
    </DashboardShell>
  );
};

export default SiteFeedback;
