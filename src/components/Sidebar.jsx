import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaHome, 
  FaUsers, 
  FaPhoneAlt, 
  FaStickyNote, 
  FaTag, 
  FaTicketAlt, 
  FaCog 
} from 'react-icons/fa';

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <aside className="w-64 bg-sidebar border-r border-gray-200 h-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold flex items-center">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 8.5V13.5C20 17.5 18 19.5 14 19.5H10C6 19.5 4 17.5 4 13.5V10.5C4 6.5 6 4.5 10 4.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 4.5H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 2.5V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.5 14L11.5 12L9.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.5 10L12.5 12L14.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          PolicyHub
        </h1>
      </div>
      <nav className="p-4">
        <div className="mb-6">
          <h2 className="sidebar-heading">{t('home')}</h2>
          <NavLink to="/" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <FaHome className="text-lg" />
            <span>{t('dashboard')}</span>
          </NavLink>
          <NavLink to="/users" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <FaUsers className="text-lg" />
            <span>{t('users')}</span>
          </NavLink>
        </div>

        <div className="mb-6">
          <h2 className="sidebar-heading">{t('businessManagement')}</h2>
          <NavLink to="/contact" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <FaPhoneAlt className="text-lg" />
            <span>{t('contact')}</span>
          </NavLink>
          <NavLink to="/note" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <FaStickyNote className="text-lg" />
            <span>{t('note')}</span>
          </NavLink>
        </div>

        <div className="mb-6">
          <h2 className="sidebar-heading">{t('systemSettings')}</h2>
          <NavLink to="/pricing" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <FaTag className="text-lg" />
            <span>{t('pricing')}</span>
          </NavLink>
          <NavLink to="/coupons" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <FaTicketAlt className="text-lg" />
            <span>{t('coupons')}</span>
          </NavLink>
          <NavLink to="/settings" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <FaCog className="text-lg" />
            <span>{t('settings')}</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;