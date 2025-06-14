import React from 'react';
import Progress from '../Progress';
import AvatarGroup from './../AvatarGroup';
import { LuPaperclip } from 'react-icons/lu';
import moment from 'moment';

const TaskCard = ({
    title,
    description,
    priority,
    status,
    progress,
    createdAt,
    dueDate,
    assignedTo,
    attachmentCount,
    completedTodoCount,
    todoChecklist,
    onClick,
}) => {

    const getStatusTagColor = () => {
        switch (status) {
            case "In Progress":
                return "text-cyan-500 bg-cyan-50 border border-cyan-500/10 dark:text-cyan-400 dark:bg-cyan-900/50 dark:border-cyan-600/20";
            case "Completed":
                return "text-lime-500 bg-lime-50 border border-lime-500/20 dark:text-lime-400 dark:bg-lime-900/50 dark:border-lime-600/20";
            default:
                return "text-violet-500 bg-violet-50 border border-violet-500/10 dark:text-violet-400 dark:bg-violet-900/50 dark:border-violet-600/20";
        }
    };

    const getPriorityTagColor = () => {
        switch (priority) {
            case "Low":
                return "text-emerald-500 bg-emerald-50 border border-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-900/50 dark:border-emerald-600/20";
            case "Medium":
                return "text-amber-500 bg-amber-50 border border-amber-500/10 dark:text-amber-400 dark:bg-amber-900/50 dark:border-amber-600/20";
            default:
                return "text-rose-500 bg-rose-50 border border-rose-500/10 dark:text-rose-400 dark:bg-rose-900/50 dark:border-rose-600/20";
        }
    };

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-xl py-4 shadow-md shadow-gray-100 dark:shadow-none border border-gray-200/50 dark:border-gray-700 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-end gap-3 px-4">
                <div className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}>
                    {status}
                </div>
                <div className={`text-[11px] font-medium ${getPriorityTagColor()} px-4 py-0.5 rounded`}>
                    {priority} Priority
                </div>
            </div>
            <div
                className={`px-4 border-l-[3px] 
                ${status === "In Progress"
                        ? "border-cyan-500 dark:border-cyan-400"
                        : status === "Completed"
                            ? "border-indigo-500 dark:border-indigo-400"
                            : "border-violet-500 dark:border-violet-400"
                    }`}
            >
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-4 line-clamp-2">
                    {title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-[18px]">
                    {description}
                </p>
                <p className="text-[13px] text-gray-700/80 dark:text-gray-300 font-medium mt-2 mb-2 leading-[18px]">
                    Task Done:{" "}
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                        {completedTodoCount} / {todoChecklist.length || 0}
                    </span>
                </p>
                <Progress progress={progress} status={status} />
            </div>

            <div className="px-4">
                <div className="flex items-center justify-between my-1">
                    <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400">Start Date</label>
                        <p className="text-[13px] font-medium text-gray-900 dark:text-gray-200">
                            {moment(createdAt).format("Do MM YYYY")}
                        </p>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400">Due Date</label>
                        <p className="text-[13px] font-medium text-gray-900 dark:text-gray-200">
                            {moment(dueDate).format("Do MM YYYY")}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <AvatarGroup avatars={assignedTo || []} />
                    {attachmentCount > 0 && (
                        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/50 px-2.5 py-1.5 rounded-lg">
                            <LuPaperclip className='text-primary dark:text-blue-300' />{" "}
                            <span className="text-xs text-gray-900 dark:text-gray-300">{attachmentCount}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
