import { NavLink } from 'react-router-dom';

import siteTitleIcon from '../assets/icons/sideBarIcons/site-title.svg'
import sidebarPattern from '../assets/icons/sideBarIcons/sidebarPattern.svg';
import speechIcon from '../assets/icons/sideBarIcons/speechIcon.svg'
import archiveIcon from '../assets/icons/sideBarIcons/archiveIcon.svg'

export default function SideBar() {
  return (
    <aside className="w-41 text-white flex flex-col h-full rounded-tl-lg" style={{ backgroundImage: `url(${sidebarPattern}), linear-gradient(to bottom, var(--color-primaryColor), var(--color-secondprimaryColor))` }} >
      <div className="flex items-center justify-center text-3xl font-bold mb-16">
      <img src={siteTitleIcon} alt="Site Title" className="w-14 h-10 mt-12" />
      </div>
      <nav className="flex justify-center items-center flex-col gap-2 px-4 mt-24">

        <NavLink to="/" className={({ isActive }) => ` w-36 flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 text-white ${isActive ? ' bg-primaryDark ' : 'hover:bg-primaryDark/50 '}`}>
          <img src={speechIcon} alt="speech Icon" className='w-6 h-6' />
          <span className='text-nowrap ' >تبدیل گفتار</span>
        </NavLink>

        <NavLink to="/archive" className={({ isActive }) => ` w-36 flex items-center gap-6 px-4  py-3 rounded-2xl font-medium transition-all duration-300 mt-2 text-white ${isActive ? 'bg-primaryDark ' : 'hover:bg-primaryDark/50 '}`}>
          <img src={archiveIcon} alt="arcihve Icon" className='w-6 h-6' />
          <span>آرشیو</span>
        </NavLink>
      </nav> 
    </aside>
  );
}
