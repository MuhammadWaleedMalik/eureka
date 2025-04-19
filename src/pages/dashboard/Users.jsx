import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/user/get`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.user)) {
          setUsers(data.user);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="bg-black shadow-xl rounded-2xl p-6 border border-gray-800">
      <h1 className="text-2xl font-semibold text-gray-100 mb-6">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-900">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                Email
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-900 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;