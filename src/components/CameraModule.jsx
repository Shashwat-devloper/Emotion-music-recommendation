import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Button, message } from "antd";
import { checkUndefinedNull, dataURItoBlob } from "../utils/utils";
import { getEmotionPrediction } from "../utils/api";
import { useAppManagerContext } from "../App";

const CameraModule = ({ setImgProvider }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const { setCapturedEmotion, setEmotionLoading } = useAppManagerContext();

  const captureImg = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const resetImg = () => {
    setImgSrc(null);
  };

  const uploadImg = async () => {
    try {
      setImgProvider(null);
      setEmotionLoading(true);
      const blob = dataURItoBlob(imgSrc);
      const formData = new FormData();
      formData.append("image", blob);
      const { data } = await getEmotionPrediction(formData);
      if (data?.status) {
        setCapturedEmotion(data?.data);
      } else {
        message.error(data?.message);
      }
    } catch (err) {
      message.error(err || "Unable to fetch prediction!");
    } finally {
      setEmotionLoading(false);
    }
  };

  return (
    <div className="cameraModule-wrapper">
      <div className="cameraMain-wrapper">
        {checkUndefinedNull(imgSrc) ? (
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        ) : (
          <img src={imgSrc} />
        )}
      </div>
      <div className="camera-actionBtn-wrapper">
        {checkUndefinedNull(imgSrc) ? (
          <Button type="primary" onClick={captureImg}>
            Capture
          </Button>
        ) : (
          <>
            <Button type="primary" onClick={uploadImg}>
              Upload
            </Button>
            <Button type="primary" danger={true} onClick={resetImg}>
              Retake
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CameraModule;
