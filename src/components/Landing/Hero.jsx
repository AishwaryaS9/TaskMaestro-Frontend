import React from 'react';
import { FiArrowRight } from "react-icons/fi";
import hero from '../../assets/images/hero.png';
import { Link } from 'react-router-dom';

const Hero = ({ darkMode }) => {
    return (
        <section
            className={`px-2 py-32 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
            id="home">
            <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
                <div className="flex flex-wrap items-center sm:-mx-3">
                    <div className="w-full md:w-1/2 md:px-3">
                        <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-4xl lg:text-5xl xl:text-5xl">
                                <span className="block xl:inline">
                                    Stay Organized, Accomplish More with&nbsp;
                                </span>
                                <span className="block text-[#4f46e5] xl:inline">Task Maestro.</span>
                            </h1>
                            <p className={`mx-auto text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'} sm:max-w-md lg:text-xl md:max-w-3xl`}>
                                Your Productivity, Our Priority.
                            </p>
                            <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                                <Link
                                    to="/login"
                                    className={`flex items-center w-full px-6 py-3 mb-3 text-lg rounded-md sm:mb-0 sm:w-auto ${darkMode
                                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                        : 'bg-[#4f46e5] hover:bg-indigo-700 text-white'
                                        }`}
                                >
                                    Manage Your Tasks Now
                                    <FiArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                            <img
                                src={hero}
                                alt="Hero section illustration"
                                className={`${darkMode ? 'brightness-90' : ''}`} // Adjust brightness in dark mode
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;