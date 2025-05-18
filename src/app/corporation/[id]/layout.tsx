import {Box} from '@chakra-ui/react'

export default function Dashboard({children}: {children: React.ReactNode}) {
  return (
    <>
      <Box ml={'250px'} overflow={'auto'} maxW={'full'} maxH="full" bg={'#f7f7f7'}>
        {children}
      </Box>
    </>
  )
}
