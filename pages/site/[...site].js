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
import LoginButtons from "@/components/LoginButtons";

const SiteFeedback = () => {
  const { user, loading } = useAuth();

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

  const LoginOrLeaveFeedback = () =>
    user ? (
      <Button
        type="submit"
        isDisabled={!siteData || !feedbackData}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        mt={4}
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        Leave Feedback
      </Button>
    ) : (
      <LoginButtons />
    );

  return (
    <DashboardShell>
      <SiteHeader
        isSiteOwner={site?.authorId === user?.uid}
        site={site}
        siteId={siteId}
        route={route}
      />
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

            {!loading && <LoginOrLeaveFeedback />}
          </FormControl>
        </Box>
        {allFeedback?.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            settings={site?.settings}
            isLast={index === allFeedback.length - 1}
            {...feedback}
          />
        ))}
      </Box>
    </DashboardShell>
  );
};

export default SiteFeedback;
