import React, { useEffect, useState, useContext } from 'react';
import LandingHeader from './../components/Landing/LandingHeader';
import Hero from './../components/Landing/Hero';
import About from './../components/Landing/About';
import Services from './../components/Landing/Services';
import Footer from './../components/Landing/Footer';
import { IoMdArrowDropup } from "react-icons/io";
import { ThemeContext } from './../context/ThemeContext';
import ContactUs from '../components/Landing/ContactUs';

const LandingPage = () => {
    const { darkMode } = useContext(ThemeContext);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}>
            <LandingHeader />
            <Hero darkMode={darkMode} />
            <About darkMode={darkMode} />
            <Services darkMode={darkMode} />
            <ContactUs darkMode={darkMode} />
            <Footer darkMode={darkMode} />
            {showScrollTop && (
                <a
                    href="#scrolltop"
                    id="scrolltop"
                    className="scrolltop cursor-pointer fixed bottom-5 right-5 p-2 bg-indigo-500 rounded-full text-white"
                    onClick={handleScrollToTop}
                >
                    <IoMdArrowDropup />
                </a>
            )}
        </div>
    );
};

export default LandingPage;
