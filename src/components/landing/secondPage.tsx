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

function FullSection({children, id}: SectionProps) {
  const {ref, inView} = useInView({
    threshold: 0.5,
    triggerOnce: false
  })

  return (
    <MotionBox
      id={id}
      ref={ref}
      as="section"
      scrollSnapAlign="start"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'exit'}>
      {children}
    </MotionBox>
  )
}

const SecondPage = () => {
  const isMobile = useBreakpointValue({base: true, md: false})

  return (
    // <Box
    //   height="100vh"
    //   overflowY="scroll"
    //   scrollSnapType="y mandatory"
    //   css={{
    //     '&::-webkit-scrollbar': {display: 'none'}
    //   }}>
    //   {/* 2️⃣ ESG 데이터 분석 (대시보드 형태) ============================*/}
    <Flex
      direction={{base: 'column', md: 'row'}}
      align="center"
      justify="center"
      py={24}
      px={8}
      bgGradient="linear(to-b, purple.50, white)"
      borderRadius="3xl"
      maxW="1200px"
      w="100%"
      gap={12}>
      <Box w="full" maxW="6xl" px={6}>
        <Heading size="5xl" mb={10} textAlign="center">
          ESG 지표 요약 대시보드
        </Heading>
        <Flex wrap="wrap" gap={10} justify="center">
          <Box
          direction={{base: 'column', md: 'row'}}
            bg="white"
            p={6}
            shadow="lg"
            borderRadius="2xl"
            flexBasis={{base: '100%', md: '45%'}}>
            <Heading size="md" mb={4}>
              ESG 점수 추이
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ESG" stroke="#805AD5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          <Box
            bg="white"
            p={6}
            shadow="lg"
            borderRadius="2xl"
            flexBasis={{base: '100%', md: '45%'}}>
            {/* <Heading size="md" mb={4}>
                ESG 전략 개요
              </Heading> */}
            <Text color="gray.700" lineHeight="1.7">
              <Text fontWeight="bold">🌍 ESG란?</Text>
              환경(Environment) 🌱, 사회(Social) 🤝, 지배구조(Governance) 🏛️의 세 가지
              요소를 통해 기업의 지속 가능성과 비재무적 리스크를 종합적으로 평가하는
              기준입니다.
              <br />
              <br />
              <Text fontWeight="bold"> 📈 왜 중요한가요? </Text>
              지속가능경영은 단순한 이미지 개선이 아닌, 투자 판단, 공급망 신뢰도, 평판
              리스크 대응에 직접적으로 연결됩니다. 데이터 기반의 ESG 분석은 기업의 전략
              수립과 미래 예측에 필수적인 도구입니다.
              <br />
              <br />
              <Text fontWeight="bold">🧠 이 대시보드로 무엇을 알 수 있나요?</Text>• ESG
              점수의 변화 추이를 한눈에 확인 • ESG 각 항목의 개별 리스크 요인 파악 •
              경쟁사와의 상대적 위치 비교도 가능
              {/* ESG는 환경(Environment), 사회(Social), 지배구조(Governance)를 포함한
                기업의 지속 가능성 요소를 측정하는 기준입니다. 데이터 기반 접근을 통해
                변화의 흐름을 포착하고 전략을 수립할 수 있습니다. */}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
    // {/* </Box> */}
  )
}

export default SecondPage
