import { useTranslation } from 'react-i18next';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { User } from '../types';

// Mock data for users
const users = [
  {
    id: 1,
    username: 'johndoe',
    email: 'john.doe@example.com',
    activePackages: ['Premium Plan', 'Support Package']
  },
  {
    id: 2,
    username: 'janedoe',
    email: 'jane.doe@example.com',
    activePackages: ['Basic Plan']
  },
  {
    id: 3,
    username: 'mikebrown',
    email: 'mike.brown@example.com',
    activePackages: ['Premium Plan']
  },
  {
    id: 4,
    username: 'sarahsmith',
    email: 'sarah.smith@example.com',
    activePackages: ['Enterprise Plan', 'Support Package', 'Analytics Add-on']
  },
  {
    id: 5,
    username: 'alexwilson',
    email: 'alex.wilson@example.com',
    activePackages: ['Basic Plan']
  }
];

const Users = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">{t('users')}</h1>
      
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('username')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('email')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('activePackages')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.activePackages.map((pkg, index) => (
                        <span key={index} className="px-2 py-1 text-xs font-medium bg-primary-light text-white rounded-full">
                          {pkg}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;


