import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Teams from './pages/Teams'
import UserAccount from './pages/UserAccount';
import GamesOfOneTeam from './pages/GamesOfOneTeam';
import GameReservation from './pages/GameReservation';
import TicketSection from './pages/TicketSection';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/signup' element={<SignIn />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/myaccount' element={<UserAccount />} />
          <Route path='/home/teams' element={<Teams />} />
          <Route path='/home/games/:currentPage' element={<TicketSection />}/>
          <Route path='/home/games/:nameTeam/:currentPage' element={<GamesOfOneTeam />}/>
          <Route path='/home/games/:gameId/reservation' element={<GameReservation />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
