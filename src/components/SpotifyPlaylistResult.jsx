import React, { useEffect, useState } from "react";
import { message } from "antd";
import ResultLoader from "./ResultsLoader";
import { useAppManagerContext } from "../App";
import { fetchSpotifyPlaylists } from "../utils/api";
import { checkUndefinedNull } from "../utils/utils";
import SpotifyPlaylistTable from "./SpotifyPlaylistTable";

const SpotifyPlaylistResult = () => {
  const [spotifyLoading, setSpotifyLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const { capturedEmotion } = useAppManagerContext();

  const getSpotifyData = async () => {
    try {
      setSpotifyLoading(true);
      const payload = {
        query: capturedEmotion,
      };
      const response = await fetchSpotifyPlaylists(payload);
      if (checkUndefinedNull(response)) {
        message.error("Unable to fetch spotify access token.");
        return;
      }
      if (
        response?.status === 200 &&
        !checkUndefinedNull(response?.data?.playlists?.items)
      ) {
        setPlaylists(response?.data?.playlists?.items);
      } else {
        message.error("Unable to fetch spotify playlists.");
      }
    } catch (err) {
      message.error(err || "Unable to fetch prediction!");
    } finally {
      setSpotifyLoading(false);
    }
  };

  useEffect(() => {
    if (!checkUndefinedNull(capturedEmotion)) getSpotifyData();
  }, [capturedEmotion]);

  return (
    <>
      {capturedEmotion &&
        (spotifyLoading ? (
          <ResultLoader title="Fetching Spotify Playlists" />
        ) : (
          <div className="spotifyPlaylist-wrapper">
            {playlists.length > 0 ? (
              <SpotifyPlaylistTable playlists={playlists} />
            ) : (
              <div className="spotifyPlaylist-noData">
                <span>Oops! No Playlist Found!</span>
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default SpotifyPlaylistResult;
