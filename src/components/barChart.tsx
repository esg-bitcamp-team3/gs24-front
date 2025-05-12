import React, {useEffect, useRef} from 'react'
import {getEsgRatingByOrganization} from '@/lib/api/get'
import {Box} from '@chakra-ui/react'
import * as d3 from 'd3'

const convertGradeToNumber = (grade: string): number => {
  const gradeMap: {[key: string]: number} = {
    'A+': 10,
    A: 9,
    'A-': 8,
    'B+': 7,
    B: 6,
    'B-': 5,
    'C+': 4,
    C: 3,
    'C-': 2,
    'D+': 1,
    D: 0
  }
  return gradeMap[grade.toUpperCase()] ?? 0
}

export const EsgBarData = ({
  organizationId,
  targetKey
}: {
  organizationId: string
  targetKey: 'E' | 'S' | 'G'
}) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEsgRatingByOrganization(organizationId)
        const ratings = res?.ratings || []

        // 가장 최신 연도 데이터만 사용
        const latest = ratings[ratings.length - 1]

        const keyMap: Record<'E' | 'S' | 'G', keyof typeof latest> = {
          E: 'environment',
          S: 'social',
          G: 'governance'
        }

        const data = [
          {
            key: targetKey,
            value: convertGradeToNumber(String(latest[keyMap[targetKey]]))
          }
          //   {key: 'E', value: convertGradeToNumber(latest.environment)},
          //   {key: 'S', value: convertGradeToNumber(latest.social)},
          //   {key: 'G', value: convertGradeToNumber(latest.governance)}
        ]

        createBarChart(data)
      } catch (error) {
        console.error('ESG 차트 데이터 가져오기 실패:', error)
      }
    }

    fetchData()
  }, [organizationId])

  const createBarChart = (data: {key: string; value: number}[]) => {
    if (!svgRef.current) return

    d3.select(svgRef.current).selectAll('*').remove()

    const margin = {top: 10, right: 15, bottom: 30, left:20}
    const width = 350 - margin.left - margin.right
    const height = 80 - margin.top - margin.bottom

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // 스케일 조정
    const x = d3.scaleLinear().domain([0, 10]).range([0, width])

    const y = d3
      .scaleBand()
      .domain(data.map(d => d.key))
      .range([0, height])
      .padding(0.4)

    const colors: Record<string, string> = {
      E: 'rgba(72, 187, 120, 1)',
      S: 'rgba(255, 204, 77, 1)',
      G: 'rgba(56, 89, 138, 1)'
    }

    svg
      .append('g')
      .attr('transform', `translate(0, 0)`)
      .call(d3.axisLeft(y))
      .style('font-size', '12px')

    // //x축 등급
    // svg
    //   .append('g')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(
    //     d3
    //       .axisBottom(x)
    //       .ticks(5)
    //       .tickFormat(d => {
    //         const grades = ['D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+']
    //         return grades[d as number] ?? ''
    //       })
    //   )
    //   .style('font-size', '10px')

    // 막대 추가
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')

      .attr('y', d => y(d.key)!)
      .attr('x', 0)
      .attr('height', y.bandwidth())
      .attr('width', d => x(d.value))
      .attr('fill', d => colors[d.key])

    // 텍스트 레이블 추가   
    svg
      .selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('y', d => y(d.key)! + y.bandwidth() / 2 + 4)
      .attr('x', d => x(d.value) + 3)  // 레이블 위치
      .text(d => d.value)
      .style('font-size', '11px')
  }

  return (
    <Box width={'full'} height={'full'}>
      <svg ref={svgRef}></svg>
    </Box>
  )
}
