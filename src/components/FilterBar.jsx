import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiFilter, FiChevronDown } from 'react-icons/fi';
import { Filter } from '../types';

interface FilterBarProps {
  filters: Filter[];
  onFilterChange: (filterId: string, value: string) => void;
}

const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  const { t } = useTranslation();
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleFilterChange = (filterId: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
    onFilterChange(filterId, value);
    setOpenDropdown(null);
  };

  const toggleDropdown = (filterId: string) => {
    setOpenDropdown(openDropdown === filterId ? null : filterId);
  };

  return (
    <div className="bg-secondary rounded-lg p-4 mb-6">
      <div className="flex items-center flex-wrap gap-4">
        <div className="flex items-center text-white">
          <FiFilter className="mr-2" />
          <span className="font-medium">{t('filters')}</span>
        </div>
        
        {filters.map((filter) => (
          <div key={filter.id} className="relative">
            <button
              onClick={() => toggleDropdown(filter.id)}
              className="flex items-center bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-md"
            >
              <span>{t(filter.name)}</span>
              <FiChevronDown className={`ml-2 transition-transform ${openDropdown === filter.id ? 'rotate-180' : ''}`} />
            </button>
            
            {openDropdown === filter.id && (
              <div className="absolute z-10 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                <button
                  className={`block w-full text-left px-4 py-2 text-sm ${!activeFilters[filter.id] ? 'bg-accent text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                  onClick={() => handleFilterChange(filter.id, '')}
                >
                  {t('all')}
                </button>
                {filter.value.split(',').map((option, index) => (
                  <button
                    key={index}
                    className={`block w-full text-left px-4 py-2 text-sm ${activeFilters[filter.id] === option ? 'bg-accent text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    onClick={() => handleFilterChange(filter.id, option)}
                  >
                    {t(option)}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;










