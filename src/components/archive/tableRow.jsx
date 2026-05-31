import { useState , memo } from 'react';
import toast from 'react-hot-toast';
import ExpandedDetails from './expandedDetails'

const formatDuration = (durationStr) => {
  if (!durationStr) return '00:00';
  const timePart = durationStr.split('.')[0];
  const parts = timePart.split(':');
  if (parts.length === 3 && parts[0] === '0') {
    return `${parts[1]}:${parts[2]}`;
  }
  return timePart;
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'نامشخص';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fa-IR'); 
  } catch (e) {
    return dateStr.split('T')[0];
  }
};

const getFileType = (fileName) => {
  if (!fileName) return '-';
  const parts = fileName.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1].toUpperCase();
  }
  return '-';
};

const getSourceDetails = (source) => {
  switch (source) {
    case 'record':
      return {
        bgColor: 'bg-primaryColor',
        icon: (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        ),
      };
    case 'link':
      return {
        bgColor: 'bg-rose-500',
        icon: (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        ),
      };
    case 'upload':
    default:
      return {
        bgColor: 'bg-blue-500',
        icon: (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        ),
      };
  }
};

const TableRow = memo(function TableRow({ item, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const fileName = item.filename || 'فایل بدون نام';
  const fileDate = formatDate(item.processed);
  const fileType = getFileType(item.filename);
  const duration = formatDuration(item.duration);
  const sourceInfo = getSourceDetails(item.source);

  const normalizedItem = {
    ...item,
    name: fileName,
    duration: duration,
  };

  const handleCopyText = () => {
    const plainText = item.segments?.map(segment => segment.text).filter(text => text.trim() !== '').join(' ');
    if (!plainText) {
      toast.error('متنی برای این فایل وجود ندارد!');
      return;
    }
    navigator.clipboard.writeText(plainText);
    toast.success('متن فایل با موفقیت کپی شد!');
  };

  const actionBtnClass = "group relative flex items-center justify-center text-gray-400 transition-colors cursor-pointer disabled:opacity-50";
  const tooltipClass = "absolute top-6 left-11 -translate-x-1/2 whitespace-nowrap bg-white text-xs px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow";

 return (
    <div className={`mb-4 md:mb-2 border md:border-none border-gray-100 shadow-sm md:shadow-none hover:bg-gray-50/50 md:hover:shadow rounded-2xl transition-colors`}>
      <div className="flex flex-col md:grid md:grid-cols-12 gap-y-3 md:gap-2 lg:gap-4 py-4 md:py-1 items-center text-sm text-center px-4 md:px-6">
        
        <div className="flex items-center gap-3 w-full md:contents">
          <div className="md:col-span-1 flex justify-center shrink-0">
            <div className={`w-10 h-10 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white ${sourceInfo.bgColor} shadow-sm`}>
              {sourceInfo.icon}
            </div>
          </div>
          <div className="md:col-span-4 flex-1 md:flex-none text-right truncate text-gray-800 md:text-gray-700 font-bold md:font-medium" dir="ltr" title={fileName}>
            {fileName}
          </div>
        </div>

        <div className="flex items-center justify-between w-full md:contents bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-xl text-xs md:text-sm mt-2 md:mt-0">
          <div className="md:col-span-2 text-gray-500 tabular-nums flex flex-col md:block gap-1">
            <span className="md:hidden text-[10px] text-gray-400">تاریخ</span>{fileDate}
          </div>
          <div className="md:col-span-1 text-gray-500 uppercase font-medium flex flex-col md:block gap-1">
            <span className="md:hidden text-[10px] text-gray-400">نوع فایل</span>{fileType}
          </div>
          <div className="md:col-span-1 text-gray-500 tabular-nums flex flex-col md:block gap-1">
            <span className="md:hidden text-[10px] text-gray-400">زمان</span>{duration}
          </div>
        </div>

        <div className="flex justify-around md:justify-end gap-1 md:gap-2 lg:gap-4 w-full md:col-span-3 mt-2 md:mt-0 pt-3 md:pt-0 border-t border-gray-100 md:border-none">
          <a href={item.url} target="_blank" rel="noreferrer" className={`${actionBtnClass} hover:text-primaryColor bg-gray-50 md:bg-transparent w-10 h-10 md:w-auto md:h-auto rounded-full md:rounded-none`}>
            <span className={`text-gray-700 hidden md:block ${tooltipClass}`}>بارگیری فایل</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </a>
          
          <button className={`${actionBtnClass} hover:text-primaryColor bg-gray-50 md:bg-transparent w-10 h-10 md:w-auto md:h-auto rounded-full md:rounded-none`} onClick={() => setIsExpanded(!isExpanded)}>
            <span className={`text-gray-700 hidden md:block ${tooltipClass}`}>{isExpanded ? 'بستن' : 'مشاهده'}</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </button>

          <button onClick={handleCopyText} className={`${actionBtnClass} bg-gray-50 md:bg-transparent w-10 h-10 md:w-auto md:h-auto rounded-full md:rounded-none hover:text-primaryColor`}>
            <span className={`text-gray-700 hidden md:block ${tooltipClass} `}>کپی</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
          </button>

          <button onClick={() => onDelete(item.id)} className={`${actionBtnClass} hover:bg-rose-500 rounded-full hover:text-white bg-gray-50 md:bg-transparent w-10 h-10 md:w-auto md:h-auto md:p-1`}>
            <span className={`text-gray-700 hidden md:block ${tooltipClass}`}>حذف</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 md:px-6 pb-4 md:pb-2">
          <ExpandedDetails item={normalizedItem} />
        </div>
      )}

    </div>
  );
});
export default TableRow;
