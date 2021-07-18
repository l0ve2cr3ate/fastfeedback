import React from "react";
import { Box, Heading, Text, Divider, Flex } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import GoogleIcon from "@/icons/google";
import GithubIcon from "@/icons/github";

const Feedback = ({ author, text, createdAt, provider, isLast }) => {
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
        {provider.includes("google") ? (
          <GoogleIcon ml={3} />
        ) : (
          <GithubIcon ml={3} />
        )}
      </Flex>
      <Text color="gray.500" mb={4} fontSize="xs">
        {format(parseISO(createdAt), "ppPP")}
      </Text>
      <Text color={textColor.light}>{text}</Text>
      {!isLast && (
        <Divider
          borderColor={dividerColor.light}
          backgroundColor={dividerColor.light}
          my={6}
        />
      )}
    </Box>
  );
};

export default Feedback;
