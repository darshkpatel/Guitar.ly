import React, { useRef, useEffect } from "react";

const AudioVisualiser = ({ audioData }) => {
  const canvas = React.createRef();

  const draw = () => {
    const thisCanvas = canvas.current;
    const { height } = thisCanvas;
    const { width } = thisCanvas;
    const context = thisCanvas.getContext("2d");
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = "#3999FF";
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);

    audioData.audioData.forEach((item) => {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
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
  return <canvas width="300" height="300" ref={canvas} />;
};

export default AudioVisualiser;
