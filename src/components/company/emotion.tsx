import {Box, Flex} from '@chakra-ui/react'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {IoMdThumbsUp} from 'react-icons/io'

interface EmotionCardProps {
  negatives: number
  positives: number
}
interface Props {
  orgname: string
}
const EmotionCard = ({orgname}: Props) => {
  const [response, setResponse] = useState<EmotionCardProps>({negatives: 0, positives: 0})
  const {negatives, positives} = response
  const [emotion, setEmotion] = useState(false)
  const getContent: number = 10
  const result =
    negatives > positives ? negatives / (getContent * 3) : positives / (getContent * 3)
  const result_cal = (result * 100).toFixed(0)

  const getEmotion = async () => {
    try {
      const response = await axios.get(
        `http://localhost/search/search/sentiment?query=${orgname}`
      )
      console.log('em', response.data)
      setResponse(response.data.result)
      setEmotion(response.data.result.positives > response.data.result.negatives)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    getEmotion()
  }, [])

  return (
    <>
      <Flex direction="row" gap={4} width={'full'} h="full" alignItems="center">
        <Box
          p={3}
          borderRadius="lg"
          boxShadow="lg"
          w="md"
          backgroundColor="white"
          position="relative">
          <Flex w="full" direction="row" gap={4} alignItems="center">
            {emotion ? (
              <>
                <IoMdThumbsUp size={48} color="blue" />
                <Box fontSize={32} color={'blue'}>
                  긍정 {result_cal} %
                </Box>
              </>
            ) : (
              <>
                <IoMdThumbsUp
                  size="48"
                  color="red"
                  style={{transform: 'rotate(180deg)'}}
                />
                <Box fontSize={24} color={'red'}>
                  부정 {result_cal} %
                </Box>
              </>
            )}
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default EmotionCard
