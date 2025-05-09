import React, {useEffect, useState} from 'react'
import {getEsgRatingByOrganization} from '@/lib/api/get'

import { Box } from '@chakra-ui/react'
import { Line } from 'react-chartjs-2'


const convertGradeToNumber = (grade: string): number => {
  const gradeMap: { [key: string]: number } = {
    'A+': 10, 'A': 9, 'A-': 8,
    'B+': 7, 'B': 6, 'B-': 5,
    'C+': 4, 'C': 3, 'C-': 2,
    'D+': 1, 'D': 0
  };
  return gradeMap[grade.toUpperCase()] ?? 0;
};

// esgRatings는 특정 회사의 ESG 평가 데이터를 포함하는 EsgRatingResponse 타입의 props
export const EsgLineData = ({organizationId}: {organizationId: string}) => {
  const [chartData, setChartData] = useState<any>(null)  // 차트 데이터 상태

  // 차트 데이터가 변경될 때마다 차트를 업데이트하기 위한 useEffect 훅
  // esgRatings.organization.id가 변경될 때마다 ESG 등급 데이터를 가져옴\
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEsgRatingByOrganization(organizationId)
        console.log(res);
        const ratings = res?.ratings || []

        const labels = ratings.map(r => r.year)
        // Convert letter grades to numbers
        const environmentData = ratings.map(r => convertGradeToNumber(r.environment))
        const socialData = ratings.map(r => convertGradeToNumber(r.social))
        const governanceData = ratings.map(r => convertGradeToNumber(r.governance))

        setChartData({
          labels,
          datasets: [
            {
              label: 'E (환경)',
              data: environmentData,
              borderColor: 'rgba(72, 187, 120, 1)',
              backgroundColor: 'rgba(72, 187, 120, 0.2)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'S (사회)',
              data: socialData,
              borderColor: 'rgba(66, 153, 225, 1)',
              backgroundColor: 'rgba(66, 153, 225, 0.2)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'G (지배구조)',
              data: governanceData,
              borderColor: 'rgba(245, 101, 101, 1)',
              backgroundColor: 'rgba(245, 101, 101, 0.2)',
              fill: true,
              tension: 0.4
            }
          ]
        })
      } catch (error) {
        console.error('ESG 차트 데이터 가져오기 실패:', error)
      }
    }

    fetchData()
  }, [organizationId])

  return (
    <Box mt={4} width={'full'}>
      {chartData && <Line options={esgLineOptions} data={chartData} />}
    </Box>
  )
}

const esgLineOptions = {
  responsive: true,
  plugins: {
    legend: {position: 'top' as const},
    title: {display: true, text: 'ESG 등급 변화 추이 (라인 그래프)'}
  }
}
