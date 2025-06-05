import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

const LandingHeader = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <section
            className={`w-full px-8 sticky top-0 z-50 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
            id="header">
            <div className="container flex flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
                <div className="relative flex flex-row items-center justify-between w-full md:w-auto">
                    <a href="#"
                        className="text-lg font-semibold leading-none select-none">
                        Task Maestro
                    </a>
                    <button
                        className="inline-flex items-center justify-center p-2 rounded-md md:hidden hover:text-primary focus:outline-none"
                        onClick={toggleMenu}>
                        {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>
                </div>

                <nav
                    className={`flex-col md:flex md:flex-row md:items-center md:static fixed top-0 right-0 h-full w-2/3 max-w-xs
                     ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg transform z-50 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} 
                     transition-transform duration-300 ease-in-out md:translate-x-0 md:shadow-none`}
                >
                    <button
                        className="absolute top-5 right-5 md:hidden"
                        onClick={toggleMenu}
                    >
                        <FiX className="w-6 h-6" />
                    </button>

                    <a
                        href="#home"
                        className="block px-4 py-2 mt-2 text-md font-medium hover:text-primary md:mt-0 whitespace-nowrap"
                    >
                        Home
                    </a>
                    <a
                        href="#about"
                        className="block px-4 py-2 mt-2 text-md font-medium hover:text-primary md:mt-0 whitespace-nowrap"
                    >
                        About Us
                    </a>
                    <a
                        href="#features"
                        className="block px-4 py-2 mt-2 text-md font-medium hover:text-primary md:mt-0 whitespace-nowrap"
                    >
                        Features
                    </a>
                    <a
                        href="#contact"
                        className="block px-4 py-2 mt-2 text-md font-medium hover:text-primary md:mt-0 whitespace-nowrap"
                    >
                        Contact Us
                    </a>

                    <Link to="/signup" className="block px-4 py-2 mt-4 md:hidden">
                        <button
                            className="w-full inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-[#4f46e5] border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-indigo-500 cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </Link>
                    <button
                        className="flex items-center px-4 py-2 mt-4 text-base font-medium leading-6 whitespace-no-wrap focus:outline-none cursor-pointer md:hidden"
                        onClick={toggleDarkMode}
                    >
                        {darkMode ? <FiSun className="w-6 h-6 text-yellow-500" /> : <FiMoon className="w-6 h-6 text-gray-700" />}
                    </button>
                </nav>

                <div className="hidden md:flex items-center ml-5 space-x-6 lg:justify-end">
                    <Link to="/signup">
                        <button
                            className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-[#4f46e5] border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-indigo-500 cursor-pointer">
                            Sign Up
                        </button>
                    </Link>
                    <button
                        className="px-4 py-2 text-base font-medium leading-6 whitespace-no-wrap focus:outline-none cursor-pointer"
                        onClick={toggleDarkMode}
                    >
                        {darkMode ? <FiSun className="w-6 h-6 text-yellow-500" /> : <FiMoon className="w-6 h-6 text-gray-700" />}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LandingHeader;
