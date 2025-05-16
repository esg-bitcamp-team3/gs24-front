import SidBar from '@/components/sideBar'
import {Flex, Box} from '@chakra-ui/react'

export default function Dashboard({children}: {children: React.ReactNode}) {
  return (
    <>
      <SidBar /> {/* fixed로 화면 왼쪽에 고정됨 */}
      <Box ml="250px" p={4}>
        {children}
      </Box>
    </>
  )
}
