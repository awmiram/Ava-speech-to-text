import { useState } from 'react';

import AudioPlayer from '../common/audioPlayer';

export default function ExpandedDetails({ item }) {
  const [activeTab, setActiveTab] = useState('plain');
  

  const mediaUrl = item.url || item.media_url;

  const plainText = item.segments?.map(segment => segment.text).filter(text => text.trim() !== '').join(' ') || 'متنی برای این فایل یافت نشد.';

  const formatTextTime = (timeString) => {
    if (!timeString) return "00:00";
    const parts = timeString.split(':');
    if (parts.length === 3) {
      const minutes = parts[1].padStart(2, '0');
      const seconds = Math.floor(parseFloat(parts[2])).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    }
    return timeString;
  };

  return (
    <div className="w-full border-2 border-primaryColor rounded-2xl p-6 mt-2 mb-4 bg-white flex flex-col gap-4 shadow-sm animate-fade-in-down">
    
      <div className="flex items-center gap-6 border-b border-gray-100 pb-3">
        <button  onClick={() => setActiveTab('plain')} className={`flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${activeTab === 'plain' ? 'text-primaryColor' : 'text-gray-400 hover:text-gray-600'}`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
          متن ساده
        </button>

        <button  onClick={() => setActiveTab('timed')} className={`flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${ activeTab === 'timed' ? 'text-primaryColor' : 'text-gray-400 hover:text-gray-600' }`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          زمان‌بندی شده
        </button>
      </div>
      <div className="text-gray-600 text-sm leading-loose text-justify max-h-37.5 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
        {activeTab === 'plain' ? (
          <p>{plainText}</p>
        ) : (
          <div className="flex flex-col gap-2 font-mono tabular-nums text-right">
            {item.segments?.filter(s => s.text.trim() !== '').map((segment, index) => (
              <p key={index}>
                <span className="text-primaryColor font-bold mr-3">
                  [{formatTextTime(segment.start)} - {formatTextTime(segment.end)}]
                </span> 
                {segment.text}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 w-130 max-w-full rounded-xl overflow-hidden self-center">
        <AudioPlayer tab={'record'} src={mediaUrl} />
      </div>

    </div>
  );
}
