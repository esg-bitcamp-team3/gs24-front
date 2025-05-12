import React, {useEffect, useState, useRef} from 'react'
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

// esgRatings는 특정 회사의 ESG 평가 데이터를 포함하는 EsgRatingResponse 타입의 props
export const EsgLineData = ({organizationId}: {organizationId: string}) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEsgRatingByOrganization(organizationId)
        const ratings = res?.ratings || []

        // Convert data for D3
        const data = ratings.map(r => ({
          year: r.year,
          E: convertGradeToNumber(r.environment),
          S: convertGradeToNumber(r.social),
          G: convertGradeToNumber(r.governance)
        }))

        createLineChart(data)
      } catch (error) {
        console.error('ESG 차트 데이터 가져오기 실패:', error)
      }
    }

    fetchData()
  }, [organizationId])

  const createLineChart = (data: any[]) => {
    if (!svgRef.current) return

    // Clear previous chart
    data.sort((a, b) => a.year - b.year)
    d3.select(svgRef.current).selectAll('*').remove()

    // Set dimensions
    const margin = {top: 20, right: 80, bottom: 40, left: 40}
    const width = 500 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g') // 차트 전체를 그릴 그룹 생성₩
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // x : year
    const x = d3
      .scalePoint()
      .domain(data.map(d => d.year.toString()))
      .range([0, width])

    // y : esg 등급
    const y = d3.scaleLinear().domain([0, 10]).range([height, 0])

    // Create lines
    const line = d3
      .line<any>()
      .x(d => x(d.year.toString())!)
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX) // 부드러운 곡선 처리

    const keys = ['E', 'S', 'G'] as const
    const colors: Record<'E' | 'S' | 'G', string> = {
      E: 'rgba(72, 187, 120, 1)',
      S: 'rgba(66, 153, 225, 1)',
      G: 'rgba(245, 101, 101, 1)'
    }

    // Add X axis
    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x))

    // Add Y axis with grade labels
    svg.append('g').call(
      d3.axisLeft(y).tickFormat(d => {
        const grades = ['D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+']
        return grades[d as number]
      })
    )

    // Add lines
    keys.forEach(key => {
      const lineData = data.map(d => ({
        year: d.year,
        value: d[key]
      }))

      // Add lines
      svg
        .append('path')
        .datum(lineData)
        .attr('fill', 'none')
        .attr('stroke', colors[key as keyof typeof colors])
        .attr('stroke-width', 2)
        .attr('d', line)

      // Add dots
      svg
        .selectAll(`dot-${key}`)
        .data(lineData)
        .join('circle')
        .attr('cx', d => x(d.year.toString())!)
        .attr('cy', d => y(d.value))
        .attr('r', 4)
        .attr('fill', colors[key as keyof typeof colors])
    })

    // Add legend
    const legend = svg
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'start')
      .selectAll('g')
      .data(['E (환경)', 'S (사회)', 'G (지배구조)'])
      .join('g')
      .attr('transform', (d, i) => `translate(${width + 10},${i * 20})`)

    legend
      .append('circle')
      .attr('r', 4)
      .attr('fill', (d, i) => colors[keys[i]])

    legend
      .append('text')
      .attr('x', 10)
      .attr('y', 3)
      .text(d => d)
  }

  return (
    <Box mt={4} width={'full'} height={'full'}>
      <svg ref={svgRef}></svg>
    </Box>
  )
}
