import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLikedPlaylists } from "api/playlists";
import { addSongToLikedPlaylist, removeSongFromLikedPlaylist } from "api/songs";
import Icon from "components/icons";
import { useEffect } from "react";

import toast from "react-hot-toast";

const AddRemoveLikedSongs = ({ song }) => {
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingLikedSongs,
    isError: isErrorLikedSongs,
    data: likedSongs,
    error: likedSongsError,
  } = useQuery(["liked-songs"], getLikedPlaylists);

  const addToLikedSongs = useMutation(addSongToLikedPlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["liked-songs"]);
      toast.success(`Add  ${song.title} to liked songs`);
    },
    onError: (err) => {
      toast.error(err.response.data.errorMsg);
    },
  });

  const removeFromLikedSongs = useMutation(removeSongFromLikedPlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["liked-songs"]);
      toast.success(`Remove  ${song.title} to liked songs`);
    },
    onError: (err) => {
      toast.error(err.response.data.errorMsg);
    },
  });

  const isLiked = likedSongs?.find((likedSong) => likedSong._id === song._id);

  return (
    <>
      {isLiked ? (
        <span
          className="cursor-pointer"
          onClick={() => removeFromLikedSongs.mutate(song._id)}
        >
          <Icon name={"heartFilled"} size={24} color={"#fff"} />
        </span>
      ) : (
        <span
          className="cursor-pointer"
          onClick={() => addToLikedSongs.mutate(song._id)}
        >
          <Icon name={"heart"} size={24} color={"#fff"} />
        </span>
      )}
    </>
  );
};

export default AddRemoveLikedSongs;