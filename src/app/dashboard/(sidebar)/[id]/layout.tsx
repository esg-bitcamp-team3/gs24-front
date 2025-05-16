import Navbar from '@/components/navbar'
import SidBar from '@/components/sideBar'
import {Box} from '@chakra-ui/react'

export default function Dashboard({children}: {children: React.ReactNode}) {
  return (
    <>
      <SidBar /> {/* fixed로 화면 왼쪽에 고정됨 */}
      
      <Box
        ml={'250px'}
        overflow={'auto'}
        maxW={'full'}
        maxH="full"
        bg={'#f7f7f7'}>
        {children}
      </Box>
    </>
  )
}
