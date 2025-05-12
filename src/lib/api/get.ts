import {handleApiError} from '../util/handleApiError'
import apiClient from './apiclient'
import {CompanyInfo} from './interfaces/companyinfo'

import {EsgRatingResponse} from './interfaces/esgRating'
import {
  OrganizationInfoResponse,
  OrganizationRank
} from './interfaces/interestOrganization'

export const getOrganizations = async () => {
  try {
    const res = await apiClient.get('/organizations')
    return res.data
  } catch (err) {
    console.error('❌ 회사 목록 가져오기 실패:', err)
    throw err
  }
}

export async function getEsgRatingByOrganization(organizationId: string) {
  try {
    const response = await apiClient.get<EsgRatingResponse>(
      `/esg-ratings/${organizationId}`
    )
    console.log('response', response)

    return response.data
  } catch (error) {
    handleApiError(error, 'getEsgRatingByOrganization')
  }
}

export async function getOrganizationInfo(id: string) {
  try {
    const response = await apiClient.get<string>(`/organizations/${id}`)
    return response.data
  } catch (error) {
    handleApiError(error, '기업 정보를 가져오는 데 실패했습니다.')
  }
}

export async function getInterestOrganization() {
  try {
    const response = await apiClient.get<OrganizationInfoResponse>(
      '/interestOrganization'
    )
    return response.data
  } catch (error) {
    handleApiError(error, '관심기업 정보를 가져오는 데 실패했습니다.')
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

export async function getCompanyInfo(id: string) {
  try {
    const response = await apiClient.get<CompanyInfo>(`/company/${id}`)
    return response.data
  } catch (error) {
    handleApiError(error, '기업 정보를 가져오는 데 실패했습니다.')
  }
}
