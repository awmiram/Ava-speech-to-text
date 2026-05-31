import { Menu } from '@headlessui/react';

import userIcon from '../assets/icons/headerIcons/userIcon.svg';
import dropIcon from '../assets/icons/headerIcons/dropIcon.svg';
import logoutIcon from '../assets/icons/headerIcons/logout.svg'

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
                      <img src={logoutIcon} />
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
