'use client'
import {getOrganizationsWithInterest} from '@/lib/api/get'
import {OrganizationWithInterest} from '@/lib/api/interfaces/organizations'
import {Box, Button, Input, Dialog, Portal, Text} from '@chakra-ui/react'
import {useRouter} from 'next/navigation'
import React, {ReactNode, useCallback, useEffect, useRef, useState} from 'react'
import {LuSearch} from 'react-icons/lu'
import InterestButton from '../etcs/InterestButton'

interface SearchOrgProps {
  label: ReactNode
}

const SearchOrg = ({label}: SearchOrgProps) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [companyList, setCompanyList] = useState<OrganizationWithInterest[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const [loading, setLoading] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const handleCompanyClick = (companyId: string) => {
    setIsOpen(false)
    router.push(`/dashboard/companyInfo/${companyId}`)
  }

  const filteredCompanies =
    searchTerm === ''
      ? companyList
      : companyList.filter(company =>
          company.organization.companyName
            .trim()
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
        )

  const loadCompanies = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const data = await getOrganizationsWithInterest(page) // 서버에서 page별 로딩
      setCompanyList(prev => [...prev, ...data.organizationWithInterestDTOList])
      setHasMore(data.hasMore)
      setPage(prev => prev + 1)
    } catch (error) {
      console.error('Error fetching companies:', error)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore])
  useEffect(() => {
    if (isOpen) {
      // 다이얼로그 열리면 초기화
      setSearchTerm('')
      setPage(0)
      setCompanyList([])
      setHasMore(true)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && companyList.length === 0 && page === 0) {
      // 초기 데이터 로딩
      loadCompanies()
    }

    if (!scrollContainerRef.current || !observerRef.current || !isOpen) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadCompanies()
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: 1.0
      }
    )

    observer.observe(observerRef.current)

    return () => observer.disconnect()
  }, [isOpen, companyList.length, page, loadCompanies, loading, hasMore])

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={details => setIsOpen(details.open)}
      scrollBehavior={'inside'}
      placement="center">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" padding={3}>
          {label}
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content padding={4}>
            <Dialog.Header>
              <Input
                paddingLeft={3}
                marginBottom={3}
                placeholder="search"
                value={searchTerm}
                onChange={e => setSearchTerm((e.target as HTMLInputElement).value)}
              />
            </Dialog.Header>

            <Dialog.Body pt="4">
              <Box height={300} overflowY="scroll" ref={scrollContainerRef}>
                {filteredCompanies.length === 0 ? (
                  <Text color="gray.500" textAlign="center">
                    No companies found.
                  </Text>
                ) : (
                  filteredCompanies.map(company => (
                    <Box key={company.organization.id} display="flex" w="90%">
                      <Button
                        paddingLeft={3}
                        variant="ghost"
                        color="black"
                        justifyContent="flex-start"
                        onClick={() => handleCompanyClick(company.organization.id)}
                        w={'100%'}>
                        {company.organization.companyName}
                      </Button>
                      <InterestButton
                        orgId={company.organization.id}
                        interest={company.interested}
                      />
                    </Box>
                  ))
                )}
                {/* 스크롤 끝 감지 트리거 */}
                <Box ref={observerRef} h={'5%'} />
                {loading && (
                  <Text textAlign="center" color="gray.500">
                    Loading...
                  </Text>
                )}
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" marginTop={3} padding={3}>
                  Close
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
export default SearchOrg
