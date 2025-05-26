import React, { useContext, useEffect, useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';
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
import EmptyState from '../../components/EmptyState';

const UserDashboard = () => {
  useUserAuth();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const COLORS = ['#8D51FF', '#00B8DB', '#7BCE00'];

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || {};
    const taskPriorityLevels = data?.taskPriorityLevels || {};

    const taskDistributionData = [
      { status: 'Pending', count: taskDistribution.Pending || 0 },
      { status: 'In Progress', count: taskDistribution.InProgress || 0 },
      { status: 'Completed', count: taskDistribution.Completed || 0 },
    ];
    setPieChartData(taskDistributionData.some((item) => item.count > 0) ? taskDistributionData : []);

    const priorityLevelData = [
      { priority: 'Low', count: taskPriorityLevels.Low || 0 },
      { priority: 'Medium', count: taskPriorityLevels.Medium || 0 },
      { priority: 'High', count: taskPriorityLevels.High || 0 },
    ];
    setBarChartData(priorityLevelData.some((item) => item.count > 0) ? priorityLevelData : []);
  };

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_USERS_BY_ID(user._id));
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  }

  const fetchDashboardData = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA);
      setDashboardData(data);
      prepareChartData(data?.charts || {});
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleSeeMore = () => navigate('/user/tasks');

  useEffect(() => {
    fetchDashboardData();
    getUserData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5 ">
        <div className="col-span-3">
          <h2 className="text-xl md:text-2xl dark:text-white">{getGreetingMessage()}! {user?.name}</h2>
          <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
            {moment().format('dddd Do MMM YYYY')}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          {[
            { label: 'Total Tasks', value: dashboardData?.charts?.taskDistribution?.All, color: 'bg-primary' },
            { label: 'Pending Tasks', value: dashboardData?.charts?.taskDistribution?.Pending, color: 'bg-violet-500' },
            { label: 'In Progress Tasks', value: dashboardData?.charts?.taskDistribution?.InProgress, color: 'bg-cyan-500' },
            { label: 'Completed Tasks', value: dashboardData?.charts?.taskDistribution?.Completed, color: 'bg-lime-500' },
          ].map((info, index) => (
            <InfoCard
              key={index}
              label={info.label}
              value={addThousandsSeparator(info.value || 0)}
              color={info.color}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div className="card">
          <h5 className="font-medium dark:text-white">Task Distribution</h5>
          {pieChartData.length > 0 ? (
            <CustomPieChart data={pieChartData} colors={COLORS} />
          ) : (
            <EmptyState message="No data available for task distribution." />
          )}
        </div>
        <div className="card">
          <h5 className="font-medium dark:text-white">Task Priority Levels</h5>
          {barChartData.length > 0 ? (
            <CustomBarChart data={barChartData} />
          ) : (
            <EmptyState message="No data available for task priorities." />
          )}
        </div>
        <div className="md:col-span-2 card">
          <div className="flex items-center justify-between">
            <h5 className="text-lg dark:text-white">Recent Tasks</h5>
            <button className="card-btn" onClick={handleSeeMore}>
              See All <LuArrowRight className="text-base" />
            </button>
          </div>
          {dashboardData?.recentTasks?.length > 0 ? (
            <TaskListTable tableData={dashboardData.recentTasks} />
          ) : (
            <EmptyState message="No recent tasks found." />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;