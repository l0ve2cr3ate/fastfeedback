import {
  Avatar,
  Heading,
  Box,
  Button,
  Flex,
  Text,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";

const FeedbackUsage = () => (
  <StatGroup>
    <Stat>
      <StatLabel color="gray.700">Feedback</StatLabel>
      <StatNumber fontWeight="medium">∞</StatNumber>
      <StatHelpText>10,000 limit</StatHelpText>
    </Stat>

    <Stat ml={8}>
      <StatLabel color="gray.700">Sites</StatLabel>
      <StatNumber fontWeight="medium">1/∞</StatNumber>
      <StatHelpText whiteSpace="nowrap">Unlimited Sites</StatHelpText>
    </Stat>
  </StatGroup>
);

const SettingsTable = ({ children }) => (
  <Box
    backgroundColor="white"
    mt={8}
    borderRadius={[0, 8, 8]}
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
  >
    <Flex
      backgroundColor="gray.50"
      borderTopLeftRadius={[0, 8, 8]}
      borderTopRightRadius={[0, 8, 8]}
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      px={6}
      py={4}
    >
      <Text
        textTransform="uppercase"
        fontSize="xs"
        color="gray.500"
        fontWeight="medium"
        mt={1}
      >
        Account Details
      </Text>
    </Flex>
    <Flex direction="column" p={6}>
      {children}
    </Flex>
  </Box>
);

const Account = () => {
  const { user, signout } = useAuth();

  return (
    <DashboardShell>
      <Flex
        direction="column"
        maxW="600px"
        align={["left", "center"]}
        margin="0 auto"
      >
        <Flex direction="column" align={["left", "center"]} ml={4}>
          <Avatar
            w={["3rem", "6rem"]}
            h={["3rem", "6rem"]}
            mb={4}
            src={user?.photoUrl}
          />
          <Heading letterSpacing="-1px">{user?.name}</Heading>
          <Text>{user?.email}</Text>
        </Flex>
        <SettingsTable>
          <FeedbackUsage />

          <Flex justify="flex-end">
            <Button variant="ghost" ml={4} onClick={() => signout()}>
              Log Out
            </Button>
          </Flex>
        </SettingsTable>
      </Flex>
    </DashboardShell>
  );
};

export default Account;
