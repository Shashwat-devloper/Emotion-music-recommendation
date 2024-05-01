import React from "react";
import ResultLoader from "./ResultsLoader";
import { useAppManagerContext } from "../App";

const EmotionResult = () => {
  const { emotionLoading, capturedEmotion } = useAppManagerContext();

  return (
    <>
      {emotionLoading ? (
        <ResultLoader title="Fetching Results" />
      ) : (
        capturedEmotion && (
          <div className="emotionResult-wrapper">
            <div>
              <span>Predicted Emotion:</span>
            </div>
            <div className="emotionResult-value">
              <span>{capturedEmotion}</span>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default EmotionResult;
