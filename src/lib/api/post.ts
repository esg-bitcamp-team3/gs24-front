import {handleApiError} from '../util/handleApiError'
import apiClient from './apiclient'
import {interestOrganization} from './interfaces/interestOrganization'

export const postInteresrtOrganization = async (id: string) => {
  try {
    const response = await apiClient.post<string>(`/interestOrganization/${id}`)
    return response.data
  } catch (error) {
    handleApiError(error, '관심기업 등록에 실패했습니다.')
  }
}
