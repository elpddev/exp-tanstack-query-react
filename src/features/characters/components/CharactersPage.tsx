import { useQuery } from "@tanstack/react-query";
import { Box, LoadingOverlay } from "@mantine/core";
import { CharacterTable } from "./CharacterTable";
import { queryKeys } from "../../../api/api";

export function CharactersPage() {
  const { data, isLoading } = useCharactersDataSource();

  return (
    <Box>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      {!isLoading && <CharacterTable characters={data || []} />}
    </Box>
  );
}

function useCharactersDataSource() {
  const { isLoading, error, data } = useQuery(queryKeys.characters.list([]));

  return {
    isLoading,
    error,
    data,
  };
}
