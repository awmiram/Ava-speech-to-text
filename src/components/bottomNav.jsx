import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();


  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around h-16 px-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <Link  to="/"  className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive('/') ? 'text-primaryColor' : 'text-gray-400 hover:text-gray-600'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={isActive('/') ? 2 : 1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
        </svg>
        <span className="text-[10px] font-medium">تبدیل گفتار</span>
      </Link>

      <Link  to="/archive"  className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${ isActive('/archive') ? 'text-primaryColor' : 'text-gray-400 hover:text-gray-600' }`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={isActive('/archive') ? 2 : 1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
        <span className="text-[10px] font-medium">آرشیو من</span>
      </Link>

    </div>
  );
}
