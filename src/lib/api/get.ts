import {handleApiError} from '../util/handleApiError'
import apiClient from './apiclient'
import {
  OrganizationInfoResponse,
  OrganizationRank
} from './interfaces/interestOrganization'

export async function getOrganizationInfo(id: string) {
  try {
    const response = await apiClient.get<string>('/organizations/{id}')
    return response.data
  } catch (error) {
    handleApiError(error, '조직 정보를 가져오는 데 실패했습니다.')
  }
}

export async function getInterestOrganization() {
  try {
    const response = await apiClient.get<OrganizationInfoResponse>(
      '/interestOrganization'
    )
    return response.data
  } catch (error) {
    handleApiError(error, '조직 정보를 가져오는 데 실패했습니다.')
  }
}

export async function getOrganizationRank() {
  try {
    const response = await apiClient.get<OrganizationRank[]>('/ranking/score')
    return response.data
  } catch (error) {
    handleApiError(error, '기업 정보를 가져오는 데 실패했습니다.')
  }
}
