import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <label className='text-[13px] text-slate-800 dark:text-gray-300'>
                {label}
            </label>
            <div className="input-box flex items-center border border-gray-300
             dark:border-gray-600 rounded-md px-3 py-2 mt-1 bg-white dark:bg-gray-700">
                <input
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className='w-full bg-transparent outline-none text-gray-900 dark:text-gray-100
                     placeholder-gray-400 dark:placeholder-gray-400'
                    value={value}
                    onChange={(e) => onChange(e)}
                />
                {type === "password" && (
                    showPassword ? (
                        <FaRegEye
                            size={22}
                            className='text-primary cursor-pointer dark:text-cyan-400'
                            onClick={toggleShowPassword}
                        />
                    ) : (
                        <FaRegEyeSlash
                            size={22}
                            className='text-slate-400 cursor-pointer dark:text-gray-400'
                            onClick={toggleShowPassword}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Input;
