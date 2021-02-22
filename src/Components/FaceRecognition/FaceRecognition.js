import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box, imageURL }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={imageURL}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            left: box.left,
            top: box.top,
            right: box.right,
            bottom: box.bottom,
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
