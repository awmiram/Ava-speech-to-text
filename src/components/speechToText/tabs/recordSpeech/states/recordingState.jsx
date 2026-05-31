import { useState, useEffect } from 'react';

export default function RecordingState({ onStop }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60).toString().padStart(2, '0');
    const secs = (time % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-6">
      
      
      <div className="relative flex items-center justify-center mb-8">
      
        <div className="absolute w-24 h-24 bg-blue-400 rounded-full animate-ping opacity-60"></div>
      
        <div className="absolute w-28 h-28 bg-blue-100 rounded-full animate-pulse"></div>
        
      
        <button onClick={onStop} className="relative z-10 w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition transform cursor-pointer">
          <svg className='h-10 w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#ffffff" d="M160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96z"/></svg>
        </button>
      </div>

      
      <div className="text-4xl font-bold text-blue-600 mb-3" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {formatTime(seconds)}
      </div>


      <p className="text-blue-500 text-center text-sm font-medium">
        در حال ضبط صدا...<br />
        برای پایان، روی دکمه کلیک کنید
      </p>
      
    </div>
  );
}
