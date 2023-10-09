import React, { createElement } from "react"
import { useEffect, useState } from "react"
import ApiNBATickets from "../ApiNBATickets";
import "./TicketSection.css"
import { Link } from "react-router-dom";

function TicketSection() {

    const [matchesList, SetMatchesList] = useState([])
    useEffect(() => {
        const loadAllMatches = async () => {
          try {
            let list = await ApiNBATickets.getNBATickets();
            SetMatchesList(list);
          } catch (error) {
            console.error('Erreur lors du chargement des matchs NBA :', error);
          }
        };
    
        loadAllMatches();
      }, []);
    

    const handleMatchClick = async (item) => {
        console.log(item);
        // window.location.href = '/games/reservation'

        
    }

    return (
        
        matchesList.map((games, i) => (
            <div className="matchRow">
                <h2>{games.title}</h2>
                <div className="matchRow--list">
                    {games.items.length > 0 && 
                    games.items.map((item, key) => (
                        item._embedded && (
                            <div className="matchRow--item" key={key}>
                                <Link to={`/games/${item.id}/reservation`} className="matchRow--info">
                                    <img alt={item.name} src={item._embedded.attractions[0].images[0].url} style={{ width: '200px', height: '133px' }} />
                                    <label>VS</label>
                                    <img alt={item.name} src={item._embedded.attractions[1].images[0].url} style={{ width: '200px', height: '133px' }} />
                                </Link>
                                <p><label>{item._embedded.attractions[0].name}</label><label>{item.dates.start.localDate}</label><label>{item.dates.start.localTime}</label><label>{item._embedded.attractions[1].name}</label></p>
                            </div>
                            
                        )
                    ))}
                </div>
            </div>
        ))

    )
}

export default TicketSection