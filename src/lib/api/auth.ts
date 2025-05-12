import {handleApiError} from '../util/handleApiError'
import apiClient from './apiclient'
import {LoginForm, SignupForm} from './interfaces/auth'

export async function signup(data: Partial<SignupForm>) {
  try {
    const response = await apiClient.post<string>('/auth/signup', data)
    return response.data
  } catch (error) {
    handleApiError(error, '회원가입에 실패했습니다.')
  }
}

export async function login(data: Partial<LoginForm>) {
  try {
    const response = await apiClient.post<string>('/auth/login', data)
    return response.data
  } catch (error: any) {
    if (error.response?.status === 401) {
      handleApiError(error, '이메일 또는 비밀번호가 잘못되었습니다.')
    } else {
      handleApiError(error, '로그인에 실패했습니다.')
    }
  }
}

export async function logout() {
  try {
    const response = await apiClient.post<string>('/auth/logout')
    return response.data
  } catch (error) {
    handleApiError(error, '로그아웃에 실패했습니다.')
  }
}

export async function checkLogin() {
  try {
    const response = await apiClient.get('/user/check')
    console.log('checkLogin response:', response)
    return response.data
  } catch (error) {
    // handleApiError(error, '로그인이 필요합니다.')
    return false
  }
}
