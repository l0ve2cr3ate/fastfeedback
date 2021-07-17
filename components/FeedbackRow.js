import React from "react";
import { Box, Code, Switch } from "@chakra-ui/react";
import { mutate } from "swr";

import { Td } from "./Table";
import RemoveButton from "./RemoveButton";
import { updateFeedback } from "@/lib/db";
import { useAuth } from "@/lib/auth";

const FeedbackRow = ({ id, author, text, route, status }) => {
  const auth = useAuth();
  const isChecked = status === "active";

  const toggleFeedback = async () => {
    await updateFeedback(id, { status: isChecked ? "pending" : "active" });
    mutate(["/api/feedback", auth.user.token]);
  };

  return (
    <Box as="tr">
      <Td>{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || "/"}</Code>
      </Td>
      <Td>
        <Switch
          onChange={toggleFeedback}
          colorScheme="green"
          isChecked={isChecked}
        />
      </Td>
      <Td>
        <RemoveButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
