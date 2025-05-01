'use client'

import {Accordion, AccordionItem, Box, Flex, Button, Icon, Text} from '@chakra-ui/react'
import {useRouter} from 'next/navigation'
import {FaNetworkWired, FaRegBuilding} from 'react-icons/fa'
import {FaPeopleGroup} from 'react-icons/fa6'
import {LuChevronDown, LuEarth, LuLeaf, LuNewspaper} from 'react-icons/lu'
import { cursorTo } from 'readline'

export default function SideBar() {
  const router = useRouter()
  return (
    <Flex
      position="fixed"
      top="65px"
      left={0}
      w="250px"
      h="calc(100vh - 65px)"
      bg="#ffffff"
      px={4}
      py={6}
      zIndex={100}
      direction="column">
      <Flex gap={4} direction="column" width="100%">
        <Button
          variant="ghost"
          color="black"
          justifyContent="flex-start"
          onClick={() => router.push('/dashboard/companyInfo')}>
          <Text fontSize="lg" fontWeight="bold">
            <Icon as={FaRegBuilding} boxSize={5} mr={2} />
            기업정보
          </Text>
        </Button>

        <Accordion.Root collapsible variant={'plain'}>
          <Accordion.Item value="item-1">
            <Accordion.ItemTrigger justifyContent={'space-between'} _hover={{bg: 'gray.100', cursor: 'pointer'}} paddingY={2} >
              <Text fontSize="lg" fontWeight="bold" >
                <Icon as={LuEarth} boxSize={5} mr={2} />
                ESG
              </Text >
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>

            <Accordion.ItemContent paddingX={6}>
              <Flex direction="column" gap={2} mt={2}>
                <Button
                  variant="ghost"
                  color="black"
                  justifyContent="flex-start"
                  onClick={() => router.push('/dashboard/environmental')}>
                  Environmental
                </Button>
                <Button
                  variant="ghost"
                  color="black"
                  justifyContent="flex-start"
                  onClick={() => router.push('/dashboard/social')}>
                  Social
                </Button>
                <Button
                  variant="ghost"
                  color="black"
                  justifyContent="flex-start"
                  onClick={() => router.push('/dashboard/governance')}>
                  Governance
                </Button>
              </Flex>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>

        <Button
          variant="ghost"
          color="black"
          justifyContent="flex-start"
          onClick={() => router.push('/dashboard/news')}>
          <Text fontSize="lg" fontWeight="bold">
            <Icon as={LuNewspaper} boxSize={5} mr={2} />
            기업뉴스
          </Text>
        </Button>
      </Flex>
    </Flex>
  )
}
