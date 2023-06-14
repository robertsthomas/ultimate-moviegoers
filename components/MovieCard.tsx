import { Movie } from "@/types";
import { getMovieImage } from "@/utils";
import { Card, Text } from "@chakra-ui/react";
import Image from "next/image";

type MovieCardProps = {
  movie: Movie;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { title } = movie;
  const img = getMovieImage(movie.poster_path);
  return (
    <Card h={350} _hover={{ outline: "4px solid grey", cursor: "pointer" }}>
      <Text>{title}</Text>
      <Image fill src={img} alt="Picture of the author" sizes="300px" />
    </Card>
  );
};
