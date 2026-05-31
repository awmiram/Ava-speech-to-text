import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { processUrl, resetTranscription } from '../../../store/transcribeSlice';
import TranscriptionResult from '../../common/TranscriptionResult';

export default function LinkUpload() {
  const dispatch = useDispatch();
  const { status, errorMsg, transcriptionData, mediaUrl } = useSelector((state) => state.transcribe);
  const [url, setUrl] = useState('');


  useEffect(() => {
    if (status === 'error' && errorMsg) {
      toast.error(errorMsg, {
        id: 'link-error',
      });
    }
  }, [status, errorMsg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    dispatch(processUrl(url));
  };

  const handleReset = () => {
    setUrl('');
    dispatch(resetTranscription());
  };

  if (status === 'success' && transcriptionData) {
    return <TranscriptionResult transcriptionData={transcriptionData} mediaUrl={mediaUrl} onReset={handleReset} tab={'link'} />;
  }

  return (
    <div className="w-full h-full border-2 border-rose-500 rounded-3xl p-10 flex flex-col items-center justify-center min-h-96 bg-white">
      <div className=" flex flex-col w-full max-w-lg justify-center items-center">
        
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex items-center gap-3 border border-rose-500 rounded-full pl-4 mb-4">
          <input dir="ltr" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="example.com/sample.mp3" disabled={status === 'loading'} className="w-full py-4 text-left text-gray-700 outline-none dir-ltr" dir="ltr"/>
          <button type="submit" disabled={status === 'loading'} className={` text-white rounded-full w-11 h-9 flex items-center justify-center shadow-sm cursor-pointer ${status === 'loading' ? 'bg-rose-200' : 'bg-rose-500'} `}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
          </button>
        </form>

        <div className='flex flex-col justify-center'>
          <p className='text-center text-gray-500 font-light'>نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد</p>
          <p className='text-center text-gray-500 font-light'>و دکمه را فشار دهید</p>
        </div>

      </div>
    </div>
  );
}
