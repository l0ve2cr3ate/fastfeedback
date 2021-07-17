import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import Feedback from "@/components/Feedback";
import { useAuth } from "@/lib/auth";
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import { createFeedback } from "@/lib/db";
import DashboardShell from "@/components/DashboardShell";

export const getStaticProps = async (context) => {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

const SiteFeedback = ({ initialFeedback }) => {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (event) => {
    event.preventDefault();

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: "pending",
    };

    inputEl.current.value = "";
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };
  return (
    <DashboardShell>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="760px"
        margin="0 auto"
      >
        <Box as="form" onSubmit={onSubmit}>
          <FormControl id="comment-control" my={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input
              ref={inputEl}
              placeholder="Add your feedback..."
              type="text"
              id="comment"
              background="white"
            />
            <Button mt={2} fontWeight="medium" type="submit">
              Add comment
            </Button>
          </FormControl>
        </Box>
        {allFeedback?.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </DashboardShell>
  );
};

export default SiteFeedback;
