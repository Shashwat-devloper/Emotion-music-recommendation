import React from "react";
import { checkUndefinedNull } from "../utils/utils";

const PlaylistLink = ({ urlObj }) => {
  let hrefLink = null;
  if (!checkUndefinedNull(urlObj?.spotify)) {
    hrefLink = urlObj.spotify;
  }

  return (
    <div className="playlistLink-wrapper">
      {!checkUndefinedNull(hrefLink) ? (
        <a href={hrefLink} target="_blank" className="playlistLink-text">
          Link to Playlist
        </a>
      ) : (
        <span>--</span>
      )}
    </div>
  );
};

export default PlaylistLink;
