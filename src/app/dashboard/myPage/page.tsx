// src/pages/user-info.tsx
'use client'

import {
  checkingPassword,
  getUserInfo,
  updatePassword,
  updateUserInfo
} from '@/lib/api/auth'
import {User} from '@/lib/api/interfaces/auth'
import {
  Box,
  Avatar,
  Input,
  VStack,
  Button,
  Text,
  Flex,
  Field,
  Center,
  Image,
  Separator
} from '@chakra-ui/react'
import {useEffect, useRef, useState} from 'react'

export default function userInfoPage({id}: {id: string}) {
  // 상태 정의(useState), 사용자 전체 정보는 user에 저장
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('') // 비밀번호 인증 상태 관리
  const [currentPassword, setCurrentPassword] = useState('')
  const [check, setCheck] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  // 사용자 정보 가져오기 (useEffect), 받은 정보를 상태로 저장
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserInfo() // getUserInfo() -> 서버 API 호출 함수 (GET /user/mypage)
        setUser(res ?? null)
        setName(res?.name ?? '')
        setPhone(res?.phone ?? '')
      } catch (error) {
        console.error('Failed to fetch user info:', error)
      }
    }
    fetchUser()
  }, [])

  const handleCheck = async () => {
    try {
      const tf = await checkingPassword({password: currentPassword})
      setCheck(Boolean(tf))
    } catch (error) {
      console.error('비밀번호 동일하지 않음', error)
    }
  }
  // 저장 버튼 클릭 핸들러
  const handleSave = async () => {
    try {
      await updateUserInfo({name, phone}) // 이름, 전화번호 업데이트

      alert('정보가 저장되었습니다.')
    } catch (err) {
      console.error('업데이트 실패:', err)
      console.error('에러 상세:', err)
      alert('저장에 실패했습니다.')
    }
  }

  const passwordSave = async () => {
    try {
      if (password !== confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.')
      } else {
        try {
          await updatePassword(password)
          alert('비밀번호 변경 완료')
        } catch (err) {
          alert('비밀번호 변경 실패')
          console.error(err)
        }
      }
    } catch (err) {
      alert('비밀번호 저장 실패')
    }
  }

  return (
    <Box p={10} maxW="800px" mx="auto" bg={'white'} rounded={20}>
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
            <Input
              paddingLeft={2}
              css={{'--focus-color': 'colors.blackAlpha.300'}}
              value={name}
              onChange={e => setName(e.target.value)}
            />
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

          <Button
            mt={2}
            colorScheme="gray"
            width="100px"
            alignSelf="flex-start"
            onClick={handleSave}>
            저장
          </Button>

          <Separator variant="solid" size="md" padding={1} w="full" mt={2}/>
          <Field.Root>
            <Field.Label>기존 비밀번호</Field.Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
            <Button mt={2}
                colorScheme="gray"
                width="100px"
                alignSelf="flex-start" onClick={handleCheck}>비밀번호 확인</Button>
          </Field.Root>
          {check && (
            <>
              <Field.Root>
                <Field.Label>비밀번호 변경</Field.Label>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>비밀번호 변경 확인</Field.Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </Field.Root>
              <Button
                mt={2}
                colorScheme="gray"
                width="100px"
                alignSelf="flex-start"
                onClick={passwordSave}>
                저장
              </Button>
            </>
          )}
        </VStack>
      </Flex>
    </Box>
  )
}
