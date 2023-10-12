import React from "react";
import "./Header.css"
import { Link } from "react-router-dom"

function Header() {

    var currentPage = 0;

    return(
        <header>
            <div className="navigation">
                <Link to="/"><img id="logoNBA" src="https://3.bp.blogspot.com/-ATl-uSY6l0E/XoCe1-kY4tI/AAAAAAAAZEw/K_GL6FQkngoZcmEKXxLD_RryoNl7hv0CACLcBGAsYHQ/s1600/NBA%2Blogo-02.png"></img></Link>
                <Link className="navBar--teams" to="/teams"><p>Teams</p></Link>
                <Link className="navBar--games" to={`/games/${currentPage}`}><p>Games</p></Link>
            </div>
        </header>
        
    )
}

export default Header