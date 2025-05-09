'use client'

import {
  Box,
  chakra,
  DataList,
  Flex,
  HStack,
  Input,
  Separator,
  Text,
  VStack
} from '@chakra-ui/react'
import {Table} from '@chakra-ui/react'
import React, {useState, useEffect, use} from 'react'
import {GoPlus} from 'react-icons/go'
import {Button} from '@chakra-ui/react'
import Link from 'next/link'
import {get} from 'http'
import {getInterestOrganization, getOrganizationRank} from '@/lib/api/get'
import {
  OrganizationInfo,
  OrganizationInfoResponse,
  OrganizationRank
} from '@/lib/api/interfaces/interestOrganization'

const items = [
  {id: 1, name: '제조업', category: '삼성전자', category1: 'SK하이닉스'},
  {id: 2, name: '은행', category: 'NH 농협은행', category1: 'KB국민은행'},
  {id: 3, name: '소비재', category: 'LG 생활건강', category1: 'CJ제일제당'},
  {id: 4, name: 'IT서비스', category: '삼성SDS', category1: '네이버'},
  {id: 5, name: '유통물류', category: '신세계', category1: '이마트'}
]
const likeitems = [
  {id: 1, name: 'SK하이닉스', category: '제조업', sales1: '150,000,000'},
  {id: 2, name: 'KB국민은행', category: 'NH 은행', sales1: '123,185,123'},
  {id: 3, name: 'CJ제일제당', category: '소비재', sales1: '123,123,123'},
  {id: 4, name: '네이버', category: 'IT서비스', sales1: '159,159,159'},
  {id: 5, name: '이마트', category: '유통물류', sales1: ',154,189,333'}
]
const rankitems = [
  {id: 1, name: '1', category: 'SK하이닉스', rank1: 'A+', score1: '85'},
  {id: 2, name: '2', category: 'KB국민은행', rank1: 'A', score1: '85'},
  {id: 3, name: '3', category: 'CJ제일제당', rank1: 'A', score1: '85'},
  {id: 4, name: '4', category: '네이버', rank1: 'B+', score1: '85'},
  {id: 5, name: '5', category: '이마트', rank1: 'B+', score1: '85'}
]
const carbonitems = [
  {
    id: 1,
    date: '2025/05/08',
    price: '8,800',
    compare: '800',
    percent: '10%',
    volume: '25,180'
  },
  {
    id: 2,
    date: '2025/05/07',
    price: '8,000',
    compare: '800',
    percent: '10%',
    volume: '32,180'
  }
]
const terms = [
  {
    term: '가명정보',
    description:
      '가명정보란 개인정보의 일부를 삭제·대체하는 등 개인을 알아볼 수 없도록 처리한 정보이다. 예를 들어 이름 홍길동을 이름 홍○○로 바꾼 것인데, 이는 개인 비식별 조치가 된 익명 개인정보와 식별 가능한 개인정보 사이의 중간 단계로 이해할 수 있다.'
  },
  {
    term: '가상발전소',
    subtitle: 'VPP, Virtual Power Plant',
    description:
      '가상발전소는 소규모 신재생에너지 발전과 에너지저장장치 등 분산형 에너지 자원(DER, Distributed Energy Resources)을 클라우드 기반으로 통합하여 하나의 발전소처럼 관리하는 시스템이다. 가상발전소는 분산 에너지를 수집·분석하여 전력 수급의 변수를 예측할 수 있어 에너지를 효율적으로 공급할 수 있다는 장점이 있다.'
  }
]
export default function Dashboard() {
  const [organizationList, setOrganizationList] = useState<OrganizationInfo[]>([])
  const [organizationRank, setOrganizationRank] = useState<OrganizationRank[]>([])

  useEffect(() => {
    const interestOrganization = async () => {
      try {
        const data = await getInterestOrganization()

        if (data) {
          setOrganizationList(data?.organizationList || [])
        } else {
          return null
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    interestOrganization()

    const organizationRank = async () => {
      try {
        const data = await getOrganizationRank()
        if (data) {
          setOrganizationRank(data || [])
        } else {
          return null
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    organizationRank()
  }, [])

  return (
    <Flex
      flexDirection={{base: 'column', xl: 'row'}}
      gap={4}
      width="full"
      flexWrap="wrap">
      {/* 날짜 선택 */}

      {/* 기업 정보 및 차트 */}
      <Flex flexDirection="row" gap={4} width="full">
        <Box
          p={5}
          borderRadius="lg"
          boxShadow="lg"
          w="md"
          h="300px"
          backgroundColor="white">
          <Text fontSize="lg" fontWeight="bold" alignSelf="flex-start" mb={3}>
            업종별 등급 랭킹
          </Text>
          <Separator variant="solid" size="lg" padding={1} w="full" />
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader p={2} fontWeight="bold" textAlign="center">
                  업종
                </Table.ColumnHeader>
                <Table.ColumnHeader p={2} fontWeight="bold" textAlign="center">
                  1위
                </Table.ColumnHeader>
                <Table.ColumnHeader p={2} fontWeight="bold" textAlign="center">
                  2위
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.map(item => (
                <Table.Row key={item.id}>
                  <Table.Cell p={2} textAlign="center">
                    {item.name}
                  </Table.Cell>
                  <Table.Cell p={2} textAlign="center">
                    {item.category}
                  </Table.Cell>
                  <Table.Cell p={2} textAlign="center">
                    {item.category1}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <Flex flexDirection="column" gap={4} width="full">
          <Box
            p={5}
            borderRadius="lg"
            boxShadow="lg"
            w="10xl"
            h="300px"
            backgroundColor="white">
            <Flex justifyContent="space-between">
              <Text fontSize="lg" fontWeight="bold">
                관심 기업 리스트
              </Text>

              <Button variant="ghost">
                {' '}
                <GoPlus />
                기업추가
              </Button>
            </Flex>
            <Separator variant="solid" size="lg" padding={1} w="full" />
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader p={2} fontWeight="bold" textAlign="center">
                    {' '}
                    기업명
                  </Table.ColumnHeader>
                  <Table.ColumnHeader p={2} fontWeight="bold" textAlign="center">
                    업종
                  </Table.ColumnHeader>
                  <Table.ColumnHeader p={2} fontWeight="bold" textAlign="center">
                    매출(만원)
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {organizationList &&
                  organizationList.map(likeitems => (
                    <Table.Row key={likeitems.organization.id}>
                      <Table.Cell p={2} textAlign="center">
                        {likeitems.organization.companyName}
                      </Table.Cell>
                      <Table.Cell p={2} textAlign="center">
                        {/* {likeitems.organization.industry} */}
                        {0}
                      </Table.Cell>
                      <Table.Cell p={2} textAlign="center">
                        {/* {likeitems.organization.capital} */}
                        {0}
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table.Root>
          </Box>
          {/* ESG 섹션 */}
          <Flex flexDirection="row" gap={4} width="full"></Flex>
        </Flex>
      </Flex>

      {/* 키워드 및 뉴스 영역 */}
      <Flex flexDirection="row" gap={4} width="full">
        {/* 키워드 영역 */}
        <Box
          p={5}
          borderRadius="lg"
          boxShadow="lg"
          width="full"
          height="450px"
          backgroundColor="white">
          <Text fontSize="lg" fontWeight="bold" mb={3}>
            올해등급별 기업랭킹
          </Text>
          <Separator size="lg" padding={1} w="full" />
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader p={2} fontWeight="bold" textAlign="center">
                  {' '}
                  순위
                </Table.ColumnHeader>
                <Table.ColumnHeader p={2} fontWeight="bold" textAlign="center">
                  기업명
                </Table.ColumnHeader>
                <Table.ColumnHeader p={2} fontWeight="bold" textAlign="center">
                  등급
                </Table.ColumnHeader>
                <Table.ColumnHeader p={2} fontWeight="bold" textAlign="center">
                  점수
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {organizationRank &&
                organizationRank.map((rankitems, index) => (
                  <Table.Row key={index}>
                    <Table.Cell p={2} textAlign="center">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell p={2} textAlign="center">
                      {rankitems.organizationName}
                    </Table.Cell>
                    <Table.Cell p={2} textAlign="center">
                      {rankitems.esgGrade}
                    </Table.Cell>
                    <Table.Cell p={2} textAlign="center">
                      {rankitems.esgScore}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <Flex flexDirection="column" gap={4} width="full">
          <Box
            overflow={'hidden'}
            p={5}
            borderRadius="lg"
            boxShadow="lg"
            width="full"
            height="170px"
            backgroundColor="white">
            <Text fontSize="lg" fontWeight="bold" mb={3}>
              탄소 배출권 시세
            </Text>
            <Separator size="lg" padding={1} w="full" />
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader fontWeight="bold" textAlign="center">
                    {' '}
                    날짜
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold" textAlign="center">
                    종가
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold" textAlign="center">
                    대비
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold" textAlign="center">
                    등락율(%)
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold" textAlign="center">
                    거래량
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {carbonitems.map(carbonitems => (
                  <Table.Row key={carbonitems.id}>
                    <Table.Cell p={2} textAlign="center">
                      {carbonitems.date}
                    </Table.Cell>
                    <Table.Cell p={2} textAlign="center">
                      {carbonitems.price}
                    </Table.Cell>
                    <Table.Cell p={2} textAlign="center">
                      {carbonitems.compare}
                    </Table.Cell>
                    <Table.Cell p={2} textAlign="center">
                      {carbonitems.percent}
                    </Table.Cell>
                    <Table.Cell p={2} textAlign="center">
                      {carbonitems.volume}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
          <Box
            p={3}
            borderRadius="lg"
            boxShadow="lg"
            width="full"
            height="260px"
            backgroundColor="white">
            <Flex justifyContent="space-between">
              <Text fontSize="lg" fontWeight="bold">
                ESG 용어사전
              </Text>
              <Link href="/dashboard/vocabulary">
                <Button variant="ghost">자세히 보기</Button>
              </Link>
            </Flex>
            <Separator size="lg" padding={1} w="full" />
            <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
              {terms.map((item, i) => (
                <div key={i}>
                  <Text fontWeight="bold">{item.term}</Text>
                  {item.subtitle && <Text>{item.subtitle}</Text>}
                  <Text>{item.description}</Text>
                </div>
              ))}
            </div>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
