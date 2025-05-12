'use client'

import React, {useEffect, useState} from 'react'
import WordCloud from 'react-d3-cloud'

interface Word {
  text: string
  value: number
}

export default function ESGWordCloud({query}: {query: string}) {
  const [data, setData] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('📡 Fetching for query:', query)
        const res = await fetch(
          `http://localhost:8000/api/naver-api/news?query=${encodeURIComponent(query)}`
        )
        const json = await res.json()
        console.log('✅ 응답 데이터:', json)
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

  const handleWordClick = (event: any, word: Word) => {
    console.log(`🖱️ 클릭됨: ${word.text}`)
    setSelectedWord(word.text)
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
        fontStyle="normal"
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
