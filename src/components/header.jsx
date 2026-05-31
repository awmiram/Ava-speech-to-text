import { Menu } from '@headlessui/react';
import userIcon from '../assets/icons/headerIcons/userIcon.svg';
import dropIcon from '../assets/icons/headerIcons/dropIcon.svg';

export default function Header() {
  return (
    <header className="w-full flex justify-end p-8">
      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <div className="opacity-0 pointer-events-none flex items-center gap-2 px-4 py-2 border-2 border-transparent">
              <img src={userIcon} alt="hidden" />
              <span className="text-sm font-semibold">مهمان</span>
              <img src={dropIcon} alt="hidden" />
            </div>

            <div className={`absolute top-0 right-0 z-50 w-full flex flex-col border-2 border-primaryColor text-primaryColor bg-white ${open ? 'rounded-2xl shadow-md' : 'rounded-full'}`}>
              <Menu.Button className={`flex items-center gap-2 px-4 py-2 w-full transition-colors hover:bg-primaryColor/10 outline-none cursor-pointer ${open ? 'rounded-t-2xl' : 'rounded-full'}`}>
                <img src={userIcon} alt="user Icon" />
                <span className="text-sm font-semibold">مهمان</span>
                <img src={dropIcon} alt="drop Icon" className={`transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
              </Menu.Button>
              <Menu.Items className="flex flex-col px-4 hover:bg-primaryColor/10 transition-colors outline-none rounded-b-2xl">
                <hr className="border-primaryColor/50" />
                <Menu.Item>
                  {({ active }) => (
                    <button className={`flex items-center justify-center gap-2 py-2 rounded-lg w-full transition-colors cursor-pointer ${active ? 'bg-primaryColor/5' : ''}`}>
                      <svg width="12.607" height="14" viewBox="0 0 12.607 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <g transform="translate(0.5 0.5)"> <g transform="translate(3.25 6.5)"> <path d="M0 0L8.35714 0" fill="none" strokeWidth="1" stroke="#00BA9F" strokeLinecap="round" strokeLinejoin="round" /> </g> <g> <path d="M5.74553 0L1.45089 0C0.638393 0 0 0.638393 0 1.39286L0 11.5491C0 12.3616 0.638393 13 1.45089 13L5.74553 13" fill="none" strokeWidth="1" stroke="#00BA9F" strokeLinecap="round" strokeLinejoin="round" /> </g> <path d="M0 0L2.20536 2.20536L0 4.41071" fill="none" strokeWidth="1" stroke="#00BA9F" strokeLinecap="round" strokeLinejoin="round" transform="translate(9.402 4.295)" /> </g></svg>
                      <span className="text-sm font-semibold">خروج</span>
                    </button>
                  )}
                </Menu.Item>

              </Menu.Items>
            </div>
          </>
        )}
      </Menu>
    </header>
  );
}
