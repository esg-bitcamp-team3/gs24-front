'use client'

import {Button} from '@chakra-ui/react'

import React, {useEffect, useState} from 'react'

import {postInteresrtOrganization} from '@/lib/api/post'
import {deleteInterestOrganization} from '@/lib/api/delete'
import {InterestButtonProps} from '@/lib/api/interfaces/interestOrganization'
import {FcLikePlaceholder} from 'react-icons/fc'
import {FcLike} from 'react-icons/fc'

const InterestButton = ({orgId, interest}: InterestButtonProps) => {
  const [isInterested, setIsInterested] = useState(interest)

  const handleClick = async () => {
    try {
      if (isInterested) {
        await deleteInterestOrganization(orgId)
        console.log('관심기업 삭제 성공')
        setIsInterested(false)
      } else {
        await postInteresrtOrganization(orgId)
        console.log('관심기업 등록 성공')
        setIsInterested(true)
      }
    } catch (error) {
      console.error('관심기업 처리 실패:', error)
    }
  }

  return (
    <Button color="black" bg="white" onClick={handleClick}>
      {isInterested ? <FcLike /> : <FcLikePlaceholder />}
    </Button>
  )
}

export default InterestButton
