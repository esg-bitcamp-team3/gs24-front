import {handleApiError} from '../util/handleApiError'
import apiClient from './apiclient'

export const deleteInterestOrganization = async (id: string) => {
  try {
    const response = await apiClient.delete(`/interestOrganization/${id}`)
    return response.data
  } catch (error) {
    handleApiError(error, '관심기업 삭제에 실패했습니다.')
  }
}
