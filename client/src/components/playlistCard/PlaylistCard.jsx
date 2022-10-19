import React from "react";

const PlaylistCard = ({ name, description, playListImage }) => {
  return (
    <div className="text-white text-center md:bg-grey5  md:px-5 md:py-6 rounded-md">
      <div className="playlist--image md:mb-3">
        <img src={playListImage} alt="" className="rounded-md w-full" />
      </div>
      <div className="playlist--content mt-2 md:text-left">
        <h2 className="md:text-xl md:mb-3">{name}</h2>
        <p className="text-grey overflow-y-auto md:flex hidden">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PlaylistCard;