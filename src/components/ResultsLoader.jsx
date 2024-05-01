import React from "react";
import { Spin } from "antd";

const ResultLoader = ({ title }) => {
  return (
    <div className="emotionResultLoader-wrapper">
      <Spin size="large" />
      <span className="emotionResultLoader-title">{title}...</span>
    </div>
  );
};

export default ResultLoader;
