import React, { useContext, useEffect, useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';
import { ThemeContext } from '../../context/ThemeContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import InfoCard from '../../components/Cards/InfoCard';
import { addThousandsSeparator, getGreetingMessage } from '../../utils/helper';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../components/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';
import { SyncLoader } from 'react-spinners';

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const Dashboard = () => {
    useUserAuth();

    const { user, setUser, loading } = useContext(UserContext);
    const { darkMode } = useContext(ThemeContext);

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);

    const prepareChartData = (data) => {
        const taskDistribution = data?.taskDistribution || {};
        const taskPriorityLevels = data?.taskPriorityLevels || {};

        setPieChartData([
            { status: "Pending", count: taskDistribution.Pending || 0 },
            { status: "In Progress", count: taskDistribution.InProgress || 0 },
            { status: "Completed", count: taskDistribution.Completed || 0 },
        ]);

        setBarChartData([
            { priority: "Low", count: taskPriorityLevels.Low || 0 },
            { priority: "Medium", count: taskPriorityLevels.Medium || 0 },
            { priority: "High", count: taskPriorityLevels.High || 0 },
        ]);
    };


    const getUserData = async () => {
        if (!user || !user._id) {
            console.warn("User is not available, skipping fetch.");
            return;
        }

        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_USERS_BY_ID(user._id));
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching admin details:", error);
        }
    };

    const getDashboardData = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
            if (response.data) {
                //   setDashboardData(response.data);
                setDashboardData(() => {
                    return response.data;
                })
                prepareChartData(response.data?.charts || {});
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    const onSeeMore = () => {
        navigate("/admin/tasks");
    };

    // useEffect(() => {
    //     if (!loading) {
    //         getDashboardData();
    //         getUserData();
    //     }
    // }, [loading]);

    useEffect(() => {
        getDashboardData();
        getUserData();
    }, []);

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <DashboardLayout activeMenu="Dashboard">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <SyncLoader size={8} color="#1368EC" />
                </div>
            ) : (
                <>
                    <div className={`card my-5 ${darkMode ? 'dark:bg-gray-800 dark:text-white' : ''}`}>
                        <div>
                            <div className="col-span-3">
                                <h2 className="text-xl md:text-2xl">{getGreetingMessage()}! {user?.name}</h2>
                                <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
                                    {moment().format("dddd Do MMM YYYY")}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
                            <InfoCard
                                label="Total Tasks"
                                value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.All || 0)}
                                // value={addThousandsSeparator(dashboardData?.statistics?.totalTasks || 0)}
                                color="bg-primary"
                            />
                            <InfoCard
                                label="Pending Tasks"
                                value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Pending || 0)}
                                // value={addThousandsSeparator(dashboardData?.statistics?.pendingTasks || 0)}
                                color="bg-violet-500"
                            />
                            <InfoCard
                                label="In Progress Tasks"
                                value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.InProgress || 0)}
                                color="bg-cyan-500"
                            />
                            <InfoCard
                                label="Completed Tasks"
                                value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Completed || 0)}
                                // value={addThousandsSeparator(dashboardData?.statistics?.completedTasks || 0)}
                                color="bg-lime-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
                        <div>
                            <div className={`card ${darkMode ? 'dark:bg-gray-800 dark:text-white' : ''}`}>
                                <div className="flex items-center justify-between">
                                    <h5 className="font-medium">Task Distribution</h5>
                                </div>
                                <CustomPieChart data={pieChartData} colors={COLORS} />
                            </div>
                        </div>

                        <div>
                            <div className={`card ${darkMode ? 'dark:bg-gray-800 dark:text-white' : ''}`}>
                                <div className="flex items-center justify-between">
                                    <h5 className="font-medium">Task Priority Levels</h5>
                                </div>
                                <CustomBarChart data={barChartData} />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <div className={`card ${darkMode ? 'dark:bg-gray-800 dark:text-white' : ''}`}>
                                <div className="flex items-center justify-between">
                                    <h5 className="text-lg">Recent Tasks</h5>
                                    <button className="card-btn" onClick={onSeeMore}>
                                        See All <LuArrowRight className="text-base" />
                                    </button>
                                </div>
                                <TaskListTable tableData={dashboardData?.recentTasks || []} />
                            </div>
                        </div>
                    </div>
                </>

            )}
        </DashboardLayout>
    );
};

export default Dashboard;
