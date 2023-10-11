const API_KEY = "Ej69Yhx8CqDGYl1bTd1APWtsyeG37yTE"
const API_URL = "https://app.ticketmaster.com/discovery/v2/events.json"

const API_UTL_MATCH_ID = "https://app.ticketmaster.com/discovery/v2/events/"

const fetchNBAGames = async (page=1, pageSize=20) => {

    let nbaMatches = await fetch(
        `${API_URL}?sort=date,asc&page=${page}&size=${pageSize}&keyword=NBA&apikey=${API_KEY}`    
    ).then((response) => response.json())
    return nbaMatches
}

const fetchOneNBAGame = async (id) => {

    let nbaGame = await fetch(
        `${API_UTL_MATCH_ID}${id}.json?&apikey=${API_KEY}`    
    ).then((response) => response.json())
    return nbaGame
}

const fetchGamesOfOneTeam = async (nameTeam, page, pageSize=10) => {

    let games = await fetch(
        `${API_URL}?sort=date,asc&page=${page}&keyword=${nameTeam}&apikey=${API_KEY}`
    ).then((response) => response.json())

    return games;
}

export default {
    fetchNBAGames,
    fetchOneNBAGame,
    fetchGamesOfOneTeam,
    
}