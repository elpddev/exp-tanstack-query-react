import { Card } from "@mantine/core";
import { Character } from "../../../api/api";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <Card>
      <Card.Section>{character.name} a</Card.Section>
    </Card>
  );
}
