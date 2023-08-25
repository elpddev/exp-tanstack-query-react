import { Table, Image, Box, Anchor, Stack, Pagination } from "@mantine/core";
import { Character } from "../../../api/api";
import { useMemo } from "react";

interface ITableHheader {
  content: string;
}

const headers = [
  {
    content: "id",
  },
  {
    content: "name",
  },
  {
    content: "status",
  },
  {
    content: "species",
  },
  {
    content: "type",
  },
  {
    content: "gender",
  },
  {
    content: "origin",
  },
  {
    content: "location",
  },
  {
    content: "image",
  },
  {
    content: "episode",
  },
  {
    content: "created",
  },
];

export function CharacterTable({
  characters,
  activePage,
  totalPages,
  onPaginationChange,
}: {
  characters: Character[];
  activePage: number;
  totalPages: number;
  onPaginationChange: (pageNum: number) => void;
}) {
  return (
    <Box>
      <Table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <TableHeader key={index} header={header} />
            ))}
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <CharacterRow key={character.id} character={character} />
          ))}
        </tbody>
      </Table>

      <Pagination value={activePage} onChange={onPaginationChange} total={totalPages} />
    </Box>
  );
}

function TableHeader({ header }: { header: ITableHheader }) {
  return <th>{header.content}</th>;
}

function CharacterRow({ character }: { character: Character }) {
  return (
    <tr>
      <td>{character.id}</td>
      <td>{character.name}</td>
      <td>{character.status}</td>
      <td>{character.species}</td>
      <td>{character.type}</td>
      <td>{character.gender}</td>
      <td>{character.origin.name}</td>
      <td>{character.location.name}</td>
      <td>
        <Image
          maw={24}
          mx="auto"
          radius="md"
          src={character.image}
          alt="image"
        />
      </td>
      <td>
        <EpisodeListBox episodes={character.episode} />
      </td>
      <td>{character.created}</td>
    </tr>
  );
}

const episodePattern = new RegExp("episode\\/(\\d+)");

function EpisodeBox({ episode }: { episode: string }) {
  const id = useMemo(() => {
    const match = episode.match(episodePattern);
    return match ? match[1] : null;
  }, [episode]);

  return (
    <Anchor href={episode} target="_blank">
      Episode {id}
    </Anchor>
  );
}

function EpisodeListBox({ episodes }: { episodes: string[] }) {
  return (
    <Box sx={{ height: "24px", overflow: "auto" }}>
      <Stack>
        {episodes.map((episode, index) => (
          <EpisodeBox key={index} episode={episode} />
        ))}
      </Stack>
    </Box>
  );
}
