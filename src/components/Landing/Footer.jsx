import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ darkMode }) => {
    const currentYear = new Date().getFullYear();

    return (
        <section
            className={`transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-500'
                }`}
            id="contact"
        >
            <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                    <div className="px-5 py-2">
                        <a
                            href="#about"
                            className={`text-base leading-6 hover:${darkMode ? 'text-gray-100' : 'text-gray-900'
                                }`}
                        >
                            About
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a
                            href="#features"
                            className={`text-base leading-6 hover:${darkMode ? 'text-gray-100' : 'text-gray-900'
                                }`}
                        >
                            Features
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a
                            href="#"
                            className={`text-base leading-6 hover:${darkMode ? 'text-gray-100' : 'text-gray-900'
                                }`}
                        >
                            Contact
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <Link
                            to="/termsandconditions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-base leading-6 hover:${darkMode ? 'text-gray-100' : 'text-gray-900'
                                }`}
                        >
                            Terms
                        </Link>
                    </div>
                </nav>
                <div className="flex justify-center mt-8 space-x-6">
                </div>
                <p className="mt-8 text-base leading-6 text-center">
                    &copy; Copyright Task Maestro {currentYear}. All rights reserved.
                </p>
            </div>
        </section>
    );
};

export default Footer;
