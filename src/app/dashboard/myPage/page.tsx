// src/pages/user-info.tsx
'use client'

import {getUserInfo, updateUserInfo} from '@/lib/api/auth'
import {User} from '@/lib/api/interfaces/auth'
import {Box, Avatar, Input, VStack, Button, Text, Flex, Field, Center, Image} from '@chakra-ui/react'
import {useEffect, useRef, useState} from 'react'

export default function userInfoPage({id}: {id: string}) {
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserInfo()
        setUser(res ?? null)
        setName(res?.name ?? '')
        setPhone(res?.phone ?? '')
      } catch (error) {
        console.error('Failed to fetch user info:', error)
      }
    }
    fetchUser()
  }, [])

  const handleSave = async () => {
    try {
      await updateUserInfo({ name, phone, password })
      const updateUser = await getUserInfo()
      setUser(updateUser ?? null)
      setName(updateUser?.name ?? '')
      setPhone(updateUser?.phone ?? '')
      alert('정보가 저장되었습니다.')
    } catch (err) {
      console.error('업데이트 실패:', err)
      alert('저장에 실패했습니다.')
    }
  }

  return (
    <Box p={10} maxW="800px" mx="auto" bg={'white'} >
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        사용자 정보
      </Text>
      <Box borderBottom="1px solid #aaa" mb={6} />

      <Flex align="flex-start" gap={6}>
        <Image
          src="/user.png"
          height={'65px'}
          // onClick={() => router.push('/dashboard')}
          // cursor="pointer"
        />
        
        {/* <Avatar.Root shape="full" size="2xl" top={5}>
          <Avatar.Fallback name="" />
          <Avatar.Image
            src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd"
            alt="User Avatar"
          />
        </Avatar.Root> */}

        {/* 정보 입력 폼 ================================================================== */}
        <VStack padding={5} flex={1} align="stretch">
          <Field.Root>
            <Field.Label>사용자명</Field.Label>
            <Input paddingLeft={2} css={{"--focus-color":"colors.blackAlpha.300"}} value={name} onChange={e => setName(e.target.value)}/>
          </Field.Root>

          <Field.Root>
            <Field.Label>아이디</Field.Label>
            <Input disabled paddingLeft={2} value={user?.username ?? 'id'} />
          </Field.Root>

          <Field.Root>
            <Field.Label>이메일</Field.Label>
            <Input disabled paddingLeft={2} value={user?.email ?? 'email'} />
          </Field.Root>

          <Field.Root>
            <Field.Label>휴대전화</Field.Label>
            <Input value={phone} onChange={e => setPhone(e.target.value)} />
          </Field.Root>

          <Field.Root>
            <Field.Label>비밀번호 변경</Field.Label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Field.Root>

          <Button
            mt={4}
            colorScheme="gray"
            width="100px"
            alignSelf="flex-start"
            onClick={handleSave}>
            저장
          </Button>
        </VStack>
      </Flex>
    </Box>
  )
}

