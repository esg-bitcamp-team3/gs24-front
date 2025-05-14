<<<<<<< HEAD
// pages/index.tsx
'use client'
import React from 'react'
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
  Bar
} from 'recharts'
const mockData = [
  {name: '1월', ESG: 40, 예측: 42},
  {name: '2월', ESG: 55, 예측: 58},
  {name: '3월', ESG: 60, 예측: 63},
  {name: '4월', ESG: 70, 예측: 74},
  {name: '5월', ESG: 80, 예측: 82},
  {name: '6월', ESG: 95, 예측: 91}
]
const pieData = [
  {name: '지배', value: 90},
  {name: '기타', value: 10}
]

const barData = [
  {name: '20대', value: 28},
  {name: '30대', value: 31.4},
  {name: '40대', value: 36.8},
  {name: '50대', value: 26}
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
=======
'use client'
import Image from 'next/image'
import styles from './page.module.css'
>>>>>>> 7c3c8d636a750d265ea31b39bf69dbbfae322ab8

export default function Home() {
  const isMobile = useBreakpointValue({base: true, md: false})

<<<<<<< HEAD
  // 다음 섹션으로 스크롤
  const scrollToNext = () => {
    document.getElementById('section-1')?.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <Box
      height="100vh"
      overflowY="scroll"
      scrollSnapType="y mandatory"
      css={{
        '&::-webkit-scrollbar': {display: 'none'}
      }}>
      {/* 1️⃣ Hero Section */}
      <FullSection>
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
          <Box flex={1} maxW="lg">
            <Heading size="2xl" fontWeight="bold">
              ESG 혁신을 위한
              <br /> 새로운 시작
            </Heading>
            <Text fontSize="lg" mt={4} color="gray.600">
              기술과 데이터로 기업의 지속 가능성을 높이는 솔루션을 제공합니다.
            </Text>
            <Link href="/login" passHref>
              <Button mt={6} colorScheme="purple" size="lg" borderRadius="full">
                지금 시작하기
              </Button>
            </Link>
          </Box>
          <Box flex={1}>
            <Image
              src="/earth.png"
              alt="지구"
              maxH={{base: '250px', md: '400px'}}
              mx="auto"
            />
          </Box>
        </Flex>
      </FullSection>
      {/* 2️⃣ ESG 데이터 분석 (대시보드 형태) */}
      <FullSection id="section-1">
        <Box w="full" maxW="6xl" px={6}>
          <Heading size="lg" mb={10} textAlign="center">
            ESG 지표 요약 대시보드
          </Heading>
          <Flex wrap="wrap" gap={10} justify="center">
            <Box
              bg="white"
              p={6}
              shadow="lg"
              borderRadius="2xl"
              flexBasis={{base: '100%', md: '45%'}}>
              <Heading size="md" mb={4}>
                ESG 점수 추이
              </Heading>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={mockData}
                  margin={{top: 5, right: 20, bottom: 5, left: 0}}>
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
              <Heading size="md" mb={4}>
                ESG 전략 개요
              </Heading>
              <Text color="gray.700">
                ESG는 환경(Environment), 사회(Social), 지배구조(Governance)를 포함한
                기업의 지속 가능성 요소를 측정하는 기준입니다. 데이터 기반 접근을 통해
                변화의 흐름을 포착하고 전략을 수립할 수 있습니다.
              </Text>
            </Box>
          </Flex>
        </Box>
      </FullSection>
      (
      <FullSection id="section-1">
        <Box w="full" maxW="6xl" px={6} mx="auto">
          <Heading size="lg" mb={10} textAlign="center">
            ESG 지표 요약 대시보드
          </Heading>

          <Flex wrap="wrap" gap={10} justify="center">
            {/* ESG 점수 및 예측 */}
            <Box
              bg="white"
              p={6}
              shadow="lg"
              borderRadius="2xl"
              flexBasis={{base: '100%', md: '45%'}}>
              <Heading size="md" mb={4}>
                ESG 점수 및 예측
              </Heading>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={pieData}
                  margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="ESG"
                    stroke="#805AD5"
                    strokeWidth={3}
                    name="실제 점수"
                  />
                  <Line
                    type="monotone"
                    dataKey="예측"
                    stroke="#38B2AC"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="예측 값"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            {/* ESG 전략 설명 */}
            <Box
              bg="white"
              p={6}
              shadow="lg"
              borderRadius="2xl"
              flexBasis={{base: '100%', md: '45%'}}>
              <Heading size="md" mb={4}>
                ESG 전략 개요
              </Heading>
              <Text color="gray.700">
                ESG는 환경(Environment), 사회(Social), 지배구조(Governance)를 포함한
                기업의 지속 가능성 요소를 측정하는 기준입니다. 데이터 기반 접근을 통해
                변화의 흐름을 포착하고 전략을 수립할 수 있습니다.
              </Text>
            </Box>

            {/* 원형 그래프 */}
            <Box
              bg="white"
              p={6}
              shadow="lg"
              borderRadius="2xl"
              flexBasis={{base: '100%', md: '45%'}}>
              <Heading size="md" mb={4}>
                지배구조 비중
              </Heading>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label>
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            {/* 바 차트 */}
            <Box
              bg="white"
              p={6}
              shadow="lg"
              borderRadius="2xl"
              flexBasis={{base: '100%', md: '45%'}}>
              <Heading size="md" mb={4}>
                연령별 주요 응답 비율
              </Heading>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3182CE" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Flex>
        </Box>
      </FullSection>
    </Box>
=======
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="/login"
            target="_blank"
            rel="noopener noreferrer">
            로그인
          </a>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
>>>>>>> 7c3c8d636a750d265ea31b39bf69dbbfae322ab8
  )
}
