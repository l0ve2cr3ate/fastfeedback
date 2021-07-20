import React from "react";
import { Box, Heading, Text, Divider, Flex, Code } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import GoogleIcon from "@/icons/google";
import GithubIcon from "@/icons/github";
import { useTheme } from "@/utils/useTheme";
import ReactMarkdown from "react-markdown";
import MDXComponents from "./MDXComponents";

const Feedback = ({ author, text, createdAt, provider, isLast, settings }) => {
  const colorMode = useTheme();
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
        <Heading
          color={authorColor[colorMode]}
          size="sm"
          as="h3"
          mb={0}
          fontWeight="medium"
        >
          {author}
        </Heading>

        {settings?.icons && provider.includes("google") ? (
          <GoogleIcon ml={3} />
        ) : settings?.icons && provider.includes("github") ? (
          <GithubIcon ml={3} />
        ) : null}
      </Flex>
      {settings?.timestamp && (
        <Text color="gray.500" mb={4} fontSize="xs">
          {format(parseISO(createdAt), "ppPP")}
        </Text>
      )}

      <Box color={textColor[colorMode]}>
        <ReactMarkdown
          children={text}
          components={{
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
        />
      </Box>
      {!isLast && (
        <Divider
          borderColor={dividerColor[colorMode]}
          backgroundColor={dividerColor[colorMode]}
          my={6}
        />
      )}
    </Box>
  );
};

export default Feedback;
