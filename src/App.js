import React, { createContext, useContext, useState } from "react";
import Header from "./components/Header";
import ImageFileProvider from "./components/ImageFileProvider";
import EmotionResult from "./components/EmotionResult";
import SpotifyPlaylistResult from "./components/SpotifyPlaylistResult";
import "./css/app.css";

const AppManagerContext = createContext();

const App = () => {
  const [capturedEmotion, setCapturedEmotion] = useState(null);
  const [emotionLoading, setEmotionLoading] = useState(false);

  const fetchCapturedEmotion = (value) => setCapturedEmotion(value);

  const contextValueObj = {
    capturedEmotion,
    emotionLoading,
    setCapturedEmotion: fetchCapturedEmotion,
    setEmotionLoading,
  };

  return (
    <div className="mainApp-wrapper">
      <AppManagerContext.Provider value={contextValueObj}>
        <Header />
        <ImageFileProvider />
        <EmotionResult />
        <SpotifyPlaylistResult />
      </AppManagerContext.Provider>
    </div>
  );
};

export const useAppManagerContext = () => {
  const ctx = useContext(AppManagerContext);
  if (!ctx)
    throw new Error(
      "useAppManagerContext Hook should only be invoked from a child Component of <App />"
    );
  return ctx;
};

export default App;
