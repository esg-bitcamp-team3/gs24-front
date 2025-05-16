'use client'

import {
  Box,
  chakra,
  DataList,
  Flex,
  HStack,
  Input,
  Separator,
  Spinner,
  Text,
  VStack
} from '@chakra-ui/react'
import {BiCaretUp} from 'react-icons/bi'

import axios from 'axios'
import {Table} from '@chakra-ui/react'
import React, {useState, useEffect, use} from 'react'
import {GoPlus} from 'react-icons/go'
import {Button} from '@chakra-ui/react'
import Link from 'next/link'
import {getInterestCompanyInfo, getOrganizationRank} from '@/lib/api/get'
import {
  OrganizationInfo,
  OrganizationRank
} from '@/lib/api/interfaces/interestOrganization'
import {useRouter} from 'next/navigation'
import {checkLogin} from '@/lib/api/auth'
import SearchOrg from '@/components/navbar/SearchOrg'
import {CompanyInfo, InterestCompanyInfo} from '@/lib/api/interfaces/companyinfo'

const items = [
  {id: 1, name: '제조업', category: '삼성전자', category1: 'SK하이닉스'},
  {id: 2, name: '은행', category: 'NH 농협은행', category1: 'KB국민은행'},
  {id: 3, name: '소비재', category: 'LG 생활건강', category1: 'CJ제일제당'},
  {id: 4, name: 'IT서비스', category: '삼성SDS', category1: '네이버'},
  {id: 5, name: '유통물류', category: '신세계', category1: '이마트'}
]

// 탄소 배출권 데이터 상태 추가

const terms = [
  {
    term: '가명정보',
    english:
      '가명정보란 개인정보의 일부를 삭제·대체하는 등 개인을 알아볼 수 없도록 처리한 정보이다. 예를 들어 이름 홍길동을 이름 홍○○로 바꾼 것인데, 이는 개인 비식별 조치가 된 익명 개인정보와 식별 가능한 개인정보 사이의 중간 단계로 이해할 수 있다.',
    tags: []
  }
]
interface ExchangeRateItem {
  date: string
  rate: number
}

