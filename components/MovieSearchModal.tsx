import { PhoneIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Center,
  Spinner,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";
import swr from "swr";
import { MovieCard } from "./MovieCard";
import { Movie } from "@/types";
import Link from "next/link";

export const MovieSearchModal = ({ isOpen }: { isOpen: boolean }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const fetcher = (url: string) => fetch(url).then((data) => data.json());
  const { data, isLoading } = swr(
    `
    https://api.themoviedb.org/3/search/movie?api_key=f3c507998cbb0454425758a0eddd7ba9&query=${searchQuery}`,
    fetcher
  );

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchQuery(value);
  };

  return (
    <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent
        minWidth="90%"
        height="85%"
        bgColor={"gray.50"}
        overflowY={"scroll"}
      >
        <ModalHeader>Search Movie</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.400" />
            </InputLeftElement>
            <Input
              type="text"
              width={"30%"}
              variant={"filled"}
              placeholder="Enter a movie title"
              onChange={handleInputChange}
            />
          </InputGroup>

          <Box>
            {!data?.results.length && searchQuery && !isLoading && (
              <Center height={"400px"}>
                <Text>No movies available. Try another search</Text>
              </Center>
            )}
            {isLoading && (
              <Center height={"400px"}>
                <Spinner />
              </Center>
            )}

            <Box py={14}>
              {!isLoading && data.results && (
                <Grid templateColumns="repeat(6, 1fr)" gap={6}>
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
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
