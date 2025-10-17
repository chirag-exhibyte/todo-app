import { Alert, Box, Button, Text, VStack } from "@chakra-ui/react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Box
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
    >
      <Alert.Root
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        maxW="xl"
        py={6}
        px={8}
        borderRadius="lg"
      >
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title> Something went wrong!</Alert.Title>

          <Alert.Content maxWidth="md">
            <VStack spacing={4}>
              <Text>
                {error.message ||
                  "An unexpected error occurred. Please try again later."}
              </Text>
              <Button
                colorScheme="red"
                onClick={resetErrorBoundary}
                size="md"
                mt={4}
              >
                Try again
              </Button>
            </VStack>
          </Alert.Content>
        </Alert.Content>
      </Alert.Root>
    </Box>
  );
};

export default ErrorFallback;
