"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <Flex
      minH="100vh" // 화면 전체 높이
      justify="center" // 수평 중앙
      align="center" // 수직 중앙
      bg="white" // 필요시 배경
    >
      <Card.Root
        boxAlign={"center"}
        display="flex"
        justifyContent="center"
        minH="50vh"
        maxW="lg"
        mx="auto"
        bg="transparent"
        borderRadius="lg"
        boxShadow="lg"
        borderWidth="1px"
        borderColor="white"
      >
        <Flex
          justify="center"
          align="center"
          // 전체 화면 높이
          bg="whiteAlpha.1"
          borderRadius="lg"
          boxShadow="2xl"
          width="100%"
          height="100%"
          padding={8}
          borderColor="white"
          backdropFilter="blur(10px)"
        >
          <Box
            width={{ base: "100%", md: "400px" }}
            bg="transparent"
            p={8}
            borderRadius="md"
          >
            <Heading as="h2" size="lg" color="black" textAlign="center" mb={8}>
              Sign in
            </Heading>
            <Stack gap={6}>
              <Box>
                <Text color="black" mb={1} fontWeight="medium">
                  ID
                </Text>
                <Input
                  variant="flushed"
                  placeholder=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  color="black"
                  _placeholder={{ color: "gray.300" }}
                  borderColor="black"
                />
              </Box>

              <Box>
                <Text color="black" mb={1} fontWeight="medium">
                  Password
                </Text>
                <Input
                  variant="flushed"
                  placeholder=""
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  color="black"
                  _placeholder={{ color: "gray.300" }}
                  borderColor="black"
                />
              </Box>

              {error && (
                <Text color="red.400" fontSize="sm">
                  {error}
                </Text>
              )}

              <Button
                bg="black"
                color="white"
                _hover={{ bg: "gray.500" }}
                size="lg"
                fontWeight="bold"
              >
                LOGIN
              </Button>
              <Flex justify="center">
                <Link
                  href="/signup"
                  color="black"
                  fontSize="sm"
                  textAlign="center"
                  _hover={{ textDecoration: "underline" }}
                >
                  Sign Up
                </Link>
              </Flex>
            </Stack>
          </Box>
        </Flex>
      </Card.Root>
    </Flex>
  );
};

export default LoginPage;
