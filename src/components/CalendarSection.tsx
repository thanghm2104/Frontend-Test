import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type DateType = Date | null;

interface CalendarProps {
  className?: string;
}

const CalendarSection: React.FC<CalendarProps> = ({ className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [selectedDate, setSelectedDate] = useState<DateType>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 0)); // January 2025
  const [messageContent, setMessageContent] = useState<string>('');
  
  // Define occupied dates (formatted as YYYY-MM-DD)
  const occupiedDates: string[] = ['2025-01-28', '2025-01-29', '2025-02-04'];
  
  // Format date to YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Check if date is occupied
  const isOccupied = (date: Date): boolean => {
    const formattedDate = formatDate(date);
    return occupiedDates.includes(formattedDate);
  };
  
  // Get days for current month
  const getDaysInMonth = (date: Date): (Date | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days: (Date | null)[] = [];
    // Add empty spaces for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add all days in month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };
  
  // Get month name
  const getMonthName = (date: Date): string => {
    return date.toLocaleString('en-US', { month: 'long' });
  };
  
  // Handle day click
  const handleDateClick = (date: Date | null): void => {
    if (!date) return;
    setSelectedDate(date);
    
    // Show status notification (implementation would go here)
    console.log(`Selected date: ${formatDate(date)}, Occupied: ${isOccupied(date)}`);
  };
  
  // Switch to previous month
  const prevMonth = (): void => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };
  
  // Switch to next month
  const nextMonth = (): void => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };
  
  // Days of the week
  const weekdays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // React Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'size': ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <section ref={ref} className={`py-16 bg-gray-50 ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-orange-500">NOS ACTIVITÉS</h2>
        </div>
        
        <div className="rounded-[24px] border border-[rgba(86,44,44,0.30)] bg-white shadow-[0px_0px_30px_0px_rgba(242,84,45,0.10)] p-6">
          <div className="flex justify-center gap-4 items-center mb-6">
            <button 
              onClick={prevMonth}
              className="text-gray-600 hover:text-orange-500 focus:outline-none"
            >
              &lt; 
            </button>
            
            <h3 className="text-xl font-medium">
              {getMonthName(currentMonth)} {currentMonth.getFullYear()}
            </h3>
            
            <button 
              onClick={nextMonth}
              className="text-gray-600 hover:text-orange-500 focus:outline-none"
            >
               &gt;
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {/* Weekday headers */}
            {weekdays.map(day => (
              <div key={day} className="text-center py-2 text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {getDaysInMonth(currentMonth).map((date, i) => {
              if (!date) {
                return <div key={`empty-${i}`} className="aspect-square" />;
              }
              
              const isOccupiedDay = isOccupied(date);
              const isSelected = selectedDate && 
                date.getDate() === selectedDate.getDate() && 
                date.getMonth() === selectedDate.getMonth() && 
                date.getFullYear() === selectedDate.getFullYear();
              
              return (
                <div 
                  key={i}
                  onClick={() => handleDateClick(date)}
                  className={`
                    aspect-square flex items-center justify-center text-center rounded-md cursor-pointer
                    border border-gray-100 transition-all hover:border-orange-300
                    ${isSelected ? 'ring-2 ring-orange-500' : ''}
                    ${isOccupiedDay ? 'bg-orange-100' : 'bg-white'}
                  `}
                >
                  <div className="flex flex-col">
                    <span>{date.getDate()}</span>
                    {isOccupiedDay ? <span className="text-xs text-orange-500 mt-1">Libre</span> : <span className="text-xs text-[#AAA] mt-1">Occupé</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
           
        <div className="mt-8">
          <div className="mb-6 flex items-center">
            <label className="text-gray-700 font-medium w-24">Nom:</label>
            <input 
              type="text" 
              placeholder="Entrez votre nom" 
              className="flex-1 px-4 py-2 rounded-[123px] border border-[rgba(86,44,44,0.30)] bg-white shadow-[0px_0px_30px_0px_rgba(242,84,45,0.10)] focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          
          <div className="mb-6 flex items-center relative">
            <label className="text-gray-700 font-medium w-24">Email:</label>
            <input 
              type="email" 
              placeholder="Entrez votre e-mail" 
              className="flex-1 px-4 py-2 rounded-[123px] border border-[rgba(86,44,44,0.30)] bg-white shadow-[0px_0px_30px_0px_rgba(242,84,45,0.10)] focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
           
          </div>
          
          <div className="mb-6 flex items-start">
            <label className="text-gray-700 font-medium w-24 pt-2">Message:</label>
            <div className="flex-1 rounded-[16px] border border-[rgba(86,44,44,0.30)] bg-white shadow-[0px_0px_30px_0px_rgba(242,84,45,0.10)] overflow-hidden">
              <ReactQuill
                value={messageContent}
                onChange={setMessageContent}
                modules={modules}
                className="rounded-[16px]"
                placeholder="Écrivez votre message ici..."
              />
            </div>
          </div>
          
          <div className="mb-6 flex items-center">
            <label className="text-gray-700 font-medium w-24">Fichier:</label>
            <div className="flex-1 items-center">
              <label className="flex items-center text-gray-700 cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                />
                <svg width="20" height="20" viewBox="0 0 24 24" className="text-blue-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
                <span className="text-blue-500">Pièce jointe</span>
                <span className="text-gray-400 ml-2">(Fichiers pdf uniquement)</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end mt-8">
         
            <div className="flex gap-3">
              <button className="px-6 py-2 border border-[rgba(86,44,44,0.30)] rounded-[33px] hover:bg-gray-100 text-gray-700">
                Clear All
              </button>
              <button className="px-6 py-2 bg-orange-500 text-white rounded-[33px] hover:bg-orange-600 flex items-center border border-[rgba(86,44,44,0.30)]">
                Envoyer
                <img src="/public/icons/send.svg" alt="send" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;