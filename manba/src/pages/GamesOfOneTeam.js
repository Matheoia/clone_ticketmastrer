import React, { createElement } from "react"
import { useEffect, useState } from "react"
import ApiNBATickets from "../api/ApiNBATickets";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Header from "../components/Header";

function GamesOfOneTeam() {

    const teamName = useParams().nameTeam;
    const currentPage = useParams().currentPage;
    const [matchesList, SetMatchesList] = useState([])

    useEffect(() => {
        const fetchGamesOfOneTeam = async () => {
            try {
                const games = await ApiNBATickets.fetchGamesOfOneTeam(teamName, currentPage, 10);
                SetMatchesList(games._embedded.events)
            } catch (error) {
                // console.error('Erreur lors de la récupération du jeu NBA :', error);
            }
        };
        fetchGamesOfOneTeam()
    }, [currentPage])


    return (
        <div className="games-container">
            <Header />
            {matchesList.map((game, i) => {
                try {
                    if (game && game._embedded && game._embedded.attractions && game._embedded.attractions[1]) {
                        return (
                            <div className="matchRow" key={i}>
                                <h2>{game.name}</h2>
                                <div className="matchRow--list">
                                    <div className="matchRow--item">
                                        <Link to={`/home/games/${game.id}/reservation`} className="matchRow--info">
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
                } catch (error) {
                    // console.error('Erreur lors de la récupération du jeu NBA :', error);
                }
            })}

            <div className="pagination">
                <Link to={`/home/games/${teamName}/${parseInt(currentPage) - 1}`} onClick={() => window.scrollTo(0, 0)}>
                    <button disabled={currentPage <= 0}>Précédent</button>
                </Link>
                <Link to={`/home/games/${teamName}/${parseInt(currentPage) + 1}`} onClick={() => window.scrollTo(0, 0)}>
                    <button>Suivant</button>
                </Link>
            </div>
        </div>

    )

}

export default GamesOfOneTeam