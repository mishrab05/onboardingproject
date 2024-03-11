import React from 'react';
import Navbar from '../components/Navbar';
import '../App.css'; 

const Reminders = () => {
  return (
    <div>
        <Navbar />
        <div className='info-message'>
            <p>Information regarding reminders will be updated soon. Stay tuned!</p>
        </div>
    </div>
  );
}

export default Reminders;
