import { useQuery } from "@tanstack/react-query";
import * as R from "ramda";
import { Box, LoadingOverlay } from "@mantine/core";
import { CharacterTable } from "./CharacterTable";
import { queryKeys } from "../../../api/api";
import { useState } from "react";
import { useEvent } from "../../../utils/useEvent";

export function CharactersPage() {
  const { data, totalPages, currPage, isLoading, gotoPage } = useCharactersDataSource();

  return (
    <Box>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      {!isLoading && <CharacterTable 
        characters={data || []} 
        totalPages={totalPages} 
        activePage={currPage}
        onPaginationChange={gotoPage}
      />}
    </Box>
  );
}

function useCharactersDataSource() {
  const [currPage, setCurrPage] = useState(0);

  const { isLoading, error, data } = useQuery(queryKeys.characters.list({
    page: currPage,
  }));

  const {
    results,
    info: { count, pages, next, prev },
  } = data ?? {
    results: [],
    info: { count: 0, pages: 0, next: null, prev: null },
  };

  const gotoNext = useEvent(() => {
    if (R.isNil(next)) return;
    setCurrPage((page) => page + 1);
  });

  const gotoPrev = useEvent(() => {
    if (R.isNil(prev)) return;
    setCurrPage((page) => Math.max(page - 1, 0));
  });

  const gotoPage = useEvent((pageNum: number) => {
    setCurrPage(pageNum);
  });

  return {
    isLoading,
    error,
    totalPages: pages,
    count,
    data: results,
    currPage,
    gotoNext,
    gotoPrev,
    gotoPage,
  };
}

