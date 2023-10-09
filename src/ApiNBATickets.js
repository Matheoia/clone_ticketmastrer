const API_KEY = "Ej69Yhx8CqDGYl1bTd1APWtsyeG37yTE"
const API_URL = "https://app.ticketmaster.com/discovery/v2/events.json"

const API_UTL_MATCH_ID = "https://app.ticketmaster.com/discovery/v2/events/"

const fetchNBATickets = async (team) => {

    let nbaMatches = await fetch(
        `${API_URL}?keyword=NBA&apikey=${API_KEY}`    
    ).then((response) => response.json())

    let teamChosenMatches = nbaMatches["_embedded"]["events"].filter(match => match["name"].includes(team))

    // console.log(teamChosenMatches[0]["name"]);
    // console.log(teamChosenMatches[0]["images"][0]["url"]);

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
                title: "Utah Jazz",
                items: await fetchNBATickets("Utah Jazz")
            },
            // {
            //     title: "Boston Celtics",
            //     items: await fetchNBATickets("Celtics")
            // },

            // {
            //     title: "Indiana Pacers",
            //     items: await fetchNBATickets("Pacers")
            // },
            {
                title: "Toronto Raptors",
                items: await fetchNBATickets("Raptors")
            },
            {
                title: "Detroit Pistons",
                items: await fetchNBATickets("Pistons")
            },
            {
                title: "Los Angeles Lakers",
                items: await fetchNBATickets("Lakers")
            },
            {
                title: "Sacramento Kings",
                items: await fetchNBATickets("Kings")
            },
            {
                title: "Memphis Grizzlies",
                items: await fetchNBATickets("Grizzlies")
            }, 
            {
                title: "Brooklyn Nets",
                items: await fetchNBATickets("Nets")
            },
            {
                title: "Atlanta Hawks",
                items: await fetchNBATickets("Hawks")
            }

            // {
            //     title: "Bucks",
            //     items: await fetchNBATickets("Bucks")
            // },
        ]
    }
}