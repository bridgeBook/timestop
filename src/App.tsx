import React, { useState, useEffect } from 'react';
import './index.css';

const App: React.FC = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    let timer: number;
    if (startTime !== null && result === null) {
      timer = window.setInterval(() => {
        setNow(performance.now());
      }, 100);
    } else {
      setNow(0);
    }
    return () => clearInterval(timer);
  }, [startTime, result]);

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

  const isRunning = startTime !== null && result === null;

  return (
    <div className="center-container">
      <h1>10秒ストップゲーム</h1>

      <div className="button-row">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className={isRunning ? 'disabled' : ''}
        >
          スタート
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className={!isRunning ? 'disabled' : ''}
        >
          ストップ
        </button>
      </div>

      {/* 計測中の表示 */}
      <div className="status-area">
        {isRunning ? (
          <p>計測中…</p>
        ) : (
          <p>&nbsp;</p> // 空白を入れて高さを保つ
        )}
      </div>

      {/* 結果表示領域 */}
      <div className="result">
        {elapsed !== null ? (
          <>
            <p>結果: {elapsed.toFixed(2)} 秒</p>
            <p>{result}</p>
          </>
        ) : (
          <>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
