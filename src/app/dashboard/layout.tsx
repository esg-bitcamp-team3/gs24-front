'use client'
import NavBar from '@/components/navbar'
import {Box, Flex} from '@chakra-ui/react'

export default function Dashboard({children}: {children: React.ReactNode}) {
  return (
    <>
      <NavBar />
            <Box mt={'65px'} p={8} overflow="auto" height="calc(100vh - 65px)" bg="#f7f7f7">
        {children}
      </Box>
    </>
  )
}
