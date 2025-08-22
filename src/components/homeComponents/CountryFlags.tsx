import Image from 'next/image';
import React from 'react';

const countries = [
  { code: 'NG', name: 'Nigeria' },
  { code: 'GH', name: 'Ghana' },
  { code: 'KE', name: 'Kenya' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'EG', name: 'Egypt' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'UG', name: 'Uganda' },
  { code: 'RW', name: 'Rwanda' }
];

const CountryFlags: React.FC = () => {
  return (
    <div className="mt-6 w-full">
      {/* Desktop: flex-wrap, Mobile: horizontal scroll */}
      <div className="flex lg:flex-wrap gap-2 overflow-x-auto lg:overflow-x-visible scrollbar-hide pb-2 px-2 lg:px-0">
        {countries.map(({ code, name }, index) => (
          <div key={code} className="group relative flex flex-col items-center flex-shrink-0">
            <div 
              className={`w-12 h-12 rounded-full border-2 border-white bg-white shadow-md overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${index === 0 ? 'z-10' : 'z-0'}`}
            >
              <Image
                src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`}
                alt={name}
                width={48}
                height={48}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="absolute -bottom-8 px-2 py-1 bg-white text-black text-xs font-medium rounded-tr-md rounded-br-md rounded-bl-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg">
              {name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryFlags;
