import { Button, Text, Flex, Link, Box } from "@chakra-ui/react";
import Head from "next/head";
import { useAuth } from "@/lib/auth";
import Logo from "@/icons/logo";

export default function Home() {
  const auth = useAuth();

  return (
    <Box height="100vh" bg="gray.100" py={16} px={4}>
      <Flex as="main" direction="column" maxW="700px" margin="0 auto">
        <Head>
          <title>Fast Feedback</title>
        </Head>

        <Logo color="black" boxSize="64px" />

        <Text mb={4} fontSize="lg" py={4}>
          <Text as="span" fontWeight="bold" display="inline">
            Fast Feedback
          </Text>
          {" was built as part of "}
          <Link
            href="https://react2025.com"
            isExternal
            textDecoration="underline"
          >
            React 2025
          </Link>
          {`. It's the easiest way to add comments or reviews to your static site. Try it out by leaving a comment below. After the comment is approved, it will display below.`}
        </Text>

        {auth?.user ? (
          <Button onClick={() => auth.signout()}>Sign Out</Button>
        ) : (
          <Button
            mt={4}
            variant="link"
            size="sm"
            onClick={() => auth.signinWithGithub()}
          >
            Sign In
          </Button>
        )}
      </Flex>
    </Box>
  );
}
