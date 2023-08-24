import { useQuery } from "@tanstack/react-query";
import { CharacterCard } from "./CharacterCard";
import { queryKeys } from "../../../api/api";

export function CharacterList() {
  const {isLoading, error, data} = useQuery(queryKeys.characters.list());

  if (isLoading) return <>Loading characters...</>;

  if (error) return <>`An error has occurred: ${error.message}`</>;

  return (
    <div>
      {data.map(character => (<CharacterCard character={character} />))}
    </div>
  )
}
