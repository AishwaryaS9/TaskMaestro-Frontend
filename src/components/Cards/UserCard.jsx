import { useState } from 'react'
import StatCard from './StatCard'
import defaultImage from '../../assets/images/userimg.png';

const UserCard = ({ userInfo }) => {
    const [profileImage, setProfileImage] = useState(userInfo?.profileImageUrl || defaultImage);

    return (
        <div className='user-card p-2'>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={profileImage}
                        alt={`Avatar`}
                        className='w-12 h-12 rounded-full border-2 border-white'
                        onError={() => setProfileImage(defaultImage)}
                    />
                    <div>
                        <p className="text-sm font-medium dark:text-gray-100">{userInfo?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{userInfo?.email}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-end gap-3 mt-5">
                <StatCard
                    label="Pending"
                    count={userInfo?.pendingTasks || 0}
                    status="Pending"
                />
                <StatCard
                    label="In Progress"
                    count={userInfo?.inProgressTasks || 0}
                    status="In Progress"
                />
                <StatCard
                    label="Completed"
                    count={userInfo?.completedTasks || 0}
                    status="Completed"
                />
            </div>
        </div>
    )
}

export default UserCard