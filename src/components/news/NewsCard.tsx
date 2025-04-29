import {
  Box,
  Card,
  Image,
  Stack,
  Text,
  Badge,
  Flex,
  Heading,
} from "@chakra-ui/react";

interface NewsCardProps {
  id: string;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  source: string;
  category: string;
  sourceUrl?: string;
}

const NewsCard = ({
  id,
  title,
  summary,
  date,
  imageUrl,
  source,
  category,
  sourceUrl,
}: NewsCardProps) => {
  const handleClick = () => {
    if (sourceUrl) {
      window.open(sourceUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card.Root
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      variant="outline"
      _hover={{
        boxShadow: "lg",
        transform: "translateY(-2px)",
        transition: "all 0.2s ease-in-out",
        cursor: sourceUrl ? "pointer" : "default",
      }}
      padding={4}
      onClick={handleClick}
      flexDirection="row"
      height="sm"
    >
      <Box w="full">
        <Card.Header pb={0}>
          <Heading size="md">{title}</Heading>
        </Card.Header>

        <Card.Body pt={2}>
          <Text>{summary}</Text>
        </Card.Body>

        <Card.Footer pt={0}>
          <Text fontSize="sm" color="gray.500">
            Source: {source}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {date}
          </Text>
        </Card.Footer>
      </Box>
      <Image
        objectFit="cover"
        maxW={{ base: "100%", md: "200px" }}
        src={imageUrl}
        alt={title}
      />
    </Card.Root>
  );
};

export default NewsCard;
