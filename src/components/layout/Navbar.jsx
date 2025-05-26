import React, { useState } from 'react';
import SideMenu from './SideMenu';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = ({ activeMenu, darkMode, toggleDarkMode }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div
      className={`flex items-center justify-between px-5 py-3 border-b backdrop-blur-sm sticky top-0 z-30
      ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'}`}

    >
      <button
        className="block lg:hidden"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
      </button>

      <h2 className="text-lg font-semibold">Task Maestro</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white dark:bg-gray-800">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
      <button
        onClick={toggleDarkMode}
        className="cursor-pointer p-2 rounded-full focus:outline-none transition duration-300 dark:bg-gray-800 dark:text-white"
      >
        {darkMode ? <FiSun className="text-yellow-400 w-6 h-6" /> : <FiMoon className="text-gray-600 w-6 h-6" />}
      </button>

    </div>
  );
};

export default Navbar;
