'use client'

import {
  Box,
  DataList,
  Flex,
  HStack,
  Input,
  Separator,
  Text,
  VStack
} from '@chakra-ui/react'
import {MdCalendarMonth} from 'react-icons/md'
import React, {useState} from 'react'
import {Button} from '@chakra-ui/react'
// 오늘 날짜 (YYYY-MM-DD 형식)
const today = new Date().toISOString().split('T')[0]

const CompanyInfoCard = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const today = new Date().toISOString().split('T')[0]
  return (
    <Flex flexDirection="column" gap={5}>
      <Box p={3} borderRadius="lg" boxShadow="lg" w="4xl" backgroundColor="white">
        <HStack gap={5}>
          <Flex w="full" alignItems="center" gap={2}>
            <MdCalendarMonth />
            <Text minW="60px">시작일</Text>
            <Input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              max={endDate}
              variant="flushed"
              borderColor="gray.300"
              _placeholder={{color: 'gray.500'}}
              _focus={{borderColor: 'blue.500'}}
              _hover={{borderColor: 'blue.300'}}
              _disabled={{opacity: 0.5, cursor: 'not-allowed'}}
              _invalid={{borderColor: 'red.500'}}
              _readOnly={{backgroundColor: 'gray.100'}}
            />
          </Flex>
          <Flex w="full" alignItems="center" gap={2}>
            <MdCalendarMonth />
            <Text minW="60px">종료일</Text>
            <Input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              min={startDate}
              variant="flushed"
              borderColor="gray.300"
              _placeholder={{color: 'gray.500'}}
              _focus={{borderColor: 'blue.500'}}
              _hover={{borderColor: 'blue.300'}}
              _disabled={{opacity: 0.5, cursor: 'not-allowed'}}
              _invalid={{borderColor: 'red.500'}}
              _readOnly={{backgroundColor: 'gray.100'}}
            />
          </Flex>
          <Button borderRadius="xl">1개월</Button>
          <Button borderRadius="xl">3개월</Button>
          <Button borderRadius="xl">6개월</Button>
          <Button borderRadius="xl">12개월</Button>
        </HStack>
      </Box>

      <Flex justify="column" gap={4} width="full">
        <Box p={3} borderRadius="lg" boxShadow="lg" w="md" backgroundColor="white">
          <VStack align="center" px="6" width="full" height="full">
            <Flex w="full">
              <Text fontSize="lg" fontWeight="bold" textAlign="start">
                삼성전자
              </Text>
            </Flex>
            <Separator
              variant="solid"
              size="lg"
              padding={1}
              w="full"
              colorPalette="green"
            />
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

        <Flex flexDirection="column" gap={4} width="full">
          <Box
            p={3}
            borderRadius="lg"
            boxShadow="lg"
            width="full"
            backgroundColor="white">
            <HStack gap={5}>ESG RATING</HStack>
          </Box>
          <Flex flexDirection="row" gap={4} h={'full'} width="full">
            <Box p={3} borderRadius="lg" boxShadow="lg" backgroundColor="white">
              <VStack align="center" px="50px" width="100%" height="full">
                <Flex w="full">
                  <Text fontSize="lg" fontWeight="bold" textAlign="start">
                    등급
                  </Text>
                </Flex>
                <Separator
                  variant="solid"
                  size="lg"
                  padding={1}
                  w="full"
                  colorPalette="green"
                />
              </VStack>
            </Box>
            <Box p={3} borderRadius="lg" boxShadow="lg" backgroundColor="white">
              <VStack align="center" width="100%" height="full">
                <Flex w="full">
                  <Text fontSize="lg" px="300px" fontWeight="bold" textAlign="start">
                    ESG 등급 변화 추이
                  </Text>
                </Flex>
              </VStack>
            </Box>
            <Box p={3} borderRadius="lg" boxShadow="lg" backgroundColor="white">
              <VStack align="center" px="300px" width="100%" height="full">
                <Flex w="full">
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    textAlign="start"
                    backgroundColor="white">
                    AI 뉴스 요약
                  </Text>
                </Flex>
              </VStack>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex flexDirection="column" gap={4} width="full" height={'full'}></Flex>
    </Flex>
  )
}

export default CompanyInfoCard
