import React from "react";
import { Box, Code, Switch } from "@chakra-ui/react";

import { Table, Tr, Th, Td } from "./Table";
import RemoveButton from "./RemoveButton";
// import FeedbackRow from "./FeedbackRow";

const FeedbackTable = (props) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th minW="150px">Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th width="50px">{""}</Th>
          </Tr>
        </thead>
        <tbody>
          {props.feedback.map((feedback) => (
            <Box as="tr" key={feedback.id}>
              <Td>{feedback.name}</Td>
              <Td>{feedback.text}</Td>
              <Td>
                <Code>/</Code>
              </Td>
              <Td>
                <Switch
                  colorScheme="green"
                  defaultChecked={feedback.status === "active"}
                />
              </Td>
              <Td>
                <RemoveButton feedbackId={feedback.id} />
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;
