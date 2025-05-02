import NavBar from '@/components/navbar'
import {Box, Flex} from '@chakra-ui/react'

export default function Dashboard({children}: {children: React.ReactNode}) {
  return (
    <>
      <Box w="100%" height="65px">
        <NavBar />
      </Box>
      <Box overflow={'auto'} w="100%" p={4} height="full" bg={'#f7f7f7'}>
        {children}
      </Box>
    </>
  )
}
