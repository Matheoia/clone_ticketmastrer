import React, { createElement } from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Teams.css"
import Header from "../components/Header"


function Teams() {

    const teams = [
        { "name": "Atlanta Hawks", "logo": "https://www.lequipe.fr/_medias/logo-basket/117/120" },
        { "name": "Boston Celtics", "logo": "https://www.lequipe.fr/_medias/logo-basket/130/120" },
        { "name": "Brooklyn Nets", "logo": "https://www.lequipe.fr/_medias/logo-basket/807/120" },
        { "name": "Charlotte Hornets", "logo": "https://www.lequipe.fr/_medias/logo-basket/1500000000000608/120" },
        { "name": "Chicago Bulls", "logo": "https://www.lequipe.fr/_medias/logo-basket/115/120" },
        { "name": "Cleveland Cavaliers", "logo": "https://www.lequipe.fr/_medias/logo-basket/118/120" },
        { "name": "Detroit Pistons", "logo": "https://www.lequipe.fr/_medias/logo-basket/119/120" },
        { "name": "Indiana Pacers", "logo": "https://www.lequipe.fr/_medias/logo-basket/120/120" },
        { "name": "Miami Heat", "logo": "https://www.lequipe.fr/_medias/logo-basket/131/120" },
        { "name": "Milwaukee Bucks", "logo": "https://www.lequipe.fr/_medias/logo-basket/121/120" },
        { "name": "New York Knicks", "logo": "https://www.lequipe.fr/_medias/logo-basket/133/120" },
        { "name": "Orlando Magic", "logo": "https://www.lequipe.fr/_medias/logo-basket/134/120" },
        { "name": "Philadelphia 76ers", "logo": "https://www.lequipe.fr/_medias/logo-basket/135/120" },
        { "name": "Toronto Raptors", "logo": "https://www.lequipe.fr/_medias/logo-basket/122/120" },
        { "name": "Washington Wizards", "logo": "https://www.lequipe.fr/_medias/logo-basket/136/120" },
        { "name": "Dallas Mavericks", "logo": "https://www.lequipe.fr/_medias/logo-basket/137/120" },
        { "name": "Denver Nuggets", "logo": "https://www.lequipe.fr/_medias/logo-basket/138/120" },
        { "name": "Golden State Warriors", "logo": "https://www.lequipe.fr/_medias/logo-basket/123/120" },
        { "name": "Houston Rockets", "logo": "https://www.lequipe.fr/_medias/logo-basket/139/120" },
        { "name": "Los Angeles Clippers", "logo": "https://www.lequipe.fr/_medias/logo-basket/124/120" },
        { "name": "Los Angeles Lakers", "logo": "https://www.lequipe.fr/_medias/logo-basket/125/120" },
        { "name": "Memphis Grizzlies", "logo": "https://www.lequipe.fr/_medias/logo-basket/143/120" },
        { "name": "Minnesota Timberwolves", "logo": "https://www.lequipe.fr/_medias/logo-basket/140/120" },
        { "name": "New Orleans Pelicans", "logo": "https://www.lequipe.fr/_medias/logo-basket/116/120" },
        { "name": "Oklahoma City Thunder", "logo": "https://www.lequipe.fr/_medias/logo-basket/616/120" },
        { "name": "Phoenix Suns", "logo": "https://www.lequipe.fr/_medias/logo-basket/126/120" },
        { "name": "Portland Trail Blazers", "logo": "https://www.lequipe.fr/_medias/logo-basket/127/120" },
        { "name": "Sacramento Kings", "logo": "https://www.lequipe.fr/_medias/logo-basket/128/120" },
        { "name": "San Antonio Spurs", "logo": "https://www.lequipe.fr/_medias/logo-basket/141/120" },
        { "name": "Utah Jazz", "logo": "https://www.lequipe.fr/_medias/logo-basket/142/120" }
    ];

    var currentPage = 0;


    return (
        <div className="teamsPage">
            <Header />
            <div className="teams--container">
                {teams.map((team, index) => (
                    <Link to={`/home/games/${team.name}/${currentPage}`} key={index}>
                        <img title={team.name} src={team.logo} />
                    </Link>
                ))}

            </div>

        </div>


    )
}

export default Teams