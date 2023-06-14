"use client";

import React, { useEffect, useState } from "react";
import { Movie } from "@/types";
import { getMovieImage } from "@/utils";
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

type Params = {
  params: { movieId: string };
};

async function getMovie(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((data) => data.json());

  return res;
}

export default function MoviePage({ params: { movieId } }: Params) {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const img = currentMovie && getMovieImage(currentMovie?.poster_path);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const movie = await getMovie(movieId);
      setCurrentMovie(movie);
    })();
  }, [movieId]);

  const handleBackClick = () => router.back();

  return (
    <Box bgColor={"gray.100"} h={"100vh"} py={20}>
      <IconButton
        onClick={handleBackClick}
        aria-label="back button"
        fontSize={30}
        ml={"10%"}
        mb={30}
        icon={<ArrowBackIcon />}
      />

      <Container maxWidth={"container.lg"}>
        {currentMovie && (
          <Box w="full">
            <Heading as="h2">{currentMovie.title}</Heading>
            <Stack direction="row" h="50x" p={4} alignItems={"center"}>
              {currentMovie.genres.map((genre, idx) => (
                <React.Fragment key={genre.id}>
                  {idx !== 0 && <>|</>}
                  <Text>{genre.name}</Text>
                </React.Fragment>
              ))}
              <Text fontSize={18} ml={10}>
                Rating: <b>{Math.floor(currentMovie.vote_average * 10)}%</b>
              </Text>
            </Stack>
            <Stack gap={10}>
              <Image
                width={400}
                height={400}
                src={img!}
                alt="Picture of the author"
              />
              <Flex direction="column" gap={2}>
                <Text fontSize={20} as="b">
                  Overview:
                </Text>
                <Text>{currentMovie.overview}</Text>
              </Flex>
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}
