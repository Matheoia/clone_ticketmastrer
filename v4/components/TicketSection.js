import React, { createElement } from "react"
import { useEffect, useState } from "react"
import ApiNBATickets from "../ApiNBATickets";
import "./TicketSection.css"
import { Link } from "react-router-dom";

function TicketSection() {

    const [matchesList, SetMatchesList] = useState([])
    useEffect(() => {
        const loadAllGames = async () => {
          try {
            let games = await ApiNBATickets.fetchNBAGames();
            SetMatchesList(games._embedded.events);
    
          } catch (error) {
            //console.error('Erreur lors du chargement des matchs NBA :', error);
          }
        };
    
        loadAllGames();
      }, []);
    
    return (
        
        matchesList.map((game, i) => {
            if (game._embedded && game._embedded.attractions[1]) {
                return (
                    <div className="matchRow" key={i}>
                        <h2>{game.name}</h2>
                        <div className="matchRow--list">
                            <div className="matchRow--item">
                                <Link to={`/games/${game.id}/reservation`} className="matchRow--info">
                                    <img alt={game.name} src={game.images[0].url} style={{ width: '200px', height: '133px' }} />
                                    <label>VS</label>
                                    <img alt={game.name} src={game._embedded.attractions[1].images[0].url} style={{ width: '200px', height: '133px' }} />   
                                </Link>
                                <p>
                                    <label>{game._embedded.attractions[0].name}</label>
                                    <label>{game.dates.start.localDate}</label>
                                    <label>{game.dates.start.localTime}</label>
                                    <label>{game._embedded.attractions[1].name}</label>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            } 
        })
    )
}

export default TicketSection