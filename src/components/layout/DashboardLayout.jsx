import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark:bg-gray-800' : ''}`}>
      <Navbar activeMenu={activeMenu} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
