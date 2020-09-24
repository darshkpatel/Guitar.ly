import React, { useRef, useEffect } from "react";

const AudioVisualiser = ({ audioData }) => {
  const canvas = React.createRef();

  const filterData = (rawData) => {
    const samples = 100; 
    const blockSize = Math.floor(rawData.length / samples); 
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      const blockStart = blockSize * i; 
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum += + Math.abs(rawData[blockStart + j]); 
      }
      filteredData.push(sum / blockSize); 
    }
    return filteredData;
  };

  const normalizeData = (filteredData) => {
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map((n) => n * multiplier);
  };

  const draw = () => {
    const thisCanvas = canvas.current;
    const { height } = thisCanvas;
    const { width } = thisCanvas;
    const context = thisCanvas.getContext("2d");
    let x = 0;
    const data = normalizeData(filterData(audioData.audioData));
    const sliceWidth = (width * 1.0) / data.length;

    context.lineWidth = 2;
    context.strokeStyle = "#3999FF";
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);

    data.forEach((item) => {
      const y = item * height;
      context.lineTo(x, y / 2);
      x += sliceWidth;
    });
    context.lineTo(x, height / 2);
    context.stroke();
  };

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      draw();
    }
  });
  return <canvas style={{width: '100%', height: '100px'}} ref={canvas} />;
};

export default AudioVisualiser;
