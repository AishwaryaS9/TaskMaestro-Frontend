import React from 'react';

const StatCard = ({ label, count, status }) => {

    const getStatusTagColor = () => {
        switch (status) {
            case "In Progress":
                return "text-cyan-600 bg-gray-100 dark:bg-cyan-200 dark:text-cyan-800";
            case "Completed":
                return "text-indigo-600 bg-gray-100 dark:bg-indigo-200 dark:text-indigo-800";
            default:
                return "text-violet-600 bg-gray-100 dark:bg-violet-200 dark:text-violet-800";
        }
    };

    return (
        <div className={`flex-1 text-[10px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}>
            <span className="text-[12px] font-semibold">
                {count}
            </span>
            <br />
            {label}
        </div>
    );
};

export default StatCard;
