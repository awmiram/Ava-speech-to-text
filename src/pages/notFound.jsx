import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center px-4">
      <h1 className="text-9xl font-extrabold text-gray-100 mb-2">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-primaryColor mb-4">
        صفحه مورد نظر پیدا نشد!
      </h2>
      
      <p className="text-gray-500 mb-8 max-w-md text-sm md:text-base leading-relaxed">
        متأسفانه آدرسی که جستجو کردید در سیستم وجود ندارد یا ممکن است حذف شده باشد.
      </p>
      <Link  to="/"  className="flex items-center gap-2 bg-primaryColor text-white px-6 py-3 rounded-2xl hover:bg-primaryDark transition-colors shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
        بازگشت به صفحه اصلی
      </Link>

    </div>
  );
}
