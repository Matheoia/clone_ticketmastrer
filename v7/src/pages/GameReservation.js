import React from "react";
import { useEffect, useState } from "react";
import "./GameReservation.css"
import { useParams } from "react-router-dom";
import ApiNBATickets from "../api/ApiNBATickets";
import Header from "../components/Header";

function GameReservation() {

  const { gameId } = useParams();
  const [homeTeam, setHomeTeam] = useState(null);
  const [extTeam, setExtTeam] = useState(null);
  const [homeTeamLogo, setHomeTeamLogo] = useState(null);
  const [extTeamLogo, setExtTeamLogo] = useState(null);
  const [court, setCourt] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const game = await ApiNBATickets.fetchOneNBAGame(gameId);
        const hT = game["_embedded"].attractions[0].name;
        const eT = game["_embedded"].attractions[1].name;
        const hTlogo = game._embedded.attractions[0].images[0].url;
        const eTlogo = game._embedded.attractions[1].images[0].url;
        const court = game.seatmap.staticUrl;
        setHomeTeam(hT);
        setExtTeam(eT);
        setHomeTeamLogo(hTlogo);
        setExtTeamLogo(eTlogo)
        setCourt(court);

      } catch (error) {
        console.error('Erreur lors de la récupération du jeu NBA :', error);
      }
    };
    fetchGame()
  })




  return (

    <div className="reservation--container">
      <Header />
      <h1>{homeTeam} vs. {extTeam}</h1>
      <img src={homeTeamLogo} style={{ width: '200px', height: '133px' }} ></img>
      <label> vs. </label>
      <img src={extTeamLogo} style={{ width: '200px', height: '133px' }} ></img>
      <img src={court} style={{ width: '400px', height: 'auto' }}></img>

    </div>

  )
}

export default GameReservation