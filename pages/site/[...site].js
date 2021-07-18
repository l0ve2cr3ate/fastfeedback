import { useRouter } from "next/router";
import { useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";

import Feedback from "@/components/Feedback";
import { useAuth } from "@/lib/auth";
import { createFeedback } from "@/lib/db";
import DashboardShell from "@/components/DashboardShell";
import SiteHeader from "@/components/SiteHeader";
import fetcher from "@/utils/fetcher";

const SiteFeedback = () => {
  const { user } = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);

  const siteAndRoute = router.query?.site;
  const siteId = siteAndRoute ? siteAndRoute[0] : null;
  const route = siteAndRoute ? siteAndRoute[1] : null;
  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;

  const { data: siteData } = useSWR(`/api/site/${siteId}`, fetcher);
  const { data: feedbackData } = useSWR(feedbackApi, fetcher);

  const site = siteData?.site;
  const allFeedback = feedbackData?.feedback;

  const onSubmit = (event) => {
    event.preventDefault();

    const newFeedback = {
      siteId,
      siteAuthorId: site.authorId,
      route: route || "/",
      author: user.name,
      authorId: user.uid,
      text: inputEl.current.value.replace("\n", "\n\n"),
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: "pending",
    };

    inputEl.current.value = "";
    createFeedback(newFeedback);
    mutate(
      feedbackApi,
      async (data) => ({
        feedback: [newFeedback, ...data.feedback],
      }),
      false
    );
  };
  return (
    <DashboardShell>
      <SiteHeader isSiteOwner={true} siteName={site?.name} siteId={siteId} />
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
