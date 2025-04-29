"use client";

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Input,
  Select,
  Flex,
  Button,
  Text,
  Separator,
} from "@chakra-ui/react";
import { useState } from "react";
import NewsCard from "@/components/news/NewsCard";
import CategorySelector from "@/components/news/CategorySelector";

// Sample news data
const sampleNews = [
  {
    id: "1",
    title: "Renewable Energy Investment Hits Record High",
    summary:
      "Global investments in renewable energy reached a record high of $500 billion in the last quarter, signaling a major shift in energy priorities.",
    date: "2025-04-25",
    imageUrl:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop",
    source: "Clean Energy Report",
    category: "Renewable Energy",
    sourceUrl: "https://naver.com",
  },
  {
    id: "2",
    title: "Major Corporation Announces Carbon Neutrality Goal",
    summary:
      "One of the world's largest corporations has announced plans to achieve carbon neutrality by 2030, setting a new standard for corporate sustainability.",
    date: "2025-04-23",
    imageUrl:
      "https://images.unsplash.com/photo-1611273426858-450e7f08d386?q=80&w=2070&auto=format&fit=crop",
    source: "Business Sustainability",
    category: "Corporate ESG",
    sourceUrl: "https://naver.com",
  },
  {
    id: "3",
    title: "New Biodiversity Protection Framework Launched",
    summary:
      "The International Nature Conservation Alliance has launched a comprehensive framework for biodiversity protection that includes financial incentives for conservation.",
    date: "2025-04-20",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
    source: "Environment Today",
    category: "Biodiversity",
  },
  {
    id: "4",
    title: "ESG Reporting Standards to Be Unified Globally",
    summary:
      "Financial authorities from major economies have agreed to unify ESG reporting standards, bringing much-needed clarity to sustainable investment frameworks.",
    date: "2025-04-18",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    source: "Financial Times",
    category: "ESG Standards",
    sourceUrl: "https://naver.com",
  },
];

const Page = () => {
  const [category, setCategory] = useState("");

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <VStack gap={8} align="stretch">
          <Heading as="h1" size="xl">
            ESG News
          </Heading>
          <Text color="gray.600">
            Stay updated with the latest developments in environmental, social,
            and governance topics.
          </Text>

          <Separator />

          <CategorySelector value={category} onChange={setCategory} />

          {/* News list */}
          {sampleNews.length > 0 ? (
            <VStack gap={4} align="stretch">
              {sampleNews.map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </VStack>
          ) : (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg">No news found matching your criteria.</Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Page;
