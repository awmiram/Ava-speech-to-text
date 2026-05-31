import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer({ src , tab }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.5);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current && src) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const mins = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const togglePlay = () => {
    if (!audioRef.current || !src) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error("خطا در پخش فایل صوتی:", err);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (!progressBarRef.current || !audioRef.current || !duration) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickPosition / rect.width));
    
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    } else if (newVolume === 0) {
      setIsMuted(true);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume > 0 ? prevVolume : 1);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };


  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gray-50  mb-4 px-5 w-130 rounded-xl border-gray-100 flex items-center gap-4" dir="ltr">
      {src && (
        <video ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setIsPlaying(false)} className="hidden"/>
      )}

      <button  onClick={togglePlay} disabled={!src} className="w-8 h-8  rounded-full flex items-center justify-center  transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed shrink-0">
        {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
          </svg>
          
        )}
      </button>
      
      <div className="flex-1 flex items-center gap-3 text-xs text-gray-500 font-medium tabular-nums">
        <span>{formatTime(currentTime)}</span>
        <div ref={progressBarRef} onClick={handleProgressClick} className="flex-1 h-1.5 bg-gray-200 rounded-full relative cursor-pointer group">
          <div className={`absolute left-0 top-0 h-full  rounded-full transition-all duration-100 ${tab === 'record' ? 'bg-primaryColor': '' } ${tab === 'file' ? 'bg-blue-500' : ''} ${tab === 'link' ? 'bg-rose-500' : '' } `} style={{ width: `${progressPercentage}%` }}>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 bg-white border border-primaryColor rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
        
        <span>{formatTime(duration)}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-2 w-24">
        <button  onClick={toggleMute} disabled={!src} className="text-gray-400 hover:text-primaryColor transition-colors cursor-pointer disabled:opacity-50">
          {isMuted || volume === 0 ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
          )}
        </button>

        <div className="relative flex-1 h-1.5 flex items-center group cursor-pointer">
          <div className="absolute w-full h-full bg-gray-200 rounded-full"></div>
        
          <div className={`absolute left-0 top-0 h-full  rounded-full transition-all duration-75 pointer-events-none ${tab === 'record' ? 'bg-primaryColor': '' } ${tab === 'file' ? 'bg-blue-500' : ''} ${tab === 'link' ? 'bg-rose-500' : '' }`} style={{ width: `${volume * 100}%` }}>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 bg-white border border-primaryColor rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <div  className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border border-primaryColor rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm z-10" style={{ left: `calc(${volume * 100}% - 5px)` }}></div>

          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} disabled={!src} className="absolute w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-20 m-0"/>
        </div>
      </div>

    </div>
  );
}
