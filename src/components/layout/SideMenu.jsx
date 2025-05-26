import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from './../../utils/data';
import userImg from '../../assets/images/userimg.png';
import toast from 'react-hot-toast';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    toast.success("You've been logged out successfully. See you again soon!");
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
    return () => { };
  }, [user]);

  return (
    <div
      className={`w-64 h-[calc(100vh-61px)] bg-white dark:bg-gray-800 border-r border-gray-200/50 dark:border-gray-700 sticky top-[61px] z-20`}>
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative">
          <img
            src={user?.profileImageUrl || userImg}
            alt='Profile Image'
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        </div>
        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}
        <h5 className="text-gray-950 dark:text-white font-medium leading-6 mt-3">
          {user?.name || ""}
        </h5>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">{user?.email || ""}</p>
      </div>
      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 mb-3 cursor-pointer transition-all
            ${activeMenu === item.label
              ? "text-primary bg-blue-50/40 dark:bg-gray-700 border-r-4 border-primary"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          onClick={() => handleClick(item.path)}>
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
