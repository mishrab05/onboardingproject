import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './routes/Home'
import Measures from './routes/Measures';
import Reminders from './routes/Reminders';
import UVImpact from './routes/UVImpact';
import UVIndex from './routes/UVIndex';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/measures' element={<Measures />} />
        <Route path='/uvindex' element={<UVIndex />} />
        <Route path='/reminders' element={<Reminders />} />
        <Route path='/impact' element={<UVImpact />} />
      </Routes>

    </div>
  );
}

export default App;

