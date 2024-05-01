import React, { useState } from "react";
import { Select } from "antd";
import CameraModule from "./CameraModule";
import FileInput from "./FileInput";
import { useAppManagerContext } from "../App";

const FILE_PROVIDER_OPTIONS = [
  {
    value: "camera",
    label: "Upload image via camera",
  },
  {
    value: "uploadFile",
    label: "Browse image to upload",
  },
];

const ImageFileProvider = () => {
  const [imgProvider, setImgProvider] = useState(null);
  const { setCapturedEmotion } = useAppManagerContext();

  const handleChange = (value) => {
    setCapturedEmotion(null);
    setImgProvider(value);
  };

  return (
    <div className="imageFileProvider-wrapper">
      <div className="imageFileProvider-contentWrapper">
        <div className="imageFileProvider-headingWrapper">
          <span className="imageFileProvider-heading">
            Image File Provider:
          </span>
        </div>
        <div className="imageFileProvider-dropdownWrapper">
          <Select
            value={imgProvider}
            onChange={handleChange}
            options={FILE_PROVIDER_OPTIONS}
            placeholder="Please choose a image file provider"
          />
        </div>
      </div>
      {imgProvider && (
        <div className="selectedFileProvider-wrapper">
          {imgProvider === "camera" && (
            <CameraModule setImgProvider={handleChange} />
          )}
          {imgProvider === "uploadFile" && (
            <FileInput setImgProvider={handleChange} />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageFileProvider;
