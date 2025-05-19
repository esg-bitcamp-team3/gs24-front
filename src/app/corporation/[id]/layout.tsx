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
  // const companyinfo = await getCompanyInfo(params.id)

  // if (!companyinfo) {
  //   notFound()
  // }
  return (
    <>
      <SideBar />
      <Box ml={'250px'} overflow={'auto'} maxW={'full'} maxH="full" bg={'#f7f7f7'}>
        {/* <Flex align="center" ml={4} gap={2}>
          <Separator orientation="vertical" height="1.75em" borderWidth="2px" />
          <Text fontSize="3xl" fontWeight="bold">
            {companyinfo?.companyName}
          </Text>
          <InterestButton orgId={params.id} />
        </Flex> */}
        {children}
      </Box>
    </>
  )
}
