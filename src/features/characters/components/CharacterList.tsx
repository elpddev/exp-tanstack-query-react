import {Flex, LoadingOverlay} from '@mantine/core';
import { useQuery } from "@tanstack/react-query";
import { CharacterCard } from "./CharacterCard";
import { queryKeys } from "../../../api/api";

export function CharacterList() {
  const {isLoading, error, data} = useQuery(queryKeys.characters.list([]));

  if (error) return <>`An error has occurred: ${error.message}`</>;

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Flex gap="md" direction="row" wrap="wrap">
        {data?.map((character) => (<CharacterCard key={character.id} character={character} />))}
      </Flex>
    </>
  )
}
