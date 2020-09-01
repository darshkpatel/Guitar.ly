import { useState, useEffect } from 'react';

const NoteGauge = () => {
  const [loaded, setLoaded] = useState(false);
  const [frequency, setFrequency] = useState(0);
  return (
    <div>
      {loaded}
      Frequency:
      {' '}
      {frequency}
    </div>
  );
};

export default NoteGauge;
