"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { toaster } from "@/components/ui/toaster";
import { ApiError } from "next/dist/server/api-utils";
import {
  Box,
  Button,
  Flex,
  FieldLabel,
  Fieldset,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  Field,
  Link,
  Card,
  Heading,
} from "@chakra-ui/react";

const SignUpPage = () => {
  const [username, setUsername] = useState("");

  const [id, setId] = useState("");
  const [email, setEmail] = useState(""); // 이메일 추가
  const [Phonenumber, setPhonenumber] = useState(""); // 이메일 추가
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState(""); // 아이디 중복 오류 메시지
  const [emailError, setEmailError] = useState(""); // 이메일 중복 오류 메시지
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
              Sign Up
            </Heading>
            <Stack gap={6}>
              <Box>
                <Text color="black" mb={1} fontWeight="medium">
                  Username
                </Text>

                <Input
                  variant="flushed"
                  placeholder=""
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  color="black"
                  _placeholder={{ color: "gray.300" }}
                  borderColor="black"
                />
              </Box>
              <Box>
                <Text color="black" mb={1} fontWeight="medium">
                  ID
                </Text>
                <Input
                  variant="flushed"
                  placeholder=""
                  value={id}
                  onChange={(e) => setId(e.target.value)}
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
              <Box>
                <Text color="black" mb={1} fontWeight="medium">
                  Confirm-Password
                </Text>

                <Input
                  variant="flushed"
                  placeholder=""
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  color="black"
                  _placeholder={{ color: "gray.300" }}
                  borderColor="black"
                />
              </Box>
              <Box>
                <Text color="black" mb={1} fontWeight="medium">
                  Email
                </Text>
                <Input
                  variant="flushed"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  color="black"
                  _placeholder={{ color: "gray.300" }}
                  borderColor="black"
                />
              </Box>
              <Box>
                <Text color="black" mb={1} fontWeight="medium">
                  Phone number
                </Text>

                <Input
                  variant="flushed"
                  placeholder=""
                  type="text"
                  value={Phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
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
                Create Account
              </Button>
              <Flex justify="center"></Flex>
            </Stack>
          </Box>
        </Flex>
      </Card.Root>
    </Flex>
  );
};

export default SignUpPage;
