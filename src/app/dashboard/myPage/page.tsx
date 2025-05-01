// src/pages/user-info.tsx
'use client'

import {
  Box,
  Avatar,
  Input,
  VStack,
  Button,
  Text,
  Flex,
  Field
} from '@chakra-ui/react'

export default function UserInfo() {
  return (
    <Box p={10} maxW="800px" mx="auto">
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        사용자 정보
      </Text>
      <Box borderBottom="1px solid #aaa" mb={6} />

      <Flex align="flex-start" gap={6}>
        {/* 사용자 아바타 */}
        <Avatar.Root shape="full" size="2xl" top={5}>
            <Avatar.Fallback name='User Avatar'/>
          <Avatar.Image
            src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd"
            alt="User Avatar"
          />
        </Avatar.Root>

        {/* 정보 입력 폼 */}
        <VStack padding={4} flex={1} align="stretch">
          <Field.Root>
            <Field.Label>사용자명</Field.Label>
            <Input disabled paddingLeft={2} placeholder='name'/>
          </Field.Root>

            <Field.Root>
                <Field.Label>아이디</Field.Label>
                <Input disabled paddingLeft={2} placeholder='id'/>
            </Field.Root>

            <Field.Root>
                <Field.Label>이메일</Field.Label>
                <Input disabled paddingLeft={2} placeholder='email'/>
            </Field.Root>

            <Field.Root invalid>
                <Field.Label>휴대전화</Field.Label>
                <Input placeholder="email" readOnly/>
            </Field.Root>

            <Field.Root invalid>
                <Field.Label>비밀번호 변경</Field.Label>
                <Input placeholder="비밀번호 변경시 입력" readOnly/>
            </Field.Root>
          

          <Button mt={4} colorScheme="gray" width="100px" alignSelf="flex-start">
            저장
          </Button>
        </VStack>
      </Flex>
    </Box>
  )
}
