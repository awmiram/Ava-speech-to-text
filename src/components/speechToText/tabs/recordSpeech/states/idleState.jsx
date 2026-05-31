import micIcon from '../../../../../assets/icons/mainContentIcons/micIcon.svg'
export default function IdleState({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-6">
      <button onClick={onStart} className="w-20 h-20 bg-primaryColor text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 mb-6 cursor-pointer">
        <img src={micIcon} alt="mic Icon" className='w-10 h-10' />
      </button>
      
      <p className="text-gray-500 text-center text-sm leading-relaxed">
        برای شروع به صحبت، دکمه را فشار دهید<br />
        متن پیاده شده آن، در اینجا ظاهر شود
      </p>
    </div>
  );
}
