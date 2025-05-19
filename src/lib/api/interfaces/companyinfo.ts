import {interestOrganization} from './interestOrganization'

export interface CompanyInfo {
  companyName: string
  industry: string // 산업
  numberOfEmployees: string // 사원수
  companyType: string // 기업 구분 (ex. 대기업, 중소기업 등)
  establishmentDate: string // 설립일
  capital: string // 자본금 (단위: 원)
  ceoName: string // 대표자
  graduateSalary: string // 대졸 초임 (연봉 또는 월급)
  mainBusiness: string // 주요 사업
  hasFourInsurances: string // 4대 보험 가입 여부
  homepage: string // 홈페이지 URL
  address: string // 본사 주소
  affiliates: string[] // 계열사 목록
  revenue: string // 매출액
}

export interface InterestCompanyInfo {
  interestOrganization: interestOrganization
  companyInfo: CompanyInfo
}

export interface CompanyOverview {
  id: string
  status: string
  message: string
  corp_code: string
  corp_name: string
  corp_name_eng: string
  stock_name: string
  stock_code: string
  ceo_nm: string
  corp_cls: string
  jurir_no: string
  bizr_no: string
  adres: string
  hm_url: string
  ir_url: string
  phn_no: string
  fax_no: string
  induty_code: string
  est_dt: string
  acc_mt: string
}
