import React, {useEffect, useState} from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Center
} from '@chakra-ui/react'
import {ChevronDownIcon} from '@chakra-ui/icons'
import Link from 'next/link'
import {motion, Variants} from 'framer-motion'
import {useInView} from 'react-intersection-observer'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ScatterChart,
  Scatter
} from 'recharts'
import {checkLogin} from '@/lib/api/auth'
import EmotionCard from '@/components/company/emotion'
import FirstPage from '@/components/landing/firstPage'
import SecondPage from '@/components/landing/secondPage'
import ThirdPage from '@/components/landing/thirdPage'

const esgData = [
  {name: '2021 ', ESG: 65, 예측: 63},
  {name: '2022 ', ESG: 69, 예측: 68},
  {name: '2023 ', ESG: 73, 예측: 72},
  {name: '2024', ESG: 85, 예측: 85},
  {name: '2025 ', ESG: 95, 예측: 95}
]
const mockData = [
  {name: '1월', ESG: 40, 예측: 42},
  {name: '2월', ESG: 55, 예측: 58},
  {name: '3월', ESG: 60, 예측: 63},
  {name: '4월', ESG: 70, 예측: 74},
  {name: '5월', ESG: 80, 예측: 82},
  {name: '6월', ESG: 95, 예측: 91}
]
const pieData = [
  {name: '긍정', value: 70},
  {name: '부정', value: 30}
]

const barData = [
  {name: 'E', value: 88},
  {name: 'S', value: 80},
  {name: 'G', value: 77}
]
const scatterData = [
  {x: 10, y: 65},
  {x: 20, y: 68},
  {x: 30, y: 72},
  {x: 40, y: 76},
  {x: 50, y: 80}
]
const COLORS = ['#38B2AC', '#CBD5E0']
const MotionBox = motion(Box)

const sectionVariants: Variants = {
  hidden: {opacity: 0, y: 50},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.6}
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {duration: 0.6}
  }
}

interface SectionProps {
  children: React.ReactNode
  id?: string
}

const FourthPage = () => {
  return (
    <Box w="full" maxW="6xl" px={6}>
      <Heading size="lg" mb={10} textAlign="center">
        ESG 지표 요약 대시보드
      </Heading>
      <Flex wrap="wrap" gap={10} justify="center">
        {/* ScatterChart - 회귀 분석 */}
        <Box
          bg="white"
          p={6}
          shadow="lg"
          borderRadius="2xl"
          flexBasis={{base: '100%', md: '45%'}}>
          <Heading size="md" mb={4}>
            ESG 회귀 분석 결과 (Scatter)
          </Heading>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{top: 20, right: 20, bottom: 10, left: 10}}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="탄소 배출량 감소율 (%)" unit="%" />
              <YAxis type="number" dataKey="y" name="ESG 점수" />
              <Tooltip cursor={{strokeDasharray: '3 3'}} />
              <Scatter name="회귀 데이터" data={scatterData} fill="#805AD5" />
            </ScatterChart>
          </ResponsiveContainer>
        </Box>

        {/* 분석 설명 */}
        <Box
          bg="white"
          p={6}
          shadow="lg"
          borderRadius="2xl"
          flexBasis={{base: '100%', md: '45%'}}>
          <Heading size="md" mb={4}>
            ESG 예측 등급 및 회귀 분석
          </Heading>
          <Text color="gray.700">
            선형 회귀 모델을 기반으로 ESG 점수의 주요 결정 요인을 분석한 결과, 탄소 배출량
            감소율과 사회적 책임 지표(SRI)가 점수에 가장 큰 영향을 미친 것으로
            나타났습니다. 회귀 분석의 결정 계수(R²)는 <strong>0.87</strong>로 높은
            설명력을 보여주며, 향후 ESG 성과 예측에 유의미한 지표로 활용될 수 있습니다.
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default FourthPage
