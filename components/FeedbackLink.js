import { Flex, Link } from "@chakra-ui/react";

export default function FeedbackLink({ siteId }) {
  const linkColor = {
    light: "gray.900",
    dark: "gray.100",
  };

  return (
    <Flex
      align={["flex-start", "center"]}
      justifyContent="space-between"
      mb={8}
      width="full"
      mt={1}
      direction={["column", "row"]}
    >
      <Link
        color={linkColor.light}
        fontWeight="bold"
        fontSize="sm"
        href={`/site/${siteId}`}
        target="_blank"
      >
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="gray.500" href="/" target="_blank">
        Powered by Fast Feedback (Alpha)
      </Link>
    </Flex>
  );
}
