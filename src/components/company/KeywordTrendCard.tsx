'use client'

import {
  Box,
  DataList,
  Flex,
  Separator,
  Text,
  VStack,
  Button,
  Center,
  Link
} from '@chakra-ui/react'

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

const KeywordTrendCard = ({orgId}: {orgId: string}) => {
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
      {/* 긍정 부정 ================================================================== */}
      <Box {...CARD_STYLES} p={6} w={{base: '100%', md: '30%'}}>
        긍정 부정 컴포넌트 위치
      </Box>
      <Flex direction={{base: 'column', md: 'row'}} gap={8}>
        {/* 관련 키워드 ================================================================== */}
        <Box {...CARD_STYLES} p={6}  w={{base: '100%', md: '60%'}}>
          <Text {...HEADING_STYLES} textAlign="center" mb={4}>
            기업 관련 키워드
          </Text>
          <Center>
            <Box w="600px" h="300px">
              <ESGWordCloud
                query={companyinfo?.companyName || ''}
                onNewsUpdate={handleNewsUpdate}
              />
            </Box>
          </Center>
        </Box>

        {/* 키워드 관련 뉴스 ================================================================== */}
        {/* 뉴스 섹션 */}
        <Box {...CARD_STYLES} p={6}  w={{base: '100%', md: '40%'}}>
          <Text {...HEADING_STYLES} mb={4}>
            키워드 관련 뉴스
            {selectedKeyword && (
              <Text as="span" color="teal.500" ml={2}>
                : {selectedKeyword}
              </Text>
            )}
          </Text>
          <Separator mb={4} />
          <VStack align="stretch" gap={3}>
            {keywordNews.map((news, idx) => (
              <Link
                key={idx}
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                p={2}
                borderRadius="md"
                _hover={{
                  bg: 'gray.50',
                  color: 'teal.500',
                  textDecoration: 'none'
                }}
                display="flex"
                alignItems="center">
                <Text fontSize="sm">• {news.title}</Text>
              </Link>
            ))}
          </VStack>
        </Box>
      </Flex>
    </Flex>
  )
}

export default KeywordTrendCard
