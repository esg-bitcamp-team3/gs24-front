'use client'

import * as d3 from 'd3'
import {useEffect, useRef, useState} from 'react'
import {Box, Button, HStack, Spinner, Icon} from '@chakra-ui/react'
import {BsUbuntu} from 'react-icons/bs'
import {RiRefreshFill} from 'react-icons/ri'
interface PricePoint {
  time: Date
  price: number
}

export default function RealTimeChart() {
  const handleSync = async () => {
    setIsSyncing(true) // 1. 버튼 누르면 즉시 스피너만 보이게
    await new Promise(resolve => setTimeout(resolve, 1000)) // 2. 1초 기다림
    await fetchPrice() // 3. 진짜 fetch 시작
    setIsSyncing(false) // 4. 끝나면 복원
  }
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [data, setData] = useState<PricePoint[]>([])
  const companyCode = '138930'
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  // ✅ 컴포넌트 내부에 선언해야 인식됨!
  const fetchPrice = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const res = await fetch(
        `http://127.0.0.1/finance/finance/stock-history?code=${companyCode}&start_date=20250418&end_date=20250515&period_code=D&org_adj_prc=1`
      )
      const json = await res.json()

      const chartData: PricePoint[] = (json.output2 || [])
        .map((entry: any) => ({
          time: new Date(
            `${entry.stck_bsop_date.slice(0, 4)}-${entry.stck_bsop_date.slice(
              4,
              6
            )}-${entry.stck_bsop_date.slice(6, 8)}`
          ),
          price: parseInt(entry.stck_clpr, 10)
        }))
        .sort(
          (a: {time: {getTime: () => number}}, b: {time: {getTime: () => number}}) =>
            a.time.getTime() - b.time.getTime()
        )

      setData(chartData)
    } catch (err) {
      console.error('📉 차트 데이터 로딩 실패:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return

    const svg = d3.select(svgRef.current)
    const width = 700
    const height = 320
    const margin = {top: 30, right: 40, bottom: 100, left: 60} // ⬅️ 더 넓게

    svg.selectAll('*').remove()

    // Define x scale
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, d => d.time) as [Date, Date])
      .range([margin.left, width - margin.right])

    const xAxis = d3
      .axisBottom(x)
      .ticks(10)
      .tickFormat(domainValue =>
        domainValue instanceof Date ? d3.timeFormat('%m-%d')(domainValue) : ''
      )

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .selectAll('text')
      .attr('transform', 'rotate(-40)')
      .style('text-anchor', 'end')
      .style('font-size', '12px')
      .style('fill', '#374151') // 텍스트 컬러

    // X축 그리드 선은 따로!
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickSize(-height + margin.top + margin.bottom)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-width', 0.5)

    // Define y scale
    const y = d3
      .scaleLinear()
      .domain([d3.min(data, d => d.price)! * 0.98, d3.max(data, d => d.price)! * 1.02])
      .range([height - margin.bottom, margin.top])

    const yAxis = d3.axisLeft(y).ticks(0) // 눈금 6개만!

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis)
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#374151')

    // Y축 그리드 선
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width + margin.left + margin.right)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-width', 0.5)

    const line = d3
      .line<PricePoint>()
      .x(d => x(d.time))
      .y(d => y(d.price))
      .curve(d3.curveMonotoneX)

    // X축 (📅 날짜 기준)
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(10)
          .tickFormat(domainValue =>
            domainValue instanceof Date ? d3.timeFormat('%m-%d')(domainValue) : ''
          )
      )
      .selectAll('text')
      .attr('transform', 'rotate(-40)')
      .style('text-anchor', 'end')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height - margin.bottom})`)

      .selectAll('line')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-width', 0.5)

    // Y축
    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y))

    // 📈 라인 그리기
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#4F46E5')
      .attr('stroke-width', 2)
      .attr('d', line)

    // 🔍 Tooltip 요소 추가
    const tooltip = svg.append('g').style('display', 'none')

    tooltip
      .append('circle')
      .attr('r', 5)
      .attr('fill', '#4F46E5')
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('pointer-events', 'none')

    const tooltipBox = tooltip
      .append('rect')
      .attr('x', 10)
      .attr('y', -30)
      .attr('width', 120)
      .attr('height', 40)
      .attr('rx', 6)
      .attr('fill', '#ffffffdd')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1)
      .attr('filter', 'drop-shadow(0px 1px 2px rgba(0,0,0,0.2))')

    const tooltipText = tooltip
      .append('text')
      .attr('x', 15)
      .attr('y', 0)
      .attr('fill', '#111')
      .attr('font-size', '12px')
      .style('pointer-events', 'none')

    // 📌 인터랙션 감지 영역
    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseover', () => tooltip.style('display', null))
      .on('mouseout', () => tooltip.style('display', 'none'))
      .on('mousemove', function (event) {
        const [mx] = d3.pointer(event)
        const hoveredDate = x.invert(mx)

        const bisect = d3.bisector((d: PricePoint) => d.time).center
        const i = bisect(data, hoveredDate)
        const d = data[i]

        const tx = x(d.time)
        const ty = y(d.price)

        tooltip.attr('transform', `translate(${tx},${ty})`)
        tooltipText.text(
          `${d3.timeFormat('%m-%d')(d.time)}\n₩${d.price.toLocaleString()}`
        )
      })
  }, [data])

  return (
    <Box p={4}>
      <HStack gap={1} mb={2}>
        <Button
          onClick={handleSync}
          disabled={isSyncing}
          size="sm"
          variant="outline"
          colorScheme="blue">
          <Icon as={RiRefreshFill} w={4} h={4} mr={2} />
          동기화
        </Button>
      </HStack>

      <svg ref={svgRef} width={700} height={320}></svg>
    </Box>
  )
}
