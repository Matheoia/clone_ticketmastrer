const API_KEY = "Ej69Yhx8CqDGYl1bTd1APWtsyeG37yTE"
const API_URL = "https://app.ticketmaster.com/discovery/v2/events.json"

const API_UTL_MATCH_ID = "https://app.ticketmaster.com/discovery/v2/events/"

const fetchNBATickets = async (team, page=1, pageSize=3) => {

    let nbaMatches = await fetch(
        `${API_URL}?page=${page}&size=${pageSize}&keyword=NBA&apikey=${API_KEY}`    
    ).then((response) => response.json())

    let teamChosenMatches = nbaMatches["_embedded"]["events"].filter(match => match["name"].includes(team))

    return teamChosenMatches
}

const fetchOneNBAGame = async (id) => {

    let nbaGame = await fetch(
        `${API_UTL_MATCH_ID}${id}.json?&apikey=${API_KEY}`    
    ).then((response) => response.json())

    return nbaGame
    
}

export default {
    fetchOneNBAGame,
    getNBATickets: async () => {
        return [
            {
                title: "Phoenix Suns",
                items: await fetchNBATickets("Phoenix Suns")
            },
            {
                title: "Portland Trail Blazers",
                items: await fetchNBATickets("Portland Trail Blazers")
            },
            {
                title: "Utah Jazz",
                items: await fetchNBATickets("Utah Jazz")
            },
            {
                title: "Golden State Warriors",
                items: await fetchNBATickets("Golden State Warriors")
            },
            {
                title: "Orlando Magic",
                items: await fetchNBATickets("Orlando Magic")
            },
            {
                title: "Boston Celtics",
                items: await fetchNBATickets("Boston Celtics")
            },
            {
                title: "Indiana Pacers",
                items: await fetchNBATickets("Indiana Pacers")
            },
            {
                title: "Toronto Raptors",
                items: await fetchNBATickets("Toronto Raptors")
            },
            {
                title: "Detroit Pistons",
                items: await fetchNBATickets("Detroit Pistons")
            },
            {
                title: "Los Angeles Lakers",
                items: await fetchNBATickets("Los Angeles Lakers")
            },
            {
                title: "Sacramento Kings",
                items: await fetchNBATickets("Sacramento Kings")
            },
            {
                title: "Memphis Grizzlies",
                items: await fetchNBATickets("Memphis Grizzlies")
            }, 
            {
                title: "Brooklyn Nets",
                items: await fetchNBATickets("Brooklyn Nets")
            },
            {
                title: "Atlanta Hawks",
                items: await fetchNBATickets("Atlanta Hawks")
            },
            {
                 title: "Milwaukee Bucks",
                 items: await fetchNBATickets("Milwaukee Bucks")
            },
            {
                title: "Miami Heat",
                items: await fetchNBATickets("Miami Heat")
            },
            {
                title: "Minnesota Timberwolves",
                items: await fetchNBATickets("Minnesota Timberwolves")
            },
            {
                title: "Washington Wizards",
                items: await fetchNBATickets("Washington Wizards")
            }
        ]
    }
}