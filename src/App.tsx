import React, { useState } from 'react';
import './index.css';

const App: React.FC = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleStart = () => {
    setStartTime(performance.now());
    setElapsed(null);
    setResult(null);
  };

  const handleStop = () => {
    if (startTime === null) return;
    const now = performance.now();
    const diff = (now - startTime) / 1000;
    const rounded = parseFloat(diff.toFixed(2));
    setElapsed(rounded);

    const delta = Math.abs(rounded - 10);
    if (delta < 0.1) setResult('🎯 Perfect!');
    else if (delta < 0.5) setResult('👍 Great!');
    else setResult('😅 Try Again');
  };

  return (
    <div className="center-container">
      <h1>10秒ストップゲーム</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleStart}>スタート</button>
        <button onClick={handleStop}>ストップ</button>
      </div>
      {elapsed !== null && (
        <div className="result">
          <p>結果: {elapsed.toFixed(2)} 秒</p>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default App;
