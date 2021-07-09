import { Button, Text, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useAuth } from "@/lib/auth";
import Logo from "@/icons/logo";

export default function Home() {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <Logo color="black" boxSize="64px" />

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
  );
}
