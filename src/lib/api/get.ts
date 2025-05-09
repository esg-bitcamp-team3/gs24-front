import {handleApiError} from '../util/handleApiError'
import apiClient from './apiclient'
import {LoginForm, SignupForm} from './interfaces/auth'
import { EsgRatingResponse } from './interfaces/esgRating'
import { Company } from './interfaces/organizations'

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
      const response = await apiClient.get<EsgRatingResponse>(`/esg-ratings/${organizationId}`)
      console.log("response", response);
      
      return response.data
    } catch (error) {
      handleApiError(error, 'getEsgRatingByOrganization')
    }
  }