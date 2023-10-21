import "./Header.css"
import { Link } from "react-router-dom";


function Header() {

    var currentPage = 0;
    const userData = JSON.parse(localStorage.getItem('user'));

    return (
        <header>
            <div className="navigation">
                
                <Link to="/home"><img id="logoNBA" src="https://3.bp.blogspot.com/-ATl-uSY6l0E/XoCe1-kY4tI/AAAAAAAAZEw/K_GL6FQkngoZcmEKXxLD_RryoNl7hv0CACLcBGAsYHQ/s1600/NBA%2Blogo-02.png"></img></Link>
                <Link to="/home/teams"><p>Teams</p></Link>
                <Link to="/home/games/0"><p>Games</p></Link>
                <Link to="/home/myaccount"><p>{userData.prenom}</p></Link>
                <Link to="/"><p>Logout</p></Link>
                {/* <Link className="navBar--teams" to="/home/teams"><p>Teams</p></Link>
                <Link className="navBar--games" to={`/home/games/${currentPage}`}><p>Games</p></Link> */}
            </div>
        </header>

    )
}

export default Header;