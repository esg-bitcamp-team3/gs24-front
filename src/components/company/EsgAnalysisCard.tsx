'use client'

import {Box, DataList, Flex, Separator, Text, VStack, Button} from '@chakra-ui/react'

import React, {useEffect, useState} from 'react'

import ESGWordCloud from '@/components/company/ESGWordCloud'
import {EsgLineData} from '@/components/chartDataImport'
import {EsgBarData} from '../barChart'
import {CompanyInfo} from '@/lib/api/interfaces/companyinfo'
import {getCompanyInfo, getInterestOrganization} from '@/lib/api/get'
import {postInteresrtOrganization} from '@/lib/api/post'
import {deleteInterestOrganization} from '@/lib/api/delete'
import {OrganizationInfo} from '@/lib/api/interfaces/interestOrganization'
import {FcLikePlaceholder} from 'react-icons/fc'
import {FcLike} from 'react-icons/fc'
import {InfoIcon} from '@chakra-ui/icons'
import {InfoItem} from '../InfoItem'

const EsgAnalysisCard = ({orgId}: {orgId: string}) => {
  const [companyinfo, setCompanyInfo] = useState<CompanyInfo | null>(null)
  const [showMore, setShowMore] = useState(false)
  const [ioCheck, setIoCheck] = useState<Boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ciData = await getCompanyInfo(orgId)
        if (ciData) setCompanyInfo(ciData || null)
        else return null

        const checkId = await getInterestOrganization()

        if (
          checkId?.organizationList.find((org: OrganizationInfo) => {
            return org.organization.id === orgId
          })
        ) {
          setIoCheck(true)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const addButton = async () => {
    try {
      const data = await postInteresrtOrganization(orgId)
      setIoCheck(true)
      console.log('관심기업 등록 성공:', data)
    } catch (error) {
      console.error('관심기업 등록 실패:', error)
    }
  }
  const [keywordNews, setKeywordNews] = useState<{title: string; link: string}[]>([])
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)

  const handleNewsUpdate = (
    newsList: {title: string; link: string}[],
    keyword: string
  ) => {
    console.log('🔥 부모가 받은 뉴스:', newsList, keyword)
    setKeywordNews(newsList)
    setSelectedKeyword(keyword)
  }

  // 스타일 상수
  const CARD_STYLES = {
    bg: 'white',
    borderRadius: 'xl',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.2s',
    // _hover: {
    //   transform: 'translateY(-2px)',
    //   boxShadow: '0 6px 25px rgba(0, 0, 0, 0.12)'
    // },
    overflow: 'auto'
  }

  const HEADING_STYLES = {
    fontSize: 'xl',
    fontWeight: '700',
    color: 'gray.700',
    letterSpacing: 'tight'
  }

  return (
    <Flex direction={{base: 'column', md: 'column'}} gap={8} overflow={'auto'}>
      <Flex align="center" ml={4} gap={2}>
        <Separator orientation="vertical" height="1.75em" borderWidth="2px" />
        <Text fontSize="3xl" fontWeight="bold">
          {companyinfo?.companyName}
        </Text>
      </Flex>
      {/* ESG별 점수 막대 그래프 ================================================================== */}
      <Box {...CARD_STYLES} p={6} w={{base: '100%', md: '100%'}}>
        <Text fontSize="lg" fontWeight="bold">
          ESG별 점수
        </Text>
        <Separator mt={2} mb={4} />
        <Flex display="flex" columns={3}>
          {orgId && <EsgBarData organizationId={orgId} targetKey="E" />}
          {orgId && <EsgBarData organizationId={orgId} targetKey="S" />}
          {orgId && <EsgBarData organizationId={orgId} targetKey="G" />}
        </Flex>
      </Box>
      <Flex direction={{base: 'column', md: 'row'}} gap={8}>
        {/* ESG 등급 변화 추이 선 그래프 ================================================================== */}
        <Box {...CARD_STYLES} p={6} w={{base: '100%', md: '70%'}}>
          <Text {...HEADING_STYLES}>ESG 등급 변화추이</Text>
          <Separator mt={2} mb={4} />
          <Box mt={4} width={'full'}>
            {orgId && <EsgLineData organizationId={orgId} />}
          </Box>
        </Box>

        {/* ESG 예상 등급 ================================================================== */}
        <Box {...CARD_STYLES} p={6} w={{base: '100%', md: '30%'}}>
          <Text {...HEADING_STYLES}>ESG 예상 등급</Text>
          <Separator mt={2} mb={4} />
          <Box>ESG 예상 등급 위치</Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export default EsgAnalysisCard
