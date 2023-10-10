import React, { createElement } from "react"
import { useEffect, useState } from "react"
import ApiNBATickets from "../ApiNBATickets";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

function GamesOfOneTeam() {

    const teamName = useParams().nameTeam;
    const [matchesList, SetMatchesList] = useState([])

    useEffect(() => {
        const fetchGamesOfOneTeam = async () => {
            try {
                const games = await ApiNBATickets.fetchGamesOfOneTeam(teamName);
                SetMatchesList(games._embedded.events)
            } catch (error) {
                console.error('Erreur lors de la récupération du jeu NBA :', error);
            }
        };
        fetchGamesOfOneTeam()
    }, [])

    console.log(matchesList);


    return (

        // matchesList.length > 0 &&
        matchesList.map((game, i) => (
            // game.length > 0 &&
            <div className="matchRow">
            <h2>{game.name}</h2>
            <div className="matchRow--list">
                <div className="matchRow--item">
                    <Link to={`/games/${game.id}/reservation`} className="matchRow--info">
                        <img alt={game.name} src={game._embedded.attractions[0].images[0].url} style={{ width: '200px', height: '133px' }} />
                        <label>VS</label>
                        <img alt={game.name} src={game._embedded.attractions[1].images[0].url} style={{ width: '200px', height: '133px' }} />
                    </Link>
                    <p><label>{game._embedded.attractions[0].name}</label><label>{game.dates.start.localDate}</label><label>{game.dates.start.localTime}</label><label>{game._embedded.attractions[1].name}</label></p>
                </div>
            </div>
        </div>

        ))
        )
    
}

export default GamesOfOneTeam