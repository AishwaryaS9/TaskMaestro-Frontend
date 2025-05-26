import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = localStorage.getItem("token");
            if (!accessToken) {
                setLoading(false);
                return;
            }
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (error) {
                console.error("User not authenticated:", error);
                clearUser();
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const updateUser = (updatedFields) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...updatedFields,
            createdAt: updatedFields?.createdAt || prevUser?.createdAt,
            updatedAt: updatedFields?.updatedAt || new Date().toISOString(),
        }));

        if (updatedFields.token) {
            localStorage.setItem("token", updatedFields.token);
        }
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
