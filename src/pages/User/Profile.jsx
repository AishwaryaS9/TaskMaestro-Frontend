
import React, { useContext, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { UserContext } from '../../context/userContext';
import EditProfileModal from '../../components/EditProfileModal';
import userImg from '../../assets/images/userimg.png';

const Profile = () => {
    const { user, updateUser, loading } = useContext(UserContext);

    const [openEditModal, setOpenEditModal] = useState(false);

    const handleOpenEditModal = () => {
        setOpenEditModal(true);
    };

    const handleProfileUpdate = (updatedUser) => {
        if (updateUser) {
            updateUser(updatedUser);
        }
        setOpenEditModal(false);
    };

    if (loading) {
        return (
            <DashboardLayout activeMenu="My Profile">
                <div className="my-5 text-center text-gray-500">Loading profile...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout activeMenu="My Profile">
            <div className="my-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <h2 className="text-xl md:text-xl font-medium dark:text-white">My Profile</h2>
                </div>
                {user ? (
                    <div className="bg-white p-8 rounded-xl mt-4 max-w-3xl mx-auto dark:bg-gray-800 dark:shadow-none border border-gray-200/50 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-6">
                            <img
                                src={user.profileImageUrl || userImg}
                                alt={`${user.name}'s profile`}
                                className="w-32 h-32 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-[18px] font-medium dark:text-gray-400">{user.name}</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">{user.email}</p>
                                <span className="inline-block px-3 py-1 mt-2 text-[12px] text-white bg-primary rounded">
                                    {user.role?.toUpperCase() || ''}
                                </span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="flex items-center p-4 rounded-lg">
                                <p className="text-gray-600 font-medium text-[14px] dark:text-gray-400">Member Since:</p>
                                {user?.createdAt ? (
                                    <p className="text-gray-800 text-[14px] pl-2 dark:text-gray-400">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </p>
                                ) : (
                                    <p className="text-gray-800 text-[14px] pl-2 dark:text-gray-400">Loading...</p>
                                )}
                            </div>
                            <div className="flex items-center p-4 rounded-lg mt-4">
                                <p className="text-gray-600 font-medium text-[14px] dark:text-gray-400">Last Updated:</p>
                                {user?.updatedAt ? (
                                    <p className="text-gray-800 text-[14px] pl-2 dark:text-gray-400">
                                        {new Date(user.updatedAt).toLocaleDateString()}
                                    </p>
                                ) : (
                                    <p className="text-gray-800 text-[14px] pl-2 dark:text-gray-400">Loading...</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="justify-center rounded-lg text-center bg-primary text-white w-24 h-10 cursor-pointer"
                                onClick={handleOpenEditModal}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-40 bg-gray-100 rounded-lg shadow-inner">
                        <p className="text-gray-500 text-lg">No user information available.</p>
                    </div>
                )}
            </div>
            <EditProfileModal
                isOpen={openEditModal}
                onClose={() => setOpenEditModal(false)}
                title="Edit Profile"
                userDetails={user}
                onProfileUpdate={handleProfileUpdate}
            />
        </DashboardLayout>
    );
};

export default Profile;
