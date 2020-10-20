/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Pitchfinder from 'pitchfinder';
import { useDispatch } from 'react-redux';
import AudioVisualiser from './AudioVisualiser';
import Gauge from './Gauge';

const useRedux = () => {
  const dispatch = useDispatch();
  const setNote = (note) =>
    dispatch({
      type: 'SET_NOTE',
      payload: { note },
    });

  return { setNote };
};
const noteStrings = [
  'C',
  'C♯',
  'D',
  'D♯',
  'E',
  'F',
  'F♯',
  'G',
  'G♯',
  'A',
  'A♯',
  'B',
];

// Simplified from nu.js
// ref https://pages.mtu.edu/~suits/notefreqs.html
const getNote = (freq) => {
  const note = 12 * (Math.log(freq / 440) / Math.log(2));
  return Math.round(note) + 69;
};

const AudioAnalyser = ({ audio }) => {
  const [audioData, setAudioData] = useState(new Uint8Array(0));
  const [noteName, setNoteName] = useState('E');
  const [frequency, setFrequency] = useState(82);
  const [octave, setOctave] = useState(2);
  const { setNote } = useRedux();
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
      minFrequency: 75,
    });
    const pitch = detectPitch(dataArray);
    if (pitch) {
      const freq = Math.floor(pitch * 1.09);
      const note = getNote(freq);
      setFrequency(freq);
      setNoteName(noteStrings[note % 12]);
      setOctave(parseInt(note / 12, 10) - 1);
      // console.log({ frequency, note, noteName, octave });
      setNote(`${noteStrings[note % 12]}${parseInt(note / 12, 10) - 1}`);
    }
    rafId = requestAnimationFrame(tick);
  };

  useEffect(() => {
    console.log(audio);
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 1;
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

  return (
    <>
      <Gauge
        value={frequency}
        min={70}
        max={400}
        label={`${noteName} - ${octave}`}
      />

      <AudioVisualiser audioData={audioData} />
    </>
  );
};

export default AudioAnalyser;
