import { Button, Text, Flex, Link, Box } from "@chakra-ui/react";
import Head from "next/head";
import { useAuth } from "@/lib/auth";
import Logo from "@/icons/logo";
import GoogleIcon from "@/icons/google";
import GithubIcon from "@/icons/github";
import { getAllFeedback } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";
import FeedbackLink from "@/components/FeedbackLink";

const SITE_ID = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;

export const getStaticProps = async (context) => {
  const { feedback } = await getAllFeedback(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
    },
    revalidate: 1,
  };
};

export default function Home({ allFeedback }) {
  const auth = useAuth();

  return (
    <>
      <Box bg="gray.100" py={16} px={4}>
        <Flex
          as="main"
          direction="column"
          alignItems="center"
          justifyContent="center"
          maxW="700px"
          margin="0 auto"
          height="100%"
        >
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/dashboard"
              }
            `,
              }}
            />
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
            <Button
              as="a"
              href="/dashboard"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={4}
              maxW="200px"
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <>
              <Button
                leftIcon={<GithubIcon />}
                onClick={() => auth.signinWithGithub()}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                mt={4}
                _hover={{ bg: "gray.700" }}
                _active={{
                  bg: "gray.800",
                  transform: "scale(0.95)",
                }}
              >
                Continue with GitHub
              </Button>
              <Button
                leftIcon={<GoogleIcon />}
                onClick={() => auth.signinWithGoogle()}
                backgroundColor="white"
                color="gray.900"
                variant="outline"
                fontWeight="medium"
                mt={4}
                _hover={{ bg: "gray.100" }}
                _active={{
                  bg: "gray.100",
                  transform: "scale(0.95)",
                }}
              >
                Continue with Google
              </Button>
            </>
          )}
        </Flex>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
        px={4}
      >
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback?.map((feedback, index) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </>
  );
}
