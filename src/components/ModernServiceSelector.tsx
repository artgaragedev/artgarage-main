'use client';

import { FC } from 'react';
import { Check } from 'lucide-react';

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

interface ModernServiceSelectorProps {
  options: ServiceOption[];
  // Single-select mode props
  selectedOption?: string;
  onChange?: (optionId: string) => void;
  // Multi-select mode props
  multiple?: boolean;
  selectedOptions?: string[];
  onChangeSelectedOptions?: (optionIds: string[]) => void;
  // Display mode
  compact?: boolean;
}

const ModernServiceSelector: FC<ModernServiceSelectorProps> = ({ 
  options, 
  selectedOption, 
  onChange,
  multiple = false,
  selectedOptions = [],
  onChangeSelectedOptions,
  compact = false
}) => {
  const isSelected = (id: string) => {
    return multiple ? selectedOptions.includes(id) : selectedOption === id;
  };

  const handleClick = (id: string) => {
    if (multiple) {
      const exists = selectedOptions.includes(id);
      const next = exists 
        ? selectedOptions.filter(x => x !== id)
        : [...selectedOptions, id];
      onChangeSelectedOptions && onChangeSelectedOptions(next);
    } else {
      onChange && onChange(id);
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${compact ? 'gap-3 md:gap-4' : 'gap-6'}`}>
      {options.map((option) => (
        <div
          key={option.id}
          onClick={() => handleClick(option.id)}
          className={`
            relative ${compact ? 'p-4 sm:p-5 rounded-xl border' : 'p-6 rounded-2xl border-2'} cursor-pointer transition-all duration-300
            ${isSelected(option.id) 
              ? 'border-[#EA3C23] bg-white dark:bg-gray-900' 
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'
            }
          `}
        >
          {/* Индикатор выбора */}
          {isSelected(option.id) && (
            <div className={`absolute ${compact ? 'top-3 right-3 w-5 h-5' : 'top-4 right-4 w-6 h-6'} bg-[#EA3C23] rounded-full flex items-center justify-center`}>
              <Check className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-white`} />
            </div>
          )}

          {/* Контент */}
          {compact ? (
            <div>
              <h3 
                className={`
                  ${compact ? 'text-base sm:text-lg' : 'text-lg'} font-semibold transition-colors
                  ${isSelected(option.id) 
                    ? 'text-[#EA3C23]' 
                    : 'text-gray-900 dark:text-white'
                  }
                `}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {option.title}
              </h3>
            </div>
          ) : (
            <div className="flex items-start space-x-4">
              {/* Иконка услуги */}
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                ${isSelected(option.id) 
                  ? 'bg-[#EA3C23] text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }
              `}>
                {option.icon}
              </div>

              <div className="flex-1">
                <h3 
                  className={`
                    text-lg font-semibold mb-2 transition-colors
                    ${isSelected(option.id) 
                      ? 'text-[#EA3C23]' 
                      : 'text-gray-900 dark:text-white'
                    }
                  `}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {option.title}
                </h3>

                <p 
                  className="text-sm text-gray-600 dark:text-gray-400 mb-4"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {option.description}
                </p>

                {/* Особенности услуги */}
                <ul className="space-y-2">
                  {option.features.map((feature, index) => (
                    <li 
                      key={index} 
                      className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <div className={`
                        w-1.5 h-1.5 rounded-full mr-2
                        ${isSelected(option.id) 
                          ? 'bg-[#EA3C23]' 
                          : 'bg-gray-400'
                        }
                      `} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModernServiceSelector;