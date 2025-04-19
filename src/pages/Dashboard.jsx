import { useTranslation } from 'react-i18next';
import StatCard from '../components/StatCard';
import UserChart from '../components/UserChart';
import { 
  FaUsers, 
  FaMoneyBillWave, 
  FaExchangeAlt, 
  FaDollarSign, 
  FaStickyNote, 
  FaPhoneAlt 
} from 'react-icons/fa';
import { StatCardData } from '../types';

const Dashboard = () => {
  const { t } = useTranslation();

  const statCards = [
    {
      title: t('totalOrganization'),
      value: "1",
      icon: <FaUsers size={24} />
    },
    {
      title: t('totalSubscription'),
      value: "1",
      icon: <FaMoneyBillWave size={24} />
    },
    {
      title: t('totalTransaction'),
      value: "0",
      icon: <FaExchangeAlt size={24} />
    },
    {
      title: t('totalIncome'),
      value: "0",
      icon: <FaDollarSign size={24} />
    },
    {
      title: t('totalNotes'),
      value: "0",
      icon: <FaStickyNote size={24} />
    },
    {
      title: t('totalContact'),
      value: "0",
      icon: <FaPhoneAlt size={24} />
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">{t('dashboard')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatCard 
          title={statCards[0].title} 
          value={statCards[0].value} 
          icon={statCards[0].icon} 
        />
        <StatCard 
          title={statCards[1].title} 
          value={statCards[1].value} 
          icon={statCards[1].icon} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatCard 
          title={statCards[2].title} 
          value={statCards[2].value} 
          icon={statCards[2].icon} 
        />
        <StatCard 
          title={statCards[3].title} 
          value={statCards[3].value} 
          icon={statCards[3].icon} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatCard 
          title={statCards[4].title} 
          value={statCards[4].value} 
          icon={statCards[4].icon} 
        />
        <StatCard 
          title={statCards[5].title} 
          value={statCards[5].value} 
          icon={statCards[5].icon} 
        />
      </div>

      <div className="mt-8">
        <UserChart />
      </div>
    </div>
  );
};

export default Dashboard;