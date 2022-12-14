import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToSearchedSongs } from "api/songs";
import { MusicPlayerContext } from "context/MusicPlayerProvider";
import { useContext } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";

const ResultContainer = ({ setShowModal, song }) => {
  const { setMusicPlayer } = useContext(MusicPlayerContext);

  const queryClient = useQueryClient();

  const saveSearchedSong = useMutation(addToSearchedSongs, {
    onSuccess: () => {
      queryClient.invalidateQueries(["searchedSongs"]);
    },
    onError: (err) => {
      toast.error(err.response.data.errorMsg);
    },
  });

  const handelClick = (e) => {
    setMusicPlayer([song]);
    saveSearchedSong.mutate(song._id);
    setShowModal(false);
  };
  return (
    <div
      className="cursor-pointer flex flex-row ml-5 mr-5  border-2 border-black space-around  items-center bg-purple3  max-w-full "
      onClick={(e) => handelClick(e)}
    >
      <div
        className=" z-0 m-2 w-16 h-16   bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${song.songImage})` }}
      ></div>
      <div className=" grow flex flex-col justify-between  ">
        <h5 className="  w-max font-bold tracking-tight dark:text-white">
          {song.title}
        </h5>
        <p className=" text-white">{song.artist}</p>
      </div>
    </div>
  );
};

export default ResultContainer;
