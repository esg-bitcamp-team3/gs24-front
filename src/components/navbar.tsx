// src/components/Navbar.tsx
'use client'

import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Text,
  Image,
  Dialog,
  Portal,
  CloseButton
} from '@chakra-ui/react'
import {useRouter} from 'next/navigation'
import React from 'react'
import {LuLogOut, LuSearch} from 'react-icons/lu'

const Navbar: React.FC = () => {
  const router = useRouter()
  const ref = React.useRef<HTMLInputElement>(null)

  const handleClick = () => {
    router.push('/dashboard/myPage')
  }
  return (
    <Flex
      direction="row"
      align="center"
      py="2"
      justify="space-between"
      backgroundColor="white"
      boxShadow="sm"
      shadowColor={'blackAlpha.200'}
      width="100%"
      position="fixed" // 💡 화면 상단에 고정
      top="0" // 💡 위에서 0 위치
      zIndex="1000" // 💡 다른 요소보다 위에 출력
      height="65px" // 💡 높이도 명시적으로 주면 안정감 있어
    >
      <Box display="flex" paddingX="4" alignItems="center" width="10%">
        {/* <Text fontWeight="bold" textStyle={'3xl'} color={'black'}>
          GS24
        </Text> */}
        <Image
          src="/logo.png"
          onClick={() => router.push('/dashboard')}
          cursor="pointer"
        />
      </Box>

      <Box display="flex" alignItems="center" gap="4">
        {/* 비교하기 버튼================================================================== */}
        <Button
          paddingLeft={3}
          paddingRight={3}
          variant="outline"
          color="black"
          aria-label="compare"
          onClick={() => router.push('/dashboard/companyCompare')}>
          비교하기
        </Button>
        {/* 검색하기 버튼================================================================== */}
        <Dialog.Root scrollBehavior={'inside'} placement="center">
          <Dialog.Trigger asChild>
            <Button variant="outline" size="sm" padding={3}>
              <LuSearch />
              Search
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content padding={4}>
                <Dialog.Header>
                  <Input paddingLeft={3} placeholder="search" />
                </Dialog.Header>
                <Dialog.Body pt="4">
                  <Box>
                    <Button
                      paddingLeft={3}
                      variant="ghost"
                      color="black"
                      justifyContent="flex-start"
                      onClick={() => router.push('/dashboard/companyCompare')}
                      w={'100%'}>
                      비교하기
                    </Button>
                  </Box>
                </Dialog.Body>
                <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                <Button variant="outline">Close</Button>
              </Dialog.ActionTrigger>
                </Dialog.Footer>
                <Dialog.CloseTrigger top="0" insetEnd="-12" asChild>
                  <CloseButton bg="bg" size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>

        {/* <InputGroup flex="1" startElement={<LuSearch 
          style={{
            position: 'relative',  
            left: '10px',            
            fontSize: '1rem',     
            color: 'gray.500',}} />}>
          <Input placeholder="Search..." />
        </InputGroup>       */}
        {/* 사용자 아이콘================================================================== */}
        <div onClick={handleClick} style={{cursor: 'pointer'}}>
          <Avatar.Root shape="full" size="lg">
            <Avatar.Fallback name="Segun Adebayo" />
            <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd" />
          </Avatar.Root>
        </div>
        {/* 로그아웃 버튼================================================================== */}
        <IconButton
          variant="ghost"
          color="black"
          aria-label="Logout"
          onClick={() => router.push('/home')}>
          <LuLogOut />
        </IconButton>
      </Box>
    </Flex>
  )
}

export default Navbar