export const useExchangeRateHistory = () => {
  const [data, setData] = useState<ExchangeRateItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/market-price/exchange-rate`
        )
        const rawData = res.data

        const parsed = rawData
          .map((entry: any) => {
            const usd = entry.data.find((d: any) => d.cur_unit === 'USD')
            if (!usd || !usd.deal_bas_r) return null

            return {
              date: entry.date,
              rate: parseFloat(usd.deal_bas_r.replace(',', ''))
            }
          })
          .filter(Boolean) // null 제거

        setData(parsed.reverse()) // 최신 → 오래된 순서로 정렬
      } catch (err: any) {
        console.error('환율 불러오기 실패:', err)
        setError('환율 데이터를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  return {data, loading, error}
}

// ==============================
// 환율 박스 컴포넌트
// ==============================
const ExchangeRateChart = () => {
  const {data, loading, error} = useExchangeRateHistory()

  return (
    <Box p={4} bg="white" borderRadius="lg" shadow="md" w="full" h="300px">
      <Text fontSize="lg" fontWeight="bold" mb={3}>
        최근 5일 USD → KRW 환율
      </Text>

      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="rate" stroke="#3182ce" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  )
}

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const check = async () => {
      const data = await checkLogin()
      if (!data) {
        router.push('/login')
      }
    }
    check()
  }, [])

  // const [organizationList, setOrganizationList] = useState<OrganizationInfo[]>([])
  const [organizationRank, setOrganizationRank] = useState<OrganizationRank[]>([])
  const [companyinfo, setCompanyInfo] = useState<InterestCompanyInfo[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const ioData = await getInterestOrganization()
        const orData = await getOrganizationRank()
        const companyInfoData = await getInterestCompanyInfo()

        setCompanyInfo(companyInfoData || [])

        // if (ioData) setOrganizationList(ioData?.organizationList || [])
        // else return null

        if (orData) setOrganizationRank(orData || [])
        else return null
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  interface CarbonItem {
    id: number
    date: string
    item_name: string
    price: string
    compare: string
    percent: string
    volume: string
    total_value: string
  }

  const [carbonitems, setCarbonItems] = useState<CarbonItem[]>([])

  const [carbonitems1, setCarbonItems1] = useState<CarbonItem[]>([])
  const today = 20250508
  const yesterday = 20250507
  // const formatDate = (date: Date): string => {
  //   const year = date.getFullYear()
  //   const month = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 +1
  //   const day = String(date.getDate()).padStart(2, '0')

  //   return `${year}${month}${day}`
  // }

  // const today = new Date()
  // const formatted = formatDate(today)
  // const yesterdayDate = new Date(today)
  // yesterdayDate.setDate(today.getDate() - 1)
  // const yesterday = formatDate(yesterdayDate)

  useEffect(() => {
    const fetchCarbonData = async () => {
      try {
        const res2 = await axios.get(
          `http://localhost:8000/api/market-price/carbon-price?basDt=${today}&itmsNm=KAU24`
        )
        const res1 = await axios.get(
          `http://localhost:8000/api/market-price/carbon-price?basDt=${yesterday}&itmsNm=KAU24`
        )

        const transformData = (
          data: {
            basDt: string | any[]
            itmsNm: any
            clpr: any
            vs: any
            fltRt: any
            trqu: any
            trPrc: any
          }[]
        ) =>
          data.map(
            (
              item: {
                basDt: string | any[]
                itmsNm: any
                clpr: any
                vs: any
                fltRt: any
                trqu: any
                trPrc: any
              },
              index: number
            ) => ({
              id: index + 1,
              date: `${item.basDt.slice(0, 4)}/${item.basDt.slice(
                4,
                6
              )}/${item.basDt.slice(6, 8)}`,
              item_name: item.itmsNm,
              price: item.clpr,
              compare: item.vs,
              percent: item.fltRt,
              volume: item.trqu,
              total_value: item.trPrc
            })
          )

        const mergedData = [...transformData(res2.data), ...transformData(res1.data)]
        setCarbonItems(mergedData)
      } catch (err) {
        console.error('탄소 데이터 요청 오류:', err)
      }
    }

    fetchCarbonData()
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
          w="5xl"
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
            w="5xl"
            h="300px"
            backgroundColor="white">
            <Flex justifyContent="space-between">
              <Text fontSize="lg" fontWeight="bold">
                관심 기업 리스트
              </Text>

              <Box>
                <SearchOrg
                  label={
                    <>
                      <GoPlus />
                      기업추가
                    </>
                  }
                />
              </Box>
            </Flex>
            <Separator variant="solid" size="lg" padding={1} w="full" />
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader p={2} fontWeight="bold" textAlign="center">
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
                {companyinfo &&
                  companyinfo.map((likeitems, index) => (
                    <Table.Row key={index}>
                      <Table.Cell p={2} textAlign="center">
                        <Link
                          href={`/dashboard/companyInfo/${likeitems.interestOrganization.organizationId}`}>
                          {likeitems.companyInfo.companyName}
                        </Link>
                      </Table.Cell>

                      <Table.Cell p={2} textAlign="center">
                        {likeitems.companyInfo.industry}
                      </Table.Cell>
                      <Table.Cell p={2} textAlign="center">
                        {likeitems.companyInfo.capital}
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table.Root>
          </Box>

          {/* ESG 섹션 */}
        </Flex>
        <ExchangeRateChart />
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
            overflowY="auto"
            p={5}
            borderRadius="lg"
            boxShadow="lg"
            width="full"
            maxHeight="170px"
            backgroundColor="white">
            <Box position="sticky" top={0} zIndex={1} backgroundColor="white" p={5}>
              <Text fontSize="lg" fontWeight="bold" mb={3}>
                탄소 배출권 시세
              </Text>
              <Separator size="lg" padding={1} w="full" />
            </Box>

            <Separator size="lg" padding={1} w="full" />
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader textAlign="center">날짜</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">종목명</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">종가</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">대비</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">등락율(%)</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">거래량</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">거래대금</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {carbonitems1.map((item, i) => (
                  <Table.Row key={i}>
                    <Table.Cell textAlign="center">{item.date}</Table.Cell>

                    <Table.Cell textAlign="center">{item.item_name}</Table.Cell>
                    <Table.Cell textAlign="center">{item.price}</Table.Cell>
                    <Table.Cell textAlign="center">{item.compare}</Table.Cell>
                    <Table.Cell textAlign="center">{item.percent}</Table.Cell>
                    <Table.Cell textAlign="center">{item.volume}</Table.Cell>
                    <Table.Cell textAlign="center">{item.total_value}</Table.Cell>
                  </Table.Row>
                ))}
                {carbonitems.map((item, i) => (
                  <Table.Row key={i}>
                    <Table.Cell textAlign="center">{item.date}</Table.Cell>
                    <Table.Cell textAlign="center">{item.item_name}</Table.Cell>
                    <Table.Cell textAlign="center">{item.price}</Table.Cell>
                    <Table.Cell textAlign="center">{item.compare}</Table.Cell>
                    <Table.Cell textAlign="center">{item.percent}</Table.Cell>
                    <Table.Cell textAlign="center">{item.volume}</Table.Cell>
                    <Table.Cell textAlign="center">{item.total_value}</Table.Cell>
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
                  {item.term && <Text>{item.term}</Text>}
                  <Text>{item.english}</Text>
                </div>
              ))}
            </div>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
