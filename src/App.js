import './App.css';
import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";

import TicketSection from './components/TicketSection';
import Header from './components/Header';
import GameReservation from './components/GameReservation';
import { HomePage } from './components/HomePage';



function App() {
  
  return (

    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/games' element={<TicketSection />}/>
          <Route path='/games/:gameId/reservation' element={<GameReservation />}/>
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
