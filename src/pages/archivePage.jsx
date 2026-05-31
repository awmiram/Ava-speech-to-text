import { useState, Fragment , useCallback } from 'react'; 
import { Dialog, Transition } from '@headlessui/react';
import toast from 'react-hot-toast'; 
import useSWR from 'swr';

import TableRow from '../components/archive/tableRow';
import Pagination from '../components/archive/pagination';
import { getRequestsList, deleteRequest } from '../services/archiveApi'; 

export default function Archive() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const { data: fetchedData, error, isLoading, mutate } = useSWR('archiveList',() => getRequestsList());

  const archiveList = Array.isArray(fetchedData) ? fetchedData : (fetchedData?.results || []);

  const openModal = useCallback((id) => {
    setItemToDelete(id);
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setItemToDelete(null);
  };
  
  const confirmDelete = async () => {
    if (!itemToDelete) return;
    
    closeModal();
    const optimisticData = archiveList.filter(item => item.id !== itemToDelete);
    mutate(optimisticData, false); 
    
    const toastId = toast.loading('در حال حذف فایل...');

    try {
      await deleteRequest(itemToDelete);
      
      toast.success('فایل با موفقیت حذف شد.', { id: toastId });
      
      const newTotalPages = Math.ceil(optimisticData.length / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      mutate(); 
      toast.error('حذف فایل با خطا مواجه شد!', { id: toastId });
    }
  };

  const totalPages = Math.ceil(archiveList.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = archiveList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-full max-w-6xl  mx-auto flex flex-col px-4 md:px-8 py-4 md:py-6">
      <h1 className="text-xl md:text-2xl text-primaryColor mb-6 md:mb-8 text-right font-bold">آرشیو من</h1>

      <div className="w-full flex flex-col bg-white">
        
        <div className="hidden md:grid grid-cols-12 gap-2 lg:gap-4 pb-4 mb-2 border-b border-gray-100 text-sm font-medium text-gray-500 text-center px-4 md:px-6">
          <div className="col-span-1"></div>
          <div className="col-span-4 text-right pr-2 lg:pr-4 text-nowrap text-gray-700">نام فایل</div>
          <div className="col-span-2 text-nowrap text-gray-700">تاریخ بارگذاری</div>
          <div className="col-span-1 text-nowrap text-gray-700">نوع فایل</div>
          <div className="col-span-1 text-nowrap text-gray-700">زمان</div>
          <div className="col-span-3 text-nowrap"></div>
        </div>

        <div className="flex flex-col max-h-140 min-h-107 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primaryColor/70">
          {isLoading ? (
            <div className="flex justify-center items-center py-12 text-gray-500 animate-pulse h-full">
              در حال دریافت آرشیو اطلاعات...
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12 text-red-500 h-full">
              ارتباط با سرور برقرار نشد. لطفاً اینترنت خود را بررسی کنید.
            </div>
          ) : currentItems.length === 0 ? (
            <div className="flex justify-center items-center py-12 text-gray-400 h-full">
              آرشیوی یافت نشد.
            </div>
          ) : (
            currentItems.map((item) => (
              <TableRow key={item.id} item={item} onDelete={openModal} />
            ))
          )}
        </div>

      </div>
      
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)}/>

        {/*modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all border border-gray-100">
                  <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-800 mb-3">
                    حذف فایل
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 font-light leading-relaxed">
                      آیا از حذف این فایل مطمئن هستید؟ <br/> این عملیات غیرقابل بازگشت است و فایل برای همیشه از آرشیو شما پاک خواهد شد.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" className="inline-flex justify-center rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none transition-colors cursor-pointer" onClick={closeModal}>
                      انصراف
                    </button>
                    <button type="button" className="inline-flex justify-center rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 focus:outline-none transition-colors cursor-pointer" onClick={confirmDelete}>
                      بله، حذف شود
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </div>
  );
}
