import React, { createElement } from "react"
import { useEffect, useState } from "react"
import ApiNBATickets from "../ApiNBATickets";
import "./TicketSection.css"
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

function TicketSection() {

    const [matchesList, SetMatchesList] = useState([]);
    const currentPage = useParams().currentPage;

    useEffect(() => {
        const loadAllGames = async () => {
            try {
                let games = await ApiNBATickets.fetchNBAGames(currentPage, 10);
                SetMatchesList(games._embedded.events);

            } catch (error) {
                // console.error('Erreur lors du chargement des matchs NBA :', error);
            }
        };

        loadAllGames();
    }, [currentPage]);

    return (

        <div className="games-all">
            {matchesList.map((game, i) => {
                try {
                    if (game && game._embedded) {
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

                        )
                    }
                } catch (error) {
                    // console.error('Erreur lors de la récupération du jeu NBA :', error);
                }
            })}

            <div className="pagination">
                <Link to={`/games/${parseInt(currentPage) - 1}`}>
                    <button disabled={currentPage <= 0}>Précédent</button>
                </Link>
                <Link to={`/games/${parseInt(currentPage) + 1}`}>
                    <button>Suivant</button>
                </Link>
            </div>

        </div>
    )
}

export default TicketSection