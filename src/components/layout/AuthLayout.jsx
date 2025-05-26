import React from 'react';
import UI_IMG from '../../assets/images/auth-img.jpg';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, darkMode, toggleDarkMode }) => {
    const navigate = useNavigate();

    return (
        <div className={`flex ${darkMode ? 'dark' : ''} min-h-screen relative`}>
            <div className={`relative w-full md:w-[60vw] min-h-screen flex flex-col justify-start px-8 pt-6 pb-8 transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <h2 className="text-lg font-semibold cursor-pointer" onClick={() => navigate('/')}>
                    Task Maestro
                </h2>
                {children}
            </div>

            <div className="relative hidden md:flex w-[40vw] h-screen bg-blue-50 bg-cover bg-no-repeat bg-center overflow-hidden">
                <img src={UI_IMG}
                    className="w-full h-full object-cover"
                    alt="UI Illustration" />
                <button
                    onClick={toggleDarkMode}
                    className="absolute top-4 right-4 z-50 rounded-full p-2"
                    aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                >
                    {darkMode ? (
                        <FiSun className="text-yellow-400 w-5 h-5" />
                    ) : (
                        <FiMoon className="text-white w-5 h-5" />
                    )}
                </button>
            </div>

            <button
                onClick={toggleDarkMode}
                className="fixed top-4 right-4 z-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:hidden"
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
                {darkMode ? (
                    <FiSun className="text-yellow-400 w-5 h-5" />
                ) : (
                    <FiMoon className="text-gray-800 w-5 h-5" />
                )}
            </button>
        </div>
    );
};

export default AuthLayout;
