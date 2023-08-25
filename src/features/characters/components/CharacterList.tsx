import { Flex } from "@mantine/core";
import { CharacterCard } from "./CharacterCard";
import { Character } from "../../../api/api";

export function CharacterList({ characters }: { characters: Character[] }) {
  return (
    <Flex gap="md" direction="row" wrap="wrap">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </Flex>
  );
}
