import { useState, useRef, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { processFile, resetTranscription, setMediaUrl } from '../../../store/transcribeSlice';
import TranscriptionResult from '../../common/TranscriptionResult';

export default function UploadFile() {
  const dispatch = useDispatch();
  const { status, errorMsg, transcriptionData, mediaUrl } = useSelector((state) => state.transcribe);
  
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (status === 'error' && errorMsg) {
      toast.error(errorMsg, {
        id: 'upload-error', //show only one error incase alot happens
      });
    }
  }, [status, errorMsg]);

  const handleBoxClick = () => {
    if (status !== 'loading' && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      dispatch(setMediaUrl(URL.createObjectURL(selectedFile)));
    }
  };

  const handleSubmit = () => {
    if (!file) return;
    dispatch(processFile(file));
  };

  const handleReset = () => {
    setFile(null);
    dispatch(resetTranscription());
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (status === 'success' && transcriptionData) {
    return <TranscriptionResult transcriptionData={transcriptionData} mediaUrl={mediaUrl} onReset={handleReset} tab={'file'} />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="audio/*,video/*" className="hidden" />

      {!file ? (
        <div onClick={handleBoxClick} className="w-full border-2 h-full border-blue-400 rounded-3xl flex flex-col items-center justify-center min-h-96 bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
          <div className="w-20 h-20  bg-blue-500 rounded-full flex items-center justify-center shadow-2xl mb-4 transition-colors group-hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-10 h-10 text-white'>
                <polygon fill="currentColor" points="346.231 284.746 256.039 194.554 165.847 284.746 188.474 307.373 240.039 255.808 240.039 496 272.039 496 272.039 255.808 323.604 307.373 346.231 284.746" />
                <path fill="currentColor" d="M400,161.453V160c0-79.4-64.6-144-144-144S112,80.6,112,160v2.491A122.285,122.285,0,0,0,49.206,195.2,109.4,109.4,0,0,0,16,273.619c0,31.119,12.788,60.762,36.01,83.469C74.7,379.275,105.338,392,136.07,392H200V360H136.07C89.154,360,48,319.635,48,273.619c0-42.268,35.64-77.916,81.137-81.155L144,191.405V160a112,112,0,0,1,224,0v32.04l15.8.2c46.472.588,80.2,34.813,80.2,81.379C464,322.057,428.346,360,382.83,360H312v32h70.83a109.749,109.749,0,0,0,81.14-35.454C484.625,334.339,496,304.889,496,273.619,496,215.182,455.716,169.392,400,161.453Z" />
            </svg>
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <p className="font-light text-gray-500 justify-center text-center">برای بارگذاری فایل گفتاری (صوتی/تصویری)، کلیک کنید</p>
            <p className="font-light text-gray-500 justify-center text-center ">متن پیاده شده آن، در اینجا ظاهر می‌شود</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full p-15 border-2 border-blue-500 rounded-3xl flex flex-col items-center justify-center bg-white shadow-sm">
          <svg className="w-12 h-12 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <p className="text-gray-700 font-medium text-center mb-1 w-full truncate px-4" dir="ltr">{file.name}</p>
          <p className="text-gray-400 text-sm mb-6">{(file.size / (1024 * 1024)).toFixed(2)} مگابایت</p>

          <div className="flex gap-3 w-full">
            <button onClick={handleReset} disabled={status === 'loading'} className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer">
              تغییر فایل
            </button>
            <button onClick={handleSubmit} disabled={status === 'loading'} className="flex-1 bg-blue-500 text-white py-2.5 rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center disabled:bg-blue-500/60 cursor-pointer">
              {status === 'loading' ? 'در حال آپلود...' : 'شروع پردازش'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
