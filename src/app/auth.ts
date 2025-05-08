export const getCompany = async (query: string) => {
  try {
    const response = await fetch(`/api/naver-api/news?query=${encodeURIComponent(query)}`)
    const data = await response.json()
    return data.isCompanyTaken // 예시 응답 필드
  } catch (error) {
    console.error('Error fetching company data:', error)
    return false
  }
}
