import React, { useState, useEffect } from 'react';
import AudioVisualiser from './AudioVisualiser';
import Pitchfinder from "pitchfinder";

const noteStrings = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A♯",
  "B"
];

// Simplified from nu.js
// ref https://pages.mtu.edu/~suits/notefreqs.html
const getNote = freq => {
  const note = 12 * (Math.log(freq / 440) / Math.log(2));
  return Math.round(note) + 69;
};

const AudioAnalyser = ({audio}) => {
  const [audioData, setAudioData] = useState(new Uint8Array(0));
  let audioContext;
  let analyser;
  let dataArray;
  let source;
  let rafId;
  const tick = () => {
    analyser.getByteTimeDomainData(dataArray);
    setAudioData({ audioData: dataArray });
    const detectPitch = new Pitchfinder.AMDF({
      maxFrequency: 800,
      minFrequency: 75
    });
    const pitch = detectPitch(dataArray);
    if (pitch) {
      const freq = Math.floor(pitch * 1.09);
      const note = getNote(freq);
      const noteName = noteStrings[note % 12];
      const octave = parseInt(note / 12) - 1;
      console.log({freq,note,noteName,octave});
    }
    rafId = requestAnimationFrame(tick);
  };

  useEffect(() => {
    console.log(audio)
    audioContext = new (window.AudioContext
      || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.99;
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
