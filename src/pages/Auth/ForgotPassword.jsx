import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/Inputs/Input';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { ThemeContext } from '../../context/ThemeContext';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, { email });
            setMessage("If this email is registered, you will receive a password reset link.");
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <AuthLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
            <div
                className={`lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center ${darkMode ? 'text-white' : 'text-black'}`}
            >
                <h3 className="text-xl font-semibold">
                    Forgot Password
                </h3>
                <p className={`text-xs mt-[5px] mb-6 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                    Enter your email address and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleForgotPassword}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="john@example.com"
                        type="email"
                    />
                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                    {message && <p className='text-green-500 text-xs pb-2.5'>{message}</p>}
                    <button
                        type='submit'
                        className={`btn-primary ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : ''}`}
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;
