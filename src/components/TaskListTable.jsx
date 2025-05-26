import React from 'react';
import moment from 'moment';

const TaskListTable = ({ tableData }) => {

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-300 border border-green-200 dark:border-green-600';
      case 'Pending': return 'bg-purple-100 text-purple-500 dark:bg-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-600';
      case 'In Progress': return 'bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-600';
      default: return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-600';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-300 border border-red-200 dark:border-red-600';
      case 'Medium': return 'bg-orange-100 text-orange-500 dark:bg-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-600';
      case 'Low': return 'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-300 border border-green-200 dark:border-green-600';
      default: return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-600';
    }
  };

  return (
    <div className='overflow-x-auto p-0 rounded-lg mt-3 bg-white dark:bg-gray-900'>
      <table className="min-w-full">
        <thead className="dark:bg-gray-900">
          <tr className="text-left">
            <th className="py-3 px-4 text-gray-800 dark:text-gray-300 font-medium text-[13px]">
              Name
            </th>
            <th className="py-3 px-4 text-gray-800 dark:text-gray-300 font-medium text-[13px]">
              Status
            </th>
            <th className="py-3 px-4 text-gray-800 dark:text-gray-300 font-medium text-[13px]">
              Priority
            </th>
            <th className="py-3 px-4 text-gray-800 dark:text-gray-300 font-medium text-[13px] hidden md:table-cell">
              Created On
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((task) => (
            <tr key={task._id} className='border-t border-gray-200 dark:border-gray-700'>
              <td className="my-3 mx-4 text-gray-700 dark:text-gray-300 text-[13px] line-clamp-1 overflow-hidden">
                {task.title}
              </td>
              <td className="py-4 px-4">
                <span className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(task.status)}`}>
                  {task.status}
                </span>
              </td>
              <td className='py-4 px-4'>
                <span className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(task.priority)}`}>
                  {task.priority}
                </span>
              </td>
              <td className="py-4 px-4 text-[13px] text-nowrap hidden md:table-cell text-gray-700 dark:text-gray-300">
                {task.createdAt ? moment(task.createdAt).format('Do MM YYYY') : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;
