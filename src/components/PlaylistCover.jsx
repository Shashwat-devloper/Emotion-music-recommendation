import React from "react";
import { checkUndefinedNull } from "../utils/utils";

const PlaylistCover = ({ imagesArr }) => {
  let imgSrc = null;
  if (!checkUndefinedNull(imagesArr)) {
    imgSrc = imagesArr[0]?.url;
  }

  return (
    <div className="playlistCover-wrapper">
      {!checkUndefinedNull(imgSrc) ? (
        <img src={imgSrc} className="playlistCover-img" />
      ) : (
        <span>--</span>
      )}
    </div>
  );
};

export default PlaylistCover;
