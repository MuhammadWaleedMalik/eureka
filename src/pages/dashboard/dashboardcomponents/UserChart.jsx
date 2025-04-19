import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const UserStat = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        console.log("API URL:", API_URL);
        const response = await fetch(`${API_URL}/api/v1/dashboard/get`);
        const result = await response.json();

        if (result.success && result.data.length > 0) {
          const { usersThisMonth } = result.data[0];
          const currentMonthIndex = new Date().getMonth();
          const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];

          const updatedData = months.map((month, index) => ({
            name: month,
            users: index === currentMonthIndex ? usersThisMonth : 0,
          }));

          setData(updatedData);
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="bg-black shadow-xl rounded-2xl p-6 border border-gray-800">
      <h3 className="text-xl font-semibold text-gray-100 mb-5">User Statistics</h3>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#374151" 
            />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF" 
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF" 
              tick={{ fill: '#9CA3AF' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '4px',
                color: '#F3F4F6'
              }}
              itemStyle={{ color: '#F3F4F6' }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#60A5FA"
              strokeWidth={2.5}
              activeDot={{ 
                r: 8,
                fill: '#60A5FA',
                stroke: '#1F2937',
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserStat;