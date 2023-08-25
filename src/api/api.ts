import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum Species {
  Human = "human",
}

export enum CharacterStatus {
  Alive = "Alive",
}

export interface Location {
  name: string;
  url: string;
}

export interface Character {
  created: string;
  episode: string[];
  gender: Gender;
  id: number;
  image: string;
  location: Location;
  name: string;
  origin: Location;
  species: Species;
  status: CharacterStatus;
  type: string;
  url: string;
}

export interface ResponseInfo {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

export interface CharacterResponse {
  info: ResponseInfo;
  results: Character[];
}

const api = {
  getCharacters: ({ page }: { page: number }) =>
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`).then((resp) => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      return resp.json() as Promise<CharacterResponse>;
    }),
  getLocations: () => fetch("https://rickandmortyapi.com/api/location"),
  getEpisodes: () => fetch("https://rickandmortyapi.com/api/episode"),
};

export const charactersKeys = createQueryKeys("characters", {
  detail: null,
  list: (filters: { page: number }) => ({
    queryKey: [{ filters }],
    queryFn: () => api.getCharacters({ page: filters.page }),
  }),
});

export const locationsKeys = createQueryKeys("locations");
export const episodes = createQueryKeys("episodes");

export const queryKeys = mergeQueryKeys(
  charactersKeys,
  locationsKeys,
  episodes,
);
