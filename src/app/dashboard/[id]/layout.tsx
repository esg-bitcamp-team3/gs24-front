import InterestButton from '@/components/etcs/InterestButton'
import SideBar from '@/components/sideBar'
import {getCompanyInfo} from '@/lib/api/get'
import {Box, Flex, Separator, Text} from '@chakra-ui/react'
import {notFound} from 'next/navigation'

export default async function CorpId({
  children,
  params
}: {
  children: React.ReactNode
  params: {id: string}
}) {
  // try {
  //   const companyinfo = await getCompanyInfo(params.id)
  //   if (!companyinfo) {
  //     notFound()
  //   }
  // } catch (error) {
  //   console.error('Error fetching company info:', error)
  //   notFound()
  // }

  // if (!companyinfo) {
  //   notFound()
  // }
  return (
    <>
      <SideBar />
      <Box ml={'250px'} overflow={'auto'} maxW={'full'} maxH="full" bg={'#f7f7f7'}>
        <Flex align="center" ml={4} gap={2} mb={4}>
          <Separator orientation="vertical" height="1.75em" borderWidth="2px" />
          <Text fontSize="3xl" fontWeight="bold">
            {/* {companyinfo?.companyName} */}
            기업정보
          </Text>
          <Box ml={4}>
            <InterestButton orgId={params.id} />
          </Box>
        </Flex>
        {children}
      </Box>
    </>
  )
}
