import { Button, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <main>
        <Heading>Fast Feedback</Heading>

        <Text>Current user: {auth?.user ? auth?.user?.email : "None"}</Text>
        {auth?.user ? (
          <Button onClick={() => auth.signout()}>Sign Out</Button>
        ) : (
          <Button onClick={() => auth.signinWithGithub()}>Sign In</Button>
        )}
      </main>
    </div>
  );
}
