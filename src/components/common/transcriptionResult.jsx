import { useState, lazy, Suspense } from 'react';
import toast from 'react-hot-toast'; 


const AudioPlayer = lazy(() => import('./AudioPlayer'));

export default function TranscriptionResult({ transcriptionData, mediaUrl, onReset , tab }) {
  const [activeTab, setActiveTab] = useState('plain');
  
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

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

  const plainText = transcriptionData?.segments?.map(segment => segment.text).filter(text => text.trim() !== '').join(' ');

  const handleCopy = () => {
    if (!plainText) return;
    navigator.clipboard.writeText(plainText);
    setIsCopied(true);
    
    toast.success('متن با موفقیت کپی شد!', { id: 'copy-toast' });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadAudio = async () => {
    if (!mediaUrl) return;
    setIsDownloading(true);
    
    const toastId = toast.loading('در حال آماده‌سازی فایل دانلود...');
    
    try {
      const response = await fetch(mediaUrl);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      let ext = 'mp3';
      if (typeof mediaUrl === 'string' && mediaUrl.includes('.')) {
        const possibleExt = mediaUrl.split('.').pop().split(/#|\?/)[0];
        if (possibleExt.length <= 4) ext = possibleExt;
      }
      
      link.download = `Ava_Audio.${ext}`; 
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('دانلود فایل آغاز شد', { id: toastId });

    } catch (error) {
      toast.error('دانلود مستقیم ناموفق بود. باز کردن در تب جدید...', { id: toastId });
      window.open(mediaUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col w-full animate-fade-in-down h-96">
      <div className={` border-2 rounded-3xl ${tab === 'record' ? 'rounded-tr-none border-primaryColor' : ''} ${tab === 'file' ? 'border-blue-500' : ''} ${tab === 'link' ? 'border-rose-500' : ''}  bg-white flex flex-col overflow-hidden shadow-sm `}>
        
        <div className="flex items-center justify-between px-4 py-3 border-gray-500 bg-gray-50/50">
          <div className="flex items-center gap-10">
            <button onClick={() => setActiveTab('plain')} className={`flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${activeTab === 'plain' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`} >   
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                </svg>
              متن ساده
            </button>
            <button onClick={() => setActiveTab('timed')} className={`flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${activeTab === 'timed' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              زمان‌بندی شده
            </button>
          </div>

          <div className="flex items-center gap-5">
            <button onClick={handleDownloadAudio} disabled={isDownloading} title="دانلود فایل صوتی" className={`transition-colors ${isDownloading ? 'text-primaryColor opacity-50 cursor-wait' : 'text-gray-500 hover:text-gray-800 cursor-pointer'}`} >
                {isDownloading ? (
                   <svg className="size-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4-4H4z"></path></svg>
                ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                   </svg>
                )}
            </button>

            <button onClick={handleCopy}title="کپی متن"className={`transition-colors cursor-pointer ${isCopied ? 'text-green-500' : 'text-gray-500 hover:text-gray-800'}`}>
                {isCopied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                    </svg>
                )}
            </button>

            <button onClick={onReset} className="flex items-center gap-1 text-xs font-bold text-white bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-full transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              شروع دوباره
            </button>
          </div>
        </div>
        
        <hr className='scale-x-90 text-gray-400' />
        
        <div className={`p-6 min-h-50 max-h-75 overflow-y-auto text-sm text-gray-700 leading-loose scrollbar-thin scrollbar-thumb-gray-200`}>
          {activeTab === 'plain' ? (
            <p className='px-2'>{plainText}</p>
          ) : (
            <div className="flex flex-col gap-4">
              {transcriptionData?.segments?.filter(segment => segment.text.trim() !== '')?.map((segment, index) => (
                  <div key={index} className={`flex gap-4 px-4 py-3 rounded-4xl ${index % 2 === 0 ? 'bg-gray-100' : 'bg-transparent'}`}>
                    <span className="text-primaryColor font-bold tabular-nums shrink-0">
                      {formatTextTime(segment.start)}
                    </span>
                    <span className="text-primaryColor font-bold tabular-nums shrink-0">
                      {formatTextTime(segment.end)}
                    </span>
                    <p className="flex-1">{segment.text}</p>
                  </div>
              ))}
            </div>
          )}
        </div>

          <Suspense fallback={
          <div className="w-full h-16 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-sm text-gray-400">
            در حال بارگذاری پلیر...
          </div>
        }>
            <div className="self-center w-130 max-w-full">
          <AudioPlayer src={mediaUrl} tab={tab} />
            </div>
        </Suspense>

        
      </div>
    </div>
  );
}
