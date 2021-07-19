import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import Feedback from "@/components/Feedback";
import { useAuth } from "@/lib/auth";
import { getAllFeedback, getAllSites, getSite } from "@/lib/db-admin";
import { createFeedback } from "@/lib/db";

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
    <Box display="flex" flexDirection="column" width="full">
      <Box as="form" onSubmit={onSubmit}>
        <FormControl id="comment-control" my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input ref={inputEl} type="text" id="comment" />
          <Button mt={2} fontWeight="medium" type="submit">
            Add comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback?.map((feedback, index) => (
        <Feedback
          key={feedback.id}
          isLast={index === initialFeedback.length - 1}
          {...feedback}
        />
      ))}
    </Box>
  );
};

export default SiteFeedback;