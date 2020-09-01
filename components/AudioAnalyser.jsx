import React, { useState, useEffect } from 'react';
import AudioVisualiser from './AudioVisualiser';

const AudioAnalyser = ({audio}) => {
  const [audioData, setAudioData] = useState(new Uint8Array(0));
  let audioContext; let analyser; let dataArray; let source; let
    rafId;
  const tick = () => {
    analyser.getByteTimeDomainData(dataArray);
    setAudioData({ audioData: dataArray });
    rafId = requestAnimationFrame(tick);
  };
  useEffect(() => {
    console.log(audio)
    audioContext = new (window.AudioContext
      || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    source = audioContext.createMediaStreamSource(audio);
    source.connect(analyser);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      analyser.disconnect();
      source.disconnect();
    };
  }, []);

  return <AudioVisualiser audioData={audioData} />;
};

export default AudioAnalyser;
