import {Box, DataList, Flex, Separator, Text, VStack} from '@chakra-ui/react'

const CompanyInfoCard = () => {
  return (
    <Box p={3} borderRadius="lg" boxShadow="lg" w="md">
      <VStack align="center" px="6" width="full" height="full">
        <Flex w="full">
          <Text fontSize="lg" fontWeight="bold" textAlign="start">
            삼성전자
          </Text>
        </Flex>
        <Separator variant="solid" size="lg" padding={1} w="full" colorPalette="green" />
        <DataList.Root orientation="horizontal">
          <DataList.Item>
            <DataList.ItemLabel fontSize="small" fontWeight="bold">
              업종
            </DataList.ItemLabel>
            <DataList.ItemValue fontSize="small">전자/반도체</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel fontSize="small" fontWeight="bold">
              자본금
            </DataList.ItemLabel>
            <DataList.ItemValue fontSize="small">8,975억원</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel fontSize="small" fontWeight="bold">
              대표자
            </DataList.ItemLabel>
            <DataList.ItemValue fontSize="small">
              김기남, 한종희, 경계현
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel fontSize="small" fontWeight="bold">
              주소
            </DataList.ItemLabel>
            <DataList.ItemValue fontSize="small">
              경기도 수원시 영통구 삼성로 129
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel fontSize="small" fontWeight="bold">
              임직원수
            </DataList.ItemLabel>
            <DataList.ItemValue fontSize="small">117,904명</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel fontSize="small" fontWeight="bold">
              전화번호
            </DataList.ItemLabel>
            <DataList.ItemValue fontSize="small">02-2255-0114</DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>
      </VStack>
    </Box>
  )
}

export default CompanyInfoCard
