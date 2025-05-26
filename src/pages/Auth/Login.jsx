import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import { ThemeContext } from '../../context/ThemeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }
    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, role } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold">
          Welcome Back
        </h3>
        <p className="text-xs mt-[5px] mb-6">
          Please enter your details to log in
        </p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <p className="text-[13px] text-slate-800 my-3 text-right">
            <Link className='font-medium text-primary underline' to="/forgotpassword">
              Forgot Password?
            </Link>
          </p>
          <button type="submit" className="btn-primary">
            {loading ? "LOGGING IN" : "LOGIN"}
          </button>
          <p className="text-[13px] mt-3">
            Don't have an account?{' '}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
