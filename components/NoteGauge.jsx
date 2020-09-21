import React, { useState } from 'react';
import AudioAnalyser from './AudioAnalyser';
import buttonStyles from './buttons.module.css';

const NoteGauge = () => {
  const [audio, setAudio] = useState();

  const getMicrophone = async () => {
    const audioConf = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setAudio(audioConf);
  };

  const stopMicrophone = () => {
    audio.getTracks().forEach((track) => track.stop());
    setAudio(null);
  };

  const toggleMicrophone = () => {
    if (audio) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  };

  return (
    <div className="App">
      <div className="controls">
        <button onClick={toggleMicrophone} type="button" className={buttonStyles.buttonMic}>
          {audio ? 'Stop microphone' : 'Start microphone'}
        </button>
      </div>
      {audio ? <AudioAnalyser audio={audio} /> : ''}
    </div>
  );
};

export default NoteGauge;
