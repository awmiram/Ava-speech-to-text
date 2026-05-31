import micIcon from '../../../../assets/icons/mainContentIcons/micIcon.svg'
import IdleState from './states/idleState';
import RecordingState from './states/recordingState';
import LoadingState from './States/LoadingState';

import { useRef, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast'; 
import { processFile, resetTranscription, setStatus, setMediaUrl, setErrorMsg } from '../../../../store/transcribeSlice';
import TranscriptionResult from '../../../common/transcriptionResult';

export default function RecordSpeech() {
  const dispatch = useDispatch();
  const { status, errorMsg, transcriptionData, mediaUrl } = useSelector((state) => state.transcribe);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (status === 'error' && errorMsg) {
      toast.error(errorMsg, {
        id: 'record-error',
      });
    }
  }, [status, errorMsg]);

  const getBorderColor = () => {
    if (status === 'recording') return 'border-blue-500';
    if (status === 'loading') return 'border-gray-300';
    if (status === 'error') return 'border-red-500';
    return 'border-primaryColor';
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const file = new File([audioBlob], "recorded_voice.wav", { type: 'audio/wav' });

        dispatch(setMediaUrl(URL.createObjectURL(audioBlob)));
        dispatch(processFile(file)); 
      };

      mediaRecorderRef.current.start();
      dispatch(setStatus('recording'));
    } catch (err) {

      dispatch(setErrorMsg('مرورگر به میکروفون دسترسی ندارد. لطفاً مجوز دسترسی (Permission) را تأیید کنید.'));
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleReset = () => {
    dispatch(resetTranscription());
  };

  if (status === 'success' && transcriptionData) {
    return <TranscriptionResult transcriptionData={transcriptionData} mediaUrl={mediaUrl} onReset={handleReset} tab={'record'} />;
  }

  return (
    <div className={`w-full border-2 ${getBorderColor()} rounded-3xl rounded-tr-none p-8 flex flex-col items-center justify-center min-h-96 bg-white transition-colors duration-500`}>
      

      {(status === 'idle' || status === 'error') && <IdleState onStart={handleStartRecording} />}
      
      {status === 'recording' && <RecordingState onStop={handleStopRecording} />}
      {status === 'loading' && <LoadingState />}
      
      
    </div>
  );
}
