export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;


  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers().reverse();

  return (
    <div className="flex items-center justify-center gap-1 mt-10 mb-4 text-sm text-gray-500 font-medium " dir="ltr">
      
      <button  onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 hover:text-primaryColor transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pages.map((page, index) => {
        if (page === '...') {
          return <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>;
        }
        return (
          <button  key={page} onClick={() => onPageChange(page)} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer ${ currentPage === page  ? 'bg-primaryColor text-white shadow-sm hover:bg-primaryDark'  : 'hover:bg-gray-100 hover:text-primaryColor'}`}>
            {page}
          </button>
        );
      })}

      <button  onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 hover:text-primaryColor transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  );
}
