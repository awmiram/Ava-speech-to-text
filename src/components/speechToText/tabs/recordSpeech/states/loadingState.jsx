export default function LoadingState() {
  return (
    <div className="flex flex-col w-full h-full py-4 px-2">
      <div className="flex items-center gap-2 mb-6 text-gray-500">
        <svg className="w-5 h-5 animate-spin text-primaryColor" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-sm font-medium">در حال پیاده‌سازی متن...</span>
      </div>

      <div className="space-y-4 w-full">
        <div className="h-3 bg-gray-200 rounded-full animate-pulse w-full"></div>
        <div className="h-3 bg-gray-200 rounded-full animate-pulse w-11/12"></div>
        <div className="h-3 bg-gray-200 rounded-full animate-pulse w-4/5"></div>
        <div className="h-3 bg-gray-200 rounded-full animate-pulse w-full"></div>
        <div className="h-3 bg-gray-200 rounded-full animate-pulse w-3/4"></div>
      </div>
    </div>
  );
}
