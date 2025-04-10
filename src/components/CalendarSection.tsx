import React from 'react';
import useLanguage from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';

interface DayProps {
  day: number;
  month: number;
  year: number;
  isOccupied: boolean;
}

interface CalendarContent {
  title: string;
  subtitle?: string;
  occupiedDates: string[];
  months: { name: string; year: number; }[];
  occupiedText?: string;
  monthNames?: string[];
  weekDays?: string[];
}

const Day: React.FC<DayProps> = ({ day, month, year, isOccupied }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const { pageContent } = useLanguage();
  
  if (day === 0) {
    return <div className="h-10 md:h-12"></div>;
  }
  
  const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  
  return (
    <div 
      className="relative h-10 md:h-12 flex items-center justify-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div 
        className={`
          w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center 
          transition-colors duration-200 
          ${isOccupied 
            ? 'bg-red-500 text-white cursor-pointer' 
            : 'hover:bg-gray-100 cursor-pointer'
          }
        `}
      >
        {day}
      </div>
      
      {showTooltip && isOccupied && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white shadow-lg rounded-md p-2 text-sm z-10 w-max">
          <div className="font-medium text-red-500">{(pageContent?.calendar as CalendarContent)?.occupiedText || 'Occupé'}</div>
          <div className="text-gray-600">{dateString}</div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
        </div>
      )}
    </div>
  );
};

interface MonthProps {
  name: string;
  year: number;
  occupiedDates: string[];
}

const Month: React.FC<MonthProps> = ({ name, year, occupiedDates }) => {
  const { pageContent } = useLanguage();
  
  // Get month number from name (January = 1, February = 2, etc.)
  const getMonthNumber = (monthName: string): number => {
    const months = (pageContent?.calendar as CalendarContent)?.monthNames || [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    return months.indexOf(monthName) + 1;
  };

  const monthNumber = getMonthNumber(name);
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDay = new Date(year, monthNumber - 1, 1).getDay();
  
  // Get days in month
  const daysInMonth = new Date(year, monthNumber, 0).getDate();
  
  // Create calendar grid with empty cells for days before first of month
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(0);
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Check if a day is occupied
  const isOccupied = (day: number): boolean => {
    const dateString = `${year}-${String(monthNumber).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return occupiedDates.includes(dateString);
  };

  const weekDays = (pageContent?.calendar as CalendarContent)?.weekDays || ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center">{name} {year}</h3>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day: string, index: number) => (
          <div key={index} className="text-center font-medium text-gray-500">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <Day 
            key={index}
            day={day}
            month={monthNumber}
            year={year}
            isOccupied={day !== 0 && isOccupied(day)}
          />
        ))}
      </div>
    </div>
  );
};

const CalendarSection: React.FC = () => {
  const { pageContent } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!pageContent?.calendar) {
    return <div className="py-20"></div>;
  }

  const { title, subtitle, occupiedDates, months } = pageContent.calendar;

  return (
    <section ref={ref} className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {months.map((month, index) => (
            <div
              key={index}
              className={`transition-all duration-700 delay-${index * 150} transform ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Month 
                name={month.name}
                year={month.year}
                occupiedDates={occupiedDates}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;