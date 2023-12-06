import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [secondSelectedTime, setSecondSelectedTime] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <div>
      <h1>Calendário</h1>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      
    </div>
  );
};

export default MyCalendar;