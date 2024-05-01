import React, { useState } from "react";
import { Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  checkUndefinedNull,
  dataURItoBlob,
  fileToDataUri,
} from "../utils/utils";
import { getEmotionPrediction } from "../utils/api";
import { useAppManagerContext } from "../App";

const FileInput = ({ setImgProvider }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { setCapturedEmotion, setEmotionLoading } = useAppManagerContext();

  const uploadImg = () => {
    if (checkUndefinedNull(selectedFile)) {
      message.error("Please select a file to proceed!");
      return;
    }
    fileToDataUri(selectedFile).then(async (dataUri) => {
      try {
        setImgProvider(null);
        setEmotionLoading(true);
        const blob = dataURItoBlob(dataUri);
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
    });
  };

  const onChange = (file) => {
    if (checkUndefinedNull(file)) {
      message.error("Please choose a valid file!");
      return;
    }
    setSelectedFile(file);
  };

  const deleteFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="fileInput-wrapper">
      <div className="fileInput-uploadWrapper">
        <label for="file-upload">
          <span className="fileInput-uploadBtn">Choose File</span>
          <input
            className="fileInput-hidden"
            type="file"
            name="file"
            id="file-upload"
            accept="image/jpeg, image/jpg"
            onChange={(event) => onChange(event.target.files[0] || null)}
          />
        </label>
        {selectedFile && (
          <div className="fileInput-fileNameWrapper">
            <div>
              <span>{selectedFile?.name}</span>
            </div>
            <div onClick={deleteFile} className="fileInput-removeIcon">
              <DeleteOutlined />
            </div>
          </div>
        )}
      </div>
      {selectedFile && (
        <div>
          <Button type="primary" onClick={uploadImg}>
            Upload
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileInput;
