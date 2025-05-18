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

import {InfoItem} from '../InfoItem'
import InterestButton from '../etcs/InterestButton'

const CompanyInfoCard = ({orgId}: {orgId: string}) => {
  const [companyinfo, setCompanyInfo] = useState<CompanyInfo | null>(null)
  const [showMore, setShowMore] = useState(false)
  // const [ioCheck, setIoCheck] = useState<Boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ciData = await getCompanyInfo(orgId)
        if (ciData) setCompanyInfo(ciData || null)
        else return null

        // const checkId = await getInterestOrganization()

        // if (
        //   checkId?.organizationList.find((org: OrganizationInfo) => {
        //     return org.organization.id === orgId
        //   })
        // ) {
        //   setIoCheck(true)
        // }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

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
    <Flex direction={{base: 'column', md: 'column'}} gap={8}>
      <Flex align="center" ml={4} gap={2}>
        <Separator orientation="vertical" height="1.75em" borderWidth="2px" />
        <Text fontSize="3xl" fontWeight="bold">
          {companyinfo?.companyName}
        </Text>
        <InterestButton orgId={orgId} />
      </Flex>
      <Box {...CARD_STYLES} p={6} w={{base: '100%', md: '100%'}}>
        <Flex justify={'space-between'}>
          <Flex
            direction="column"
            wrap="wrap-reverse"
            gap={4}
            w={{base: '100%', md: '50%'}}>
            <InfoItem label="업종" value={companyinfo?.industry} />
            <InfoItem label="기업구분" value={companyinfo?.companyType} />
            <InfoItem
              label="홈페이지"
              value={companyinfo?.homepage}
              href={companyinfo?.homepage}
            />
          </Flex>
          <Flex
            direction="column"
            wrap="wrap-reverse"
            gap={4}
            w={{base: '100%', md: '50%'}}>
            <InfoItem label="자본금" value={companyinfo?.capital} />
            <InfoItem label="매출액" value={companyinfo?.revenue} />
            <InfoItem label="주소" value={companyinfo?.address} />
          </Flex>
        </Flex>

        <Flex justify="center" mt={6}>
          <Button size={'md'}>더보기</Button>
        </Flex>
      </Box>

      <Flex direction={{base: 'column', md: 'row'}} gap={8}>
        {/* 주가 차트 */}
        <Box {...CARD_STYLES} p={6} w={{base: '100%', md: '50%'}}>
          <Text {...HEADING_STYLES}>주가 차트</Text>
          <Separator mt={2} mb={4} />
          <Box>주가 차트</Box>
        </Box>

        {/* 기업 뉴스 */}
        <Box {...CARD_STYLES} p={6} w={{base: '100%', md: '50%'}}>
          <Text {...HEADING_STYLES}>기업 뉴스</Text>
          <Separator mt={2} mb={4} />
          <Box>뉴스 리스트</Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export default CompanyInfoCard
