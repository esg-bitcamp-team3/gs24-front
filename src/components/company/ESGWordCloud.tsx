'use client'

import React, {useEffect, useState} from 'react'
import WordCloud from 'react-d3-cloud'

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
  onWordClick?: (event: any, word: Word) => void
  onNewsUpdate?: (newsList: {title: string; link: string}[], keyword: string) => void
}

export default function ESGWordCloud({
  query,
  onWordClick,
  onNewsUpdate
}: ESGWordCloudProps) {
  const [data, setData] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/naver-api/news?query=${encodeURIComponent(query)}`
        )
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('❌ Fetch 실패:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query])

  const fontSizeMapper = (word: Word) => Math.log2(word.value + 1) * 10

  const handleWordClick = async (event: any, word: {text: string}) => {
    event.preventDefault() // ✅ 페이지 스크롤 방지

    console.log(`🖱️ 클릭됨: ${word.text}`)

    try {
      const response = await fetch(
        `http://localhost:8000/api/naver-api/keyword-news?query=${encodeURIComponent(
          query || ''
        )}&keyword=${encodeURIComponent(word.text)}`
      )

      const data = await response.json()

      const newsList: NewsItem[] = (data || []).map((item: any) => ({
        title: item.title?.replace(/&quot;/g, '"').replace(/<[^>]+>/g, '') || '제목 없음',
        link: item.originallink || item.link || '#'
      }))

      if (onNewsUpdate) {
        onNewsUpdate(newsList, word.text) // ✅ 부모에 title + link 전달
      }
    } catch (error) {
      console.error('❌ 뉴스 로딩 실패:', error)
      if (onNewsUpdate) onNewsUpdate([], word.text)
    }
  }

  if (loading) return <div>로딩 중...</div>
  if (!data.length) return <div>데이터 없음</div>

  return (
    <>
      <WordCloud
        data={data}
        fontSize={fontSizeMapper}
        rotate={0}
        width={600}
        height={300}
        fontStyle="bold"
        padding={2}
        onWordClick={handleWordClick}
      />
      <style jsx global>{`
        svg text {
          cursor: pointer;
        }
        svg text.selected {
          fill: white;
          stroke: blue;
          stroke-width: 6;
          paint-order: stroke;
        }
      `}</style>
    </>
  )
}
