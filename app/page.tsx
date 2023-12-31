"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { MovieCard } from "@/components/MovieCard";
import { Movie } from "@/types";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Select,
  Spinner,
} from "@chakra-ui/react";
import swr from "swr";
import { ArrowUpIcon, Search2Icon } from "@chakra-ui/icons";
import { MovieSearchModal } from "@/components/MovieSearchModal";
import Link from "next/link";

export default function Home() {
  const [filter, setFilter] = useState("now_playing");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetcher = (url: string) => fetch(url).then((data) => data.json());
  const { data, isLoading } = swr(
    `https://api.themoviedb.org/3/movie/${filter}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter(value);
  };

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollButtonThreshold = 200; // Adjust this value to control when the button appears
    setShowScrollButton(scrollTop > scrollButtonThreshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Box bgColor={"gray.100"} minHeight={"100vh"} display={"flex"} py={20}>
      <Container maxW={"container.lg"} pt={10}>
        <Flex direction={"row"} justifyContent={"space-between"}>
          <Box>
            <Heading>Ultimate Moviegoers</Heading>
          </Box>
          <HStack gap={10}>
            <IconButton
              onClick={() => setIsModalOpen(true)}
              aria-label="search button"
              icon={<Search2Icon />}
              size={"md"}
              colorScheme="blue"
              variant="solid"
            />
            <Select
              variant={"filled"}
              w={"130"}
              borderRadius={0}
              defaultValue={filter}
              onChange={handleFilterChange}
            >
              <option value="now_playing">Now Playing</option>
              <option value="popular">Popular</option>
              <option value="top_rated">Top Rated</option>
            </Select>
          </HStack>
        </Flex>

        {isLoading && <Spinner />}
        <Box pt={10}>
          {!isLoading && data.results.length && (
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              {data.results.map((movie: Movie) => (
                <GridItem key={movie.id}>
                  <Link href={`/movie/${movie.id}`}>
                    <MovieCard key={movie.id} movie={movie} />
                  </Link>
                </GridItem>
              ))}
            </Grid>
          )}
        </Box>
      </Container>

      {showScrollButton && (
        <IconButton
          aria-label="scroll up button"
          onClick={scrollToTop}
          position="fixed"
          bottom={10}
          right={10}
          size="lg"
          colorScheme="teal"
          fontSize={30}
          icon={<ArrowUpIcon />}
        />
      )}

      <MovieSearchModal isOpen={isModalOpen} />
    </Box>
  );
}
