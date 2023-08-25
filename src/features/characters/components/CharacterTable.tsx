import { Table, Image } from "@mantine/core";
import { Character } from "../../../api/api";

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

export function CharacterTable({ characters }: { characters: Character[] }) {
  return (<Table>
    <thead>
      <tr>
        {headers.map((header, index) => (<TableHeader key={index} header={header} />))}
      </tr>
    </thead>
    <tbody>
      {characters.map((character) => <CharacterRow key={character.id} character={character} />)}
    </tbody>
  </Table>);
}

function TableHeader({ header }: {
  header: ITableHheader,
}) {
  return (<th>{header.content}</th>);
}

function CharacterRow({ character }: {
  character: Character,
}) {
  return (<tr>
    <td>{character.id}</td>
    <td>{character.name}</td>
    <td>{character.status}</td>
    <td>{character.species}</td>
    <td>{character.type}</td>
    <td>{character.gender}</td>
    <td>{character.origin.name}</td>
    <td>{character.location.name}</td>
    <td>
          <Image maw={240} mx="auto" radius="md" src={character.image} alt="image" />
    </td>
    <td>{character.episode.toString()}</td>
    <td>{character.created}</td>
  </tr>);
}
