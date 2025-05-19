'use client'

import {Box, Center, Spinner, Text, VStack, Flex, IconButton} from '@chakra-ui/react'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import WordCloud from 'react-d3-cloud'
import {useTheme} from '@emotion/react'
import {Tooltip} from '../ui/tooltip'
import {LuInfo, LuRefreshCcw} from 'react-icons/lu'
import * as d3 from 'd3'
import {on} from 'events'

interface Word {
  text: string
  value: number
}

interface NewsItem {
  title: string
  link: string
}

interface ESGWordCloudProps {
  query: string
  onWordClick: (keyword: string) => void
}

export default function ESGWordCloud({query, onWordClick}: ESGWordCloudProps) {
  const [data, setData] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)

  const refreshWordCloud = () => {
    setLoading(true)
    setRefreshKey(prev => prev + 1)
  }

  const fetchKeywords = async (query: string): Promise<Word[]> => {
    try {
      const res = await fetch(
        `http://localhost/search/search/news?query=${encodeURIComponent(query)}`
      )
      return await res.json()
    } catch (err) {
      console.error('❌ 키워드 Fetch 실패:', err)
      return []
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      if (!query) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const keywordsData = await fetchKeywords(query)
        setData(keywordsData)
      } catch (err) {
        console.error('❌ 데이터 로딩 실패:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [query, refreshKey])

  // Color mapper for words based on their value
  const colorPalette = useMemo(
    () => [
      '#06D6A0', // Mint
      '#1A85FF', // Bright Blue
      '#D0021B', // Bright Red
      '#FFD166', // Yellow
      '#9B51E0', // Purple
      '#FF8A69', // Coral
      '#38B2AC', // Teal
      '#FF6B6B', // Salmon
      '#0075F2', // Royal Blue
      '#22CADD', // Cyan
      '#F24976' // Pink
    ],
    []
  )

  // Optimized font size mapper with better scaling
  const fontSizeMapper = useMemo(
    () => (word: Word) => {
      const min = 16 // Slightly increased minimum font size
      const max = 65 // Increased maximum font size

      // Enhanced logarithmic scaling for better size distribution
      const size = Math.log2(word.value + 1) * 10
      return Math.max(min, Math.min(max, size))
    },
    []
  )

  // Improved color mapper with more variations and better distribution
  const colorMapper = useMemo(
    () => (word: Word) => {
      // Use text content for consistent color assignment (for same words)
      const hashCode = word.text
        .split('')
        .reduce((hash, char) => char.charCodeAt(0) + ((hash << 5) - hash), 0)

      // Get color based on hash (ensures same word always gets same color)
      const colorIndex = Math.abs(hashCode) % colorPalette.length
      return colorPalette[colorIndex]
    },
    [colorPalette]
  )

  const handleWordClick = (event: any, word: {text: string}) => {
    event.preventDefault()
    setSelectedWord(word.text)
    onWordClick(word.text)

    // Find all text elements in the SVG
    const elements = document.querySelectorAll('svg text')
    elements.forEach(el => {
      if (el.textContent === word.text) {
        el.classList.add('word-selected')
      } else {
        el.classList.remove('word-selected')
      }
    })
  }

  const onWordMouseOver = useCallback((word: Word) => {
    console.log(`onWordMouseOver: ${word.text}`)
  }, [])
  const onWordMouseOut = useCallback((word: Word) => {
    console.log(`onWordMouseOut: ${word.text}`)
  }, [])

  if (loading) {
    return (
      <Center h="300px" py={8} borderRadius="lg" boxShadow="sm">
        <VStack gap={4}>
          <Spinner size="xl" color="teal.500" />
          <Text color="gray.600" fontWeight="medium">
            기업 키워드를 불러오는 중입니다. 잠시만 기다려주세요
          </Text>
        </VStack>
      </Center>
    )
  }

  if (!data.length) {
    return (
      <Center h="300px" py={8} borderRadius="lg" boxShadow="sm">
        <VStack>
          <Text color="gray.500">키워드 데이터가 없습니다.</Text>
          <IconButton
            aria-label="Refresh"
            size="sm"
            colorScheme="teal"
            variant="ghost"
            onClick={refreshWordCloud}
            mt={2}>
            <LuRefreshCcw />
          </IconButton>
        </VStack>
      </Center>
    )
  }

  return (
    <Box position="relative" borderRadius="lg" boxShadow="sm" p={4} overflow="hidden">
      <Box overflow="hidden" className="wordcloud-container">
        <WordCloud
          key={refreshKey}
          data={data}
          fontSize={fontSizeMapper}
          fill={colorMapper}
          rotate={0}
          width={600}
          height={300}
          font="Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif"
          fontWeight={600}
          padding={2}
          onWordClick={handleWordClick}
          onWordMouseOver={word => {
            word.target.classList.add('word-over')
            const wordData = data.find(d => d.text === word.target.textContent)
            if (wordData) {
              word.target.style.fontSize = `${fontSizeMapper(wordData) * 1.1}px`
            }
          }}
          onWordMouseOut={word => {
            word.target.classList.remove('word-over')
            const wordData = data.find(d => d.text === word.target.textContent)
            if (wordData) {
              word.target.style.fontSize = `${fontSizeMapper(wordData)}px`
            }
          }}
        />
      </Box>
      <style>{`
        .wordcloud-container {
          overflow: hidden;
          position: relative;
        }
        .word-selected {
          fill: #ff6347 !important; /* Tomato color */
          font-weight: bold !important;
          transition: fill 0.3s ease, font-weight 0.3s ease;
        }
        .word-over {
          font-weight: bold !important;
          transition: font-weight 0.3s ease;
        }
      `}</style>
    </Box>
  )
}
