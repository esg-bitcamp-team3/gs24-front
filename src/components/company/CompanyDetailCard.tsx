'use client'

import {
  Box,
  DataList,
  Flex,
  HStack,
  Input,
  Separator,
  Text,
  VStack,
  Button,
  Badge
} from '@chakra-ui/react'

import React, {useState} from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

import ESGWordCloud from '@/components/company/ESGWordCloud'
import {Company} from '@/lib/api/interfaces/organizations'
import {EsgRatingResponse} from '@/lib/api/interfaces/esgRating'
import {EsgLineData} from '@/components/chartDataImport'

// 가짜 데이터
const mockSummary = [
  '삼성전자는 ESG 측면에서 지속 가능한 경영활동을 강화하고 있으며...',
  '최근 반도체 산업 위기 속에서도 친환경 정책을 유지하고 있습니다.',
  '노사관계와 관련한 이슈가 있었으나 빠르게 개선된 것으로 보입니다.'
]

const keywordNews = [
  '삼성전자, 2분기 실적 발표 앞두고 투자자 기대감 커져',
  '친환경 반도체 공정 도입으로 ESG 평가 상승',
  '국내외 ESG 펀드 삼성전자 비중 확대'
]

// ESG 차트 데이터
// const esgLineData = {
//   labels: ['2021', '2022', '2023', '2024', '2025'],
//   datasets: [
//     {
//       label: 'E (환경)',
//       data: [60, 65, 70, 68, 74],
//       borderColor: 'rgba(72, 187, 120, 1)',
//       backgroundColor: 'rgba(72, 187, 120, 0.2)',
//       fill: true,
//       tension: 0.4
//     },
//     {
//       label: 'S (사회)',
//       data: [55, 60, 62, 65, 67],
//       borderColor: 'rgba(66, 153, 225, 1)',
//       backgroundColor: 'rgba(66, 153, 225, 0.2)',
//       fill: true,
//       tension: 0.4
//     },
//     {
//       label: 'G (지배구조)',
//       data: [70, 72, 74, 76, 79],
//       borderColor: 'rgba(245, 101, 101, 1)',
//       backgroundColor: 'rgba(245, 101, 101, 0.2)',
//       fill: true,
//       tension: 0.4
//     }
//   ]
// }

