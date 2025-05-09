'use client'

import CompanyInfoCard from '@/components/company/CompanyDetailCard'
import {Box} from '@chakra-ui/react'
import { use } from 'react'

interface Props {
  params: Promise<{id: string}>
}

const CompanyInfo = ({params}: Props) => {
  const {id} = use(params)
  
  return <CompanyInfoCard orgId={id} />
}

export default CompanyInfo