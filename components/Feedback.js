import React from "react";
import {
  Box,
  Heading,
  Text,
  Divider,
  Icon,
  Flex,
  Code,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import ReactMarkdown from "react-markdown";

import MDXComponents from "./MDXComponents";

const Feedback = ({ author, text, createdAt, provider }) => {
  const authorColor = {
    light: "gray.900",
    dark: "gray.200",
  };
  const textColor = {
    light: "gray.800",
    dark: "gray.300",
  };
  const dividerColor = {
    light: "gray.200",
    dark: "gray.700",
  };

  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Flex align="center">
        <Heading size="sm" as="h3" mb={0} fontWeight="medium">
          {author}
        </Heading>
        <Text>{text}</Text>
        <Text>{format(parseISO(createdAt), "ppPP")}</Text>
      </Flex>

      <Box>
        {/* <ReactMarkdown
          source={text}
          renderers={{
            paragraph: MDXComponents.p,
            blockquote: MDXComponents.blockquote,
            link: MDXComponents.a,
            list: MDXComponents.ul,
            listItem: MDXComponents.li,
            table: MDXComponents.table,
            tableHead: MDXComponents.th,
            tableCell: MDXComponents.td,
            code: ({ value }) => (
              <pre>
                <Code borderRadius={8} p={4} my={4}>
                  {value}
                </Code>
              </pre>
            ),
            inlineCode: MDXComponents.inlineCode,
          }}
        /> */}
      </Box>
    </Box>
  );
};

export default Feedback;
