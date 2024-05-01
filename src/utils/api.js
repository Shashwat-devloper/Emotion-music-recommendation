import axios from "axios";
import { checkUndefinedNull } from "./utils";

export const getEmotionPrediction = async (payload) => {
  const serverUrl = process.env.REACT_APP_SERVER_API_URL;
  const apiEndPoint = "/predict-emotion";
  const url = serverUrl + apiEndPoint;
  try {
    const response = axios({ url, data: payload, method: "POST" });
    return response;
  } catch (error) {
    console.error("Error uploading image: ", error);
  }
};

const getSpotifyAccessToken = async () => {
  try {
    const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const url = process.env.REACT_APP_SPOTIFY_TOKEN_API_URL;
    const response = await axios.post(
      url,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: client_id,
        client_secret: client_secret,
      })
    );
    return response;
  } catch (error) {
    console.log("Unable to fetch access token: ", error);
  }
};

export const fetchSpotifyPlaylists = async ({ query }) => {
  let accessToken = null;
  try {
    const response = await getSpotifyAccessToken();
    if (response?.status === 200) accessToken = response?.data?.access_token;
  } catch (error) {
    console.log("Unable to fetch access token: ", error);
  }
  if (checkUndefinedNull(accessToken)) return null;
  try {
    const url = process.env.REACT_APP_SPOTIFY_SEARCH_API_URL;
    const response = await axios.get(url, {
      params: {
        q: query,
        type: "playlist",
        limit: 10,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching playlists: ", error);
  }
};
