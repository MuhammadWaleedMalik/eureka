import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data= [
  { name: 'Jan', users: 40 },
  { name: 'Feb', users: 30 },
  { name: 'Mar', users: 60 },
  { name: 'Apr', users: 40 },
  { name: 'May', users: 70 },
  { name: 'Jun', users: 65 },
  { name: 'Jul', users: 80 },
  { name: 'Aug', users: 75 },
  { name: 'Sep', users: 90 },
  { name: 'Oct', users: 85 },
  { name: 'Nov', users: 95 },
  { name: 'Dec', users: 100 },
];

const UserChart = () => {
  return (
    <div className="card h-80">
      <h3 className="text-lg font-medium text-text-light mb-4">User Growth</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="var(--color-primary)"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserChart;