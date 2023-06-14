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
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";

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

  useEffect(() => {
    (async () => {
      const movie = await getMovie(movieId);
      setCurrentMovie(movie);
    })();
  }, [movieId]);

  console.log(currentMovie);

  return (
    <Container maxWidth={"container.lg"}>
      {currentMovie && (
        <Box w="full" py={20}>
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
  );
}
