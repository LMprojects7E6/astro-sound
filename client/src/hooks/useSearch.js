import { getSongs } from "api/songs";
import { useQuery } from "@tanstack/react-query";

function useSearchSongs(searchText, songs) {
  const keys = ["album", "artist", "genre", "title"];
  const search = searchText.toLowerCase();

  const {
    isLoading,
    isError,
    data: dataAllSongs,
  } = useQuery(["getAllSongs"], getSongs);

  const data =
    songs?.length > 0 ? songs : !isLoading && !isError ? dataAllSongs : [];

  if (isLoading) {
    return [];
  }
  if (isError) {
    return [];
  }

  return search.length >= 3
    ? data?.filter((song) =>
        keys.some((key) => String(song[key]).toLowerCase().includes(search))
      )
    : [];
}

export default useSearchSongs;
