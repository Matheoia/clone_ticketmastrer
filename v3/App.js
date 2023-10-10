import './App.css';
import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";

import TicketSection from './components/TicketSection';
import Header from './components/Header';
import GameReservation from './components/GameReservation';
import { HomePage } from './components/HomePage';
import Teams from './components/Teams';
import GamesOfOneTeam from './components/GamesOfOneTeam';



function App() {
  
  return (

    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/teams' element={<Teams />}/>
          <Route path='/games/:nameTeam/' element={<GamesOfOneTeam />}/>
          <Route path='/games' element={<TicketSection />}/>
          <Route path='/games/:gameId/reservation' element={<GameReservation />}/>
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
