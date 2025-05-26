import React, { useEffect, useState } from 'react';
import DashboardLayout from './../../components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import TaskStatusTabs from '../../components/TaskStatusTabs';
import TaskCard from '../../components/Cards/TaskCard';
import notaskimage from '../../assets/images/notask.png';
import { SyncLoader } from 'react-spinners';

const MyTasks = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getAllTasks = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
                params: {
                    status: filterStatus === "All" ? "" : filterStatus,
                },
            });
            setAllTasks(() => {
                return response.data?.tasks?.length > 0 ? response.data.tasks : []
            });
            const statusSummary = response.data?.statusSummary || {};

            const statusArray = [
                { label: "All", count: statusSummary.all || 0 },
                { label: "Pending", count: statusSummary.pendingTasks || 0 },
                { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
                { label: "Completed", count: statusSummary.completedTasks || 0 },
            ];
            setTabs(statusArray);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (taskId) => {
        if (taskId) {
            navigate(`/user/task-details/${taskId}`);
        }
    };

    useEffect(() => {
        getAllTasks(filterStatus);
    }, [filterStatus]);

    return (
        <DashboardLayout activeMenu="My Tasks">
            <div className="my-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <h2 className="text-xl md:text-xl font-medium dark:text-white">My Tasks</h2>
                    {tabs?.[0]?.count > 0 && (
                        <TaskStatusTabs
                            tabs={tabs}
                            activeTab={filterStatus}
                            setActiveTab={setFilterStatus}
                        />
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <SyncLoader size={8} color="#1368EC" />
                    </div>
                ) : allTasks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {allTasks.map((item) => (
                            <TaskCard
                                key={item._id}
                                title={item.title}
                                description={item.description}
                                priority={item.priority}
                                status={item.status}
                                progress={item.progress}
                                createdAt={item.createdAt}
                                dueDate={item.dueDate}
                                assignedTo={item?.assignedTo?.map((assignee) => assignee?.profileImageUrl)}
                                attachmentCount={item.attachments?.length || 0}
                                completedTodoCount={item.completedTodoCount || 0}
                                todoChecklist={item.todoChecklist || []}
                                onClick={() => {
                                    handleClick(item._id);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-10">
                        <img
                            src={notaskimage}
                            alt="No tasks available"
                            className="w-40 h-40 my-12"
                        />
                        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mt-4 mr-8">
                            {filterStatus === "All" &&
                                "It looks like you don't have any tasks assigned yet."}
                            {filterStatus === "Pending" &&
                                "It looks like you don't have any pending tasks."}
                            {filterStatus === "In Progress" &&
                                "It looks like you don't have any in-progress tasks."}
                            {filterStatus === "Completed" &&
                                "It looks like you don't have any completed tasks."}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 mr-8">
                            Check back later for updates or contact your team for more information.
                        </p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MyTasks;
