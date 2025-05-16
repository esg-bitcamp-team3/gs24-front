// pages/index.tsx
'use client'
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
  useBreakpointValue
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

export default function Home() {
  const [login, setLogin] = useState<boolean>(false)
  const isMobile = useBreakpointValue({base: true, md: false})

  useEffect(() => {
    const fetchLoginStatus = async () => {
      const status = await checkLogin()
      setLogin(status)
    }
    fetchLoginStatus()
  }, [])
  // 다음 섹션으로 스크롤
  const scrollToNext = () => {
    document.getElementById('section-1')?.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <Flex direction="column" align="center" justify="center" height="100%" width="100%">
      <Box marginBottom="20px">
        <Text fontSize="2xl" fontWeight="bold">
          지영이 최고
        </Text>
      </Box>
      <Link href={login ? '/dashboard' : '/login'} passHref>
        {/* <Button mt={6} colorScheme="purple" size="lg" borderRadius="full">
          {login ? '대시보드' : '지금 시작하기'}
        </Button> */}
        <Box>
          <Image src="/images/luppy.png"></Image>
        </Box>
      </Link>
    </Flex>
    // <Box
    //   height="100vh"
    //   overflowY="scroll"
    //   scrollSnapType="y mandatory"
    //   css={{
    //     '&::-webkit-scrollbar': {display: 'none'}
    //   }}>
    //   {/* 1️⃣ Hero Section */}
    //   <FullSection>
    //     <Flex
    //       direction={{base: 'column', md: 'row'}}
    //       align="center"
    //       justify="center"
    //       py={24}
    //       px={8}
    //       bgGradient="linear(to-b, purple.50, white)"
    //       borderRadius="3xl"
    //       maxW="1200px"
    //       w="100%"
    //       gap={12}>
    //       <Box flex={1} maxW="lg">
    //         <Heading size="2xl" fontWeight="bold">
    //           ESG 혁신을 위한
    //           <br /> 새로운 시작
    //         </Heading>
    //         <Text fontSize="lg" mt={4} color="gray.600">
    //           기술과 데이터로 기업의 지속 가능성을 높이는 솔루션을 제공합니다.
    //         </Text>
    //         <Link href={login ? '/dashboard' : '/login'} passHref>
    //           <Button mt={6} colorScheme="purple" size="lg" borderRadius="full">
    //             {login ? '대시보드' : '지금 시작하기'}
    //           </Button>
    //         </Link>
    //       </Box>
    //       <Box flex={1}>
    //         <Image
    //           src="/earth.png"
    //           alt="지구"
    //           maxH={{base: '250px', md: '400px'}}
    //           mx="auto"
    //         />
    //       </Box>
    //     </Flex>
    //   </FullSection>
    //   {/* 2️⃣ ESG 데이터 분석 (대시보드 형태) */}
    //   <FullSection id="section-1">
    //     <Box w="full" maxW="6xl" px={6}>
    //       <Heading size="lg" mb={10} textAlign="center">
    //         ESG 지표 요약 대시보드
    //       </Heading>
    //       <Flex wrap="wrap" gap={10} justify="center">
    //         <Box
    //           bg="white"
    //           p={6}
    //           shadow="lg"
    //           borderRadius="2xl"
    //           flexBasis={{base: '100%', md: '45%'}}>
    //           <Heading size="md" mb={4}>
    //             ESG 점수 추이
    //           </Heading>
    //           <ResponsiveContainer width="100%" height={300}>
    //             <LineChart
    //               data={mockData}
    //               margin={{top: 5, right: 20, bottom: 5, left: 0}}>
    //               <CartesianGrid strokeDasharray="3 3" />
    //               <XAxis dataKey="name" />
    //               <YAxis />
    //               <Tooltip />
    //               <Line type="monotone" dataKey="ESG" stroke="#805AD5" strokeWidth={3} />
    //             </LineChart>
    //           </ResponsiveContainer>
    //         </Box>

    //         <Box
    //           bg="white"
    //           p={6}
    //           shadow="lg"
    //           borderRadius="2xl"
    //           flexBasis={{base: '100%', md: '45%'}}>
    //           <Heading size="md" mb={4}>
    //             ESG 전략 개요
    //           </Heading>
    //           <Text color="gray.700">
    //             ESG는 환경(Environment), 사회(Social), 지배구조(Governance)를 포함한
    //             기업의 지속 가능성 요소를 측정하는 기준입니다. 데이터 기반 접근을 통해
    //             변화의 흐름을 포착하고 전략을 수립할 수 있습니다.
    //           </Text>
    //         </Box>
    //       </Flex>
    //     </Box>
    //   </FullSection>

    //   <FullSection id="section-1">
    //     <Box w="full" maxW="6xl" px={6} mx="auto">
    //       <Heading size="lg" mb={10} textAlign="center">
    //         ESG 지표 요약 대시보드
    //       </Heading>

    //       <Flex wrap="wrap" gap={10} justify="center">
    //         {/* ESG 점수 및 예측 */}
    //         <Box
    //           bg="white"
    //           p={6}
    //           shadow="lg"
    //           borderRadius="2xl"
    //           flexBasis={{base: '100%', md: '45%'}}>
    //           <Heading size="md" mb={4}>
    //             ESG 점수 및 예측
    //           </Heading>
    //           <ResponsiveContainer width="100%" height={300}>
    //             <LineChart
    //               data={esgData}
    //               margin={{top: 5, right: 20, bottom: 5, left: 0}}>
    //               <CartesianGrid strokeDasharray="3 3" />
    //               <XAxis dataKey="name" />
    //               <YAxis />
    //               <Tooltip />
    //               <Line
    //                 color="red"
    //                 type="monotone"
    //                 dataKey="ESG"
    //                 stroke="#ab2222"
    //                 strokeWidth={3}
    //                 name="실제 점수"
    //               />
    //               <Line
    //                 type="monotone"
    //                 dataKey="예측"
    //                 stroke="#33479c"
    //                 strokeWidth={2}
    //                 strokeDasharray="5 5"
    //                 name="예측 값"
    //               />
    //             </LineChart>
    //           </ResponsiveContainer>
    //         </Box>

    //         {/* ESG 전략 설명 */}
    //         <Box
    //           bg="white"
    //           p={6}
    //           shadow="lg"
    //           borderRadius="2xl"
    //           flexBasis={{base: '100%', md: '45%'}}>
    //           <Heading size="md" mb={4}>
    //             ESG 전략
    //           </Heading>
    //           <Text color="gray.700">
    //             ESG는 기업의 지속 가능성과 비재무적 성과를 평가하는 핵심 지표로,
    //             환경(Environment), 사회(Social), 지배구조(Governance)의 세 가지 축으로
    //             구성됩니다. 효과적인 ESG 전략은 리스크 관리, 기업 평판 향상, 장기적인 재무
    //             성과 개선에 기여할 수 있습니다. 최근에는 ESG 데이터를 기반으로 한 정량적
    //             분석과 AI 기반 예측 모델이 기업 의사결정에 적극 활용되고 있으며,
    //             투자자들은 이러한 지표를 활용해 책임투자(Responsible Investment) 전략을
    //             수립하고 있습니다.
    //           </Text>
    //         </Box>

    //         {/* 원형 그래프 */}
    //         <Box
    //           bg="white"
    //           p={6}
    //           shadow="lg"
    //           borderRadius="2xl"
    //           flexBasis={{base: '100%', md: '45%'}}>
    //           <Heading size="md" mb={4}>
    //             긍정 부정 비율
    //           </Heading>
    //           <ResponsiveContainer width="100%" height={300}>
    //             <PieChart>
    //               <Pie
    //                 data={pieData}
    //                 dataKey="value"
    //                 nameKey="name"
    //                 outerRadius={100}
    //                 label>
    //                 {pieData.map((_, index) => (
    //                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //                 ))}
    //               </Pie>
    //               <Tooltip />
    //             </PieChart>
    //           </ResponsiveContainer>
    //         </Box>

    //         {/* 바 차트 */}
    //         <Box
    //           bg="white"
    //           p={6}
    //           shadow="lg"
    //           borderRadius="2xl"
    //           flexBasis={{base: '100%', md: '45%'}}>
    //           <Heading size="md" mb={4}>
    //             E•S•G별 점수
    //           </Heading>
    //           <ResponsiveContainer width="100%" height={300}>
    //             <BarChart data={barData}>
    //               <CartesianGrid strokeDasharray="3 3" />
    //               <XAxis dataKey="name" />
    //               <YAxis />
    //               <Tooltip />
    //               <Bar dataKey="value" fill="#3182CE" />
    //             </BarChart>
    //           </ResponsiveContainer>
    //         </Box>
    //       </Flex>
    //     </Box>
    //   </FullSection>
    //   <FullSection id="section-1">
    //     <Box w="full" maxW="6xl" px={6}>
    //       <Heading size="lg" mb={10} textAlign="center">
    //         ESG 지표 요약 대시보드
    //       </Heading>
    //       <Flex wrap="wrap" gap={10} justify="center">
    //         {/* ScatterChart - 회귀 분석 */}
    //         <Box
    //           bg="white"
    //           p={6}
    //           shadow="lg"
    //           borderRadius="2xl"
    //           flexBasis={{base: '100%', md: '45%'}}>
    //           <Heading size="md" mb={4}>
    //             ESG 회귀 분석 결과 (Scatter)
    //           </Heading>
    //           <ResponsiveContainer width="100%" height={300}>
    //             <ScatterChart margin={{top: 20, right: 20, bottom: 10, left: 10}}>
    //               <CartesianGrid />
    //               <XAxis
    //                 type="number"
    //                 dataKey="x"
    //                 name="탄소 배출량 감소율 (%)"
    //                 unit="%"
    //               />
    //               <YAxis type="number" dataKey="y" name="ESG 점수" />
    //               <Tooltip cursor={{strokeDasharray: '3 3'}} />
    //               <Scatter name="회귀 데이터" data={scatterData} fill="#805AD5" />
    //             </ScatterChart>
    //           </ResponsiveContainer>
    //         </Box>

    //         {/* 분석 설명 */}
    //         <Box
    //           bg="white"
    //           p={6}
    //           shadow="lg"
    //           borderRadius="2xl"
    //           flexBasis={{base: '100%', md: '45%'}}>
    //           <Heading size="md" mb={4}>
    //             ESG 예측 등급 및 회귀 분석
    //           </Heading>
    //           <Text color="gray.700">
    //             선형 회귀 모델을 기반으로 ESG 점수의 주요 결정 요인을 분석한 결과, 탄소
    //             배출량 감소율과 사회적 책임 지표(SRI)가 점수에 가장 큰 영향을 미친 것으로
    //             나타났습니다. 회귀 분석의 결정 계수(R²)는 <strong>0.87</strong>로 높은
    //             설명력을 보여주며, 향후 ESG 성과 예측에 유의미한 지표로 활용될 수
    //             있습니다.
    //           </Text>
    //         </Box>
    //       </Flex>
    //     </Box>
    //   </FullSection>
    // </Box>
  )
}