const CompanyInfoCard = ({orgId}: {orgId: string}) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const esgGrade = 'A'
  const companyQuery = 'NAVER'
  const [company, setCompany] = useState<Company | null>(null)
  const [esgRatings, setEsgRatings] = useState<EsgRatingResponse | null>(null)

  const handleDateRangeClick = (months: number) => {
    const now = new Date()
    const start = new Date()
    start.setMonth(start.getMonth() - months)
    const formatDate = (date: Date) => date.toISOString().split('T')[0]
    setStartDate(formatDate(start))
    setEndDate(formatDate(now))
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'green'
    if (grade.startsWith('B')) return 'yellow'
    return 'red'
  }

  return (
    <Flex flexDirection="column" gap={5}>
      {/* 기업 정보 및 ESG 등급 */}
      <Flex direction={{base: 'column', lg: 'row'}} gap={4} width="full">
        <Box
          p={3}
          borderRadius="lg"
          boxShadow="lg"
          w={{base: '100%', lg: '30%'}}
          backgroundColor="white">
          <VStack align="start" px="6" gap={4}>
            <Text fontSize="lg" fontWeight="bold">
              {companyQuery}
            </Text>
            <Separator variant="solid" size="lg" w="full" />
            <DataList.Root orientation="vertical">
              <DataList.Item>
                <DataList.ItemLabel fontSize="sm">업종</DataList.ItemLabel>
                <DataList.ItemValue fontSize="sm">전자/반도체</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel fontSize="sm">자본금</DataList.ItemLabel>
                <DataList.ItemValue fontSize="sm">8,975억원</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel fontSize="sm">대표자</DataList.ItemLabel>
                <DataList.ItemValue fontSize="sm">
                  김기남, 한종희, 경계현
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel fontSize="sm">주소</DataList.ItemLabel>
                <DataList.ItemValue fontSize="sm">
                  경기도 수원시 영통구 삼성로 129
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel fontSize="sm">임직원수</DataList.ItemLabel>
                <DataList.ItemValue fontSize="sm">117,904명</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel fontSize="sm">전화번호</DataList.ItemLabel>
                <DataList.ItemValue fontSize="sm">02-2255-0114</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </VStack>
        </Box>

        <Flex direction="column" gap={4} w={{base: '100%', lg: '70%'}}>
          <Box p={3} borderRadius="lg" boxShadow="lg" backgroundColor="white">
            <Text fontSize="lg" fontWeight="bold">
              ESG별 점수
            </Text>
            <Separator variant="solid" size="lg" w="full" />
          </Box>

          <Flex direction={{base: 'column', md: 'row'}} gap={4}>
            <Box p={3} borderRadius="lg" boxShadow="lg" flex="1" backgroundColor="white">
              <VStack align="start">
                <Text fontSize="lg" fontWeight="bold">
                  ESG 예상 등급
                </Text>
                <Separator size="lg" w="full" />
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={5}
                  ml={8}
                  h={280}>
                  <Box
                    borderRadius="full"
                    borderColor="blue.400"
                    borderWidth="4px"
                    width="150px"
                    height="150px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Box
                      borderRadius="full"
                      borderColor="blue.300"
                      borderWidth="4px"
                      width="100px"
                      height="100px"
                      display="flex"
                      justifyContent="center"
                      alignItems="center">
                      <Text fontSize="3xl" fontWeight="bold" color="green.700">
                        {esgGrade}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </VStack>
            </Box>
            {/* 등급 변화 추이 그래프================================================================== */}

            <Box p={3} borderRadius="lg" boxShadow="lg" flex="2" backgroundColor="white">
              <Text fontSize="lg" fontWeight="bold">
                ESG 등급 변화추이
              </Text>
              <Box mt={4} width={'full'}>
                {orgId && <EsgLineData organizationId={orgId} />}{' '}
              </Box>
            </Box>

            <Box p={3} borderRadius="lg" boxShadow="lg" flex="2" backgroundColor="white">
              <Text fontSize="lg" fontWeight="bold">
                AI 뉴스 요약
              </Text>
              <Separator size="lg" w="full" />
              <VStack align="start" mt={2}>
                {mockSummary.map((line, idx) => (
                  <Text key={idx} fontSize="sm" color="gray.700">
                    • {line}
                  </Text>
                ))}
              </VStack>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      {/* 키워드 및 뉴스 영역 */}
      <Flex direction={{base: 'column', xl: 'row'}} gap={4} width="full">
        <Box
          p={3}
          borderRadius="lg"
          boxShadow="lg"
          w={{base: '100%', xl: '50%'}}
          backgroundColor="white"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center">
          <Text fontSize="lg" fontWeight="bold">
            기업 관련 키워드
          </Text>
          <Box w="100%" maxW="600px" h="300px" overflow="hidden">
            <ESGWordCloud query={companyQuery} />
          </Box>
        </Box>

        <Box
          p={3}
          borderRadius="lg"
          boxShadow="lg"
          w={{base: '100%', xl: '50%'}}
          backgroundColor="white"
          h="auto">
          <Text fontSize="lg" fontWeight="bold">
            키워드 관련 뉴스
          </Text>
          <Separator size="lg" w="full" />
          <VStack align="start" mt={2}>
            {keywordNews.map((news, idx) => (
              <Text key={idx} fontSize="sm" color="gray.700">
                • {news}
              </Text>
            ))}
          </VStack>
        </Box>
      </Flex>
    </Flex>
  )
}

export default CompanyInfoCard
