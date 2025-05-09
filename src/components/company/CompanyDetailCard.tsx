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

import React, {useState, useEffect} from 'react'
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

// 차트 등록
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


const CompanyInfoCard = ({orgId}: {orgId:string}) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [fontSizes, setFontSizes] = useState<number[]>([])
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
  const ESGGradeBadge = ({grade}: {grade: string}) => {
    return (
      <Badge
        colorScheme={getGradeColor(grade)}
        fontSize="lg"
        px={4}
        py={1}
        borderRadius="md">
        {grade}
      </Badge>
    )
  }
  const esgGrade = 'A'
  const companyQuery = 'NAVER'

  return (
    <Flex flexDirection="column" gap={5}>

      {/* 기업 정보 및 차트 */}
      <Flex flexDirection="row" gap={4} width="full">
        <Box p={3} borderRadius="lg" boxShadow="lg" w="md" backgroundColor="white">
          <VStack align="center" px="6" width="full" height="full">
            <Flex w="full" flexDirection="row" justify="space-between">
              <Text fontSize="lg" fontWeight="bold">
                {companyQuery}
              </Text>
            </Flex>

            <Separator variant="solid" size="lg" padding={1} w="full" />
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
          <Box p={3} borderRadius="lg" boxShadow="lg" w="10xl" backgroundColor="white">
            <Text fontSize="lg" fontWeight="bold">
              ESG별 점수
            </Text>
            <Separator variant="solid" size="lg" padding={1} w="full" />
          </Box>
          {/* ESG 섹션 */}
          <Flex flexDirection="row" gap={4} width="full">
            <Box
              p={3}
              borderRadius="lg"
              boxShadow="lg"
              width="600px"
              backgroundColor="white">
              <VStack align="start" mt={2}>
                <Text fontSize="lg" fontWeight="bold">
                  ESG 예상 등급
                </Text>
              </VStack>

              <Separator size="lg" padding={1} w="full" />

              {/* ✅ 여기: 박스를 감싸는 부모를 flex + center로 */}
              <Box
                mt={13}
                ml={10}
                display="flex"
                borderRadius="full"
                borderColor="blue.400"
                borderWidth="4px"
                width="130px"
                height="130px">
                <Box
                  mt={0}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%">
                  <Box
                    borderRadius="full"
                    borderColor="blue.300"
                    borderWidth="4px"
                    backgroundColor="white"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100px"
                    height="100px">
                    <Text fontSize="3xl" fontWeight="bold" color="green.700">
                      {esgGrade}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* 등급 변화 추이 그래프================================================================== */}
            <Box
              p={3}
              borderRadius="lg"
              boxShadow="lg"
              width="full"
              backgroundColor="white">
              <Text fontSize="lg" fontWeight="bold">
                ESG 등급 변화추이
              </Text>
              <Box mt={4} width={'full'}>
                {orgId && <EsgLineData organizationId={orgId} />}{' '}
              </Box>
            </Box>

            <Box
              p={3}
              borderRadius="lg"
              boxShadow="lg"
              width="full"
              backgroundColor="white">
              <Text fontSize="lg" fontWeight="bold">
                AI 뉴스 요약
              </Text>
              <Separator size="lg" padding={1} w="full" />
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
      <Flex flexDirection="row" gap={4} width="full">
        {/* 키워드 영역 */}
        <Box
          p={3}
          borderRadius="lg"
          boxShadow="lg"
          w="1107px"
          h="300px"
          backgroundColor="white"
          display="flex"
          justifyContent="center"
          alignItems="center">
          <VStack align="center" px="1" width="1340px" height="full">
            <Text fontSize="lg" fontWeight="bold">
              기업 관련 키워드
            </Text>
            <Box w="600px" h="300px" overflow="hidden">
              <ESGWordCloud query={companyQuery} />
            </Box>
          </VStack>
        </Box>

        <Box
          p={3}
          borderRadius="lg"
          boxShadow="lg"
          width="full"
          height="300px"
          backgroundColor="white">
          <Text fontSize="lg" fontWeight="bold">
            키워드 관련 뉴스
          </Text>
          <Separator size="lg" padding={1} w="full" />
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
