import dropIcon from '../assets/icons/headerIcons/dropIcon.svg'

import { Fragment } from 'react'
import { Tab, Listbox, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'

import { setActiveTab, toggleLanguage } from '../store/homeSlice'
import { resetTranscription } from '../store/transcribeSlice'
import RecordSpeech from '../components/speechToText/tabs/recordSpeech'
import UploadFile from '../components/speechToText/tabs/uploadFile'
import LinkUpload from '../components/speechToText/tabs/linkUpload'

export default function Home() {
  const dispatch = useDispatch();
  const { activeTab, language } = useSelector((state) => state.home);


  const tabMapping = ['record', 'upload', 'link']; //tab names insted of index numbers
  const selectedTabIndex = Math.max(0, tabMapping.indexOf(activeTab));

  const handleTabChange = (index) => {
    dispatch(setActiveTab(tabMapping[index]));
    dispatch(resetTranscription());
  };

  const languages = [
    { id: false, name: 'فارسی' },
    { id: true, name: 'انگلیسی' }
  ];
  const selectedLang = languages.find(lang => lang.id === language);

  const handleLanguageChange = (selected) => {
    if (selected.id !== language) {
      dispatch(toggleLanguage());
    }
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center  pb-10">
      <div className="text-center mb-8 px-4">
        <h1 className="text-3xl font-semibold text-primaryColor mb-3 md:mb-4">تبدیل گفتار به متن</h1>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed">
          آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف،<br className="hidden md:block"/>
          زبان فارسی را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.
        </p>
      </div>
      
      <Tab.Group selectedIndex={selectedTabIndex} onChange={handleTabChange} className="w-full" >
        <Tab.List className="w-full px-4 md:px-8 flex justify-start text-gray-400 relative z-10 overflow-x-auto no-scrollbar">
          
          <Tab as={Fragment}>
            {({ selected }) => (
              <button className={`flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-3 rounded-t-xl md:rounded-t-2xl font-extralight text-sm md:text-base whitespace-nowrap outline-none transition-colors ${selected ? 'bg-primaryColor text-white' : 'hover:text-primaryColor text-gray-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                </svg>
                ضبط صدا
              </button>
            )}
          </Tab>
          
          <Tab as={Fragment}>
            {({ selected }) => (
              <button className={`flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-3 rounded-t-xl md:rounded-t-2xl font-extralight text-sm md:text-base whitespace-nowrap outline-none transition-colors ${selected ? 'bg-blue-400 text-white' : 'hover:text-blue-400'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
                بارگذاری فایل            
              </button>
            )}
          </Tab>
          
          <Tab as={Fragment}>
            {({ selected }) => (
              <button className={`flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-3 rounded-t-xl md:rounded-t-2xl font-extralight text-sm md:text-base whitespace-nowrap outline-none transition-colors ${selected ? 'bg-rose-500 text-white' : 'hover:text-rose-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
                لینک
              </button>
            )}
          </Tab>

        </Tab.List>

        <Tab.Panels className='w-full px-4 md:px-8'>
          <Tab.Panel><RecordSpeech/></Tab.Panel>
          <Tab.Panel><UploadFile/></Tab.Panel>
          <Tab.Panel><LinkUpload/></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="w-full flex items-center gap-2 md:gap-3 justify-end mt-4 px-4 md:px-8">
        <span className='text-xs md:text-sm text-gray-400 font-extralight'>زبان گفتار:</span>
        
        <Listbox value={selectedLang} onChange={handleLanguageChange}>
          <div className="relative">
            <Listbox.Button className="flex items-center gap-1 md:gap-2 border border-primaryColor text-primaryColor px-4 md:px-6 py-1 md:py-1.5 rounded-full text-xs md:text-sm hover:bg-primaryColor/10 transition outline-none cursor-pointer">
              {selectedLang.name}
              <img src={dropIcon} alt="drop Icon" className={`w-3 h-3 md:w-auto md:h-auto rotate-180`} />
            </Listbox.Button>
            
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute right-0 bottom-full mb-2 w-full min-w-25 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden outline-none">
                {languages.map((lang) => (
                <Listbox.Option key={lang.id} value={lang} as={Fragment}>
                    {({ active, selected }) => (
                    <li className={`cursor-pointer py-2 px-4 text-center text-xs md:text-sm transition-colors ${active ? 'bg-primaryColor/10 text-primaryColor font-medium' : 'text-gray-600'} ${selected ? 'bg-primaryColor/5' : ''}`}>
                        {lang.name}
                    </li>)}
                </Listbox.Option>
  ))}
</Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        
      </div>
    </div>
  );
}
