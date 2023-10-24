import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./GameReservation.css"
import { useParams } from "react-router-dom";
import ApiNBATickets from "../api/ApiNBATickets";
import Header from "../components/Header";

function GameReservation() {

  const [section, setSection] = useState('');
  const [countPlaces, setCountPlaces] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [takenPlaces, setTakenPlaces] = useState([]);

  const { gameId } = useParams();
  const [homeTeam, setHomeTeam] = useState(null);
  const [extTeam, setExtTeam] = useState(null);
  const [homeTeamLogo, setHomeTeamLogo] = useState(null);
  const [extTeamLogo, setExtTeamLogo] = useState(null);
  const [court, setCourt] = useState(null);

  const fetchTakenPlaces = async () => {
    if (section !== '') {
      try {
        const gameName = `${homeTeam} vs. ${extTeam}`;
        const sectionName = section;

        axios.post('http://localhost:8888/places/taken', { game: gameName, section: sectionName })
          .then((res) => {
            console.log(res);
            setTakenPlaces(res.data.data);

            const takenPlaceIds = res.data.data.map((place) => place.place);
            const circles = document.querySelectorAll('circle');

            circles.forEach((circle) => {

              circle.classList.remove('taken');
              circle.classList.add('notChosen');


              if (takenPlaceIds.includes(circle.id)) {
                circle.classList.remove('notChosen');
                circle.classList.add('taken');
              } else {

              }
            });
          })
          .catch((error) => {
            console.error(`Error adding place`, error);
          });
      } catch (error) {
        console.log('Erreur lors de la récupération des places prises :', error);
      }
    }
  };

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const game = await ApiNBATickets.fetchOneNBAGame(gameId);
        const hT = game["_embedded"].attractions[0].name;
        const eT = game["_embedded"].attractions[1].name;
        const hTlogo = game._embedded.attractions[0].images[0].url;
        const eTlogo = game._embedded.attractions[1].images[0].url;
        const court = game.seatmap.staticUrl;
        setHomeTeam(hT);
        setExtTeam(eT);
        setHomeTeamLogo(hTlogo);
        setExtTeamLogo(eTlogo)
        setCourt(court);

      } catch (error) {
        console.error('Erreur lors de la récupération du jeu NBA :', error);
      }
    };
    fetchGame();
    fetchTakenPlaces();
  }, [section]);


  function updateSection(id) {

    setSection(id);

    var circles = document.querySelectorAll('circle');
    for (var i = 0; i < circles.length; i++) {
      if (!circles[i].classList.contains('taken')) {
        circles[i].classList.remove('chosen');
        circles[i].classList.add('notChosen');
      }

    }
    setCountPlaces(0);
    setTotalPrice(0)
  }

  function clickPlace(id) {

    if (document.getElementById(id).classList != "chosen") {
      document.getElementById(id).classList.remove('notChosen')
      document.getElementById(id).classList.add('chosen')
      setTotalPrice(totalPrice + 50)
    } else {
      document.getElementById(id).classList.remove('chosen')
      document.getElementById(id).classList.add('notChosen')
      setTotalPrice(totalPrice - 50)
    }
    setCountPlaces(document.getElementsByClassName('chosen').length)
    // const circle = document.getElementById(id);
    // if (circle) {
    //   if (!circle.classList == 'taken') {
    //     if (!circle.classList == 'chosen') {
    //       circle.classList.remove('notChosen');
    //       circle.classList.add('chosen');
    //       setTotalPrice(totalPrice + 50);
    //     } else {
    //       circle.classList.remove('chosen');
    //       circle.classList.add('notChosen');
    //       setTotalPrice(totalPrice - 50);
    //     }
    //     setCountPlaces(document.getElementsByClassName('chosen').length);
    //   }
    // }
  }

  function payerPlace() {

    const chosenCircles = document.getElementsByClassName('chosen');


    if (countPlaces != 0) {

      const userEmail = JSON.parse(localStorage.getItem('user')).email;
      const gameName = `${homeTeam} vs. ${extTeam}`;
      const sectionName = section;

      Array.from(chosenCircles).forEach((circle) => {
        const placeID = circle.id;

        const credentials = {
          user_email: userEmail,
          game: gameName,
          section: sectionName,
          place: placeID,
        };

        axios.put('http://localhost:8888/places', credentials)
          .then((res) => {
            console.log(`Place ${placeID} has been added to the database.`);
          })
          .catch((error) => {
            console.error(`Error adding place ${placeID}:`, error);
          });
      });
    }
  }





  return (

    <div className="reservation--container">
      <Header />

      <div className="container--match">
        <img src={homeTeamLogo} style={{ width: 'auto', height: '15vh' }} ></img>
        <h1>{homeTeam} vs. {extTeam}</h1>
        <img src={extTeamLogo} style={{ width: 'auto', height: '15vh' }}  ></img>
      </div>
      <div className="container--court">
        <img src={court} id="imgCourt"></img>
      </div>
      <div className="container--places" id="divCourt">
        <svg id="gridPlaces" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <rect onClick={() => updateSection("328")} x="10%" y="20%" width="10%" height="10%" />
          <rect onClick={() => updateSection("218")} x="10%" y="40%" width="10%" height="10%" />
          <rect onClick={() => updateSection("326")} x="10%" y="30%" width="10%" height="10%" />
          <rect onClick={() => updateSection("214")} x="10%" y="50%" width="10%" height="10%" />
          <rect onClick={() => updateSection("212")} x="10%" y="60%" width="10%" height="10%" />
          <rect onClick={() => updateSection("316")} x="10%" y="70%" width="10%" height="10%" />

          <rect onClick={() => updateSection("334")} x="20%" y="10%" width="10%" height="10%" />
          <rect onClick={() => updateSection("222")} x="20%" y="20%" width="10%" height="10%" />
          <rect onClick={() => updateSection("118")} x="20%" y="30%" width="10%" height="10%" />
          <rect onClick={() => updateSection("114")} x="20%" y="40%" width="10%" height="10%" />
          <rect onClick={() => updateSection("112")} x="20%" y="50%" width="10%" height="10%" />
          <rect onClick={() => updateSection("108")} x="20%" y="60%" width="10%" height="10%" />
          <rect onClick={() => updateSection("210")} x="20%" y="70%" width="10%" height="10%" />
          <rect onClick={() => updateSection("310")} x="20%" y="80%" width="10%" height="10%" />

          <rect onClick={() => updateSection("338")} x="30%" y="10%" width="10%" height="10%" />
          <rect onClick={() => updateSection("220")} x="30%" y="20%" width="10%" height="10%" />
          <rect onClick={() => updateSection("120")} x="30%" y="30%" width="10%" height="10%" />
          <rect onClick={() => updateSection("116")} x="30%" y="40%" width="10%" height="10%" />
          <rect onClick={() => updateSection("110")} x="30%" y="50%" width="10%" height="10%" />
          <rect onClick={() => updateSection("106")} x="30%" y="60%" width="10%" height="10%" />
          <rect onClick={() => updateSection("206")} x="30%" y="70%" width="10%" height="10%" />
          <rect onClick={() => updateSection("309")} x="30%" y="80%" width="10%" height="10%" />

          <rect onClick={() => updateSection("341")} x="40%" y="10%" width="10%" height="10%" />
          <rect onClick={() => updateSection("20")} x="40%" y="20%" width="10%" height="10%" />
          <rect onClick={() => updateSection("124")} x="40%" y="30%" width="10%" height="10%" />
          <rect onClick={() => updateSection("102")} x="40%" y="60%" width="10%" height="10%" />
          <rect onClick={() => updateSection("202")} x="40%" y="70%" width="10%" height="10%" />
          <rect onClick={() => updateSection("303")} x="40%" y="80%" width="10%" height="10%" />

          <rect onClick={() => updateSection("343")} x="50%" y="10%" width="10%" height="10%" />
          <rect onClick={() => updateSection("17")} x="50%" y="20%" width="10%" height="10%" />
          <rect onClick={() => updateSection("126")} x="50%" y="30%" width="10%" height="10%" />
          <rect onClick={() => updateSection("148")} x="50%" y="60%" width="10%" height="10%" />
          <rect onClick={() => updateSection("200")} x="50%" y="70%" width="10%" height="10%" />
          <rect onClick={() => updateSection("301")} x="50%" y="80%" width="10%" height="10%" />

          <rect onClick={() => updateSection("349")} x="60%" y="10%" width="10%" height="10%" />
          <rect onClick={() => updateSection("15")} x="60%" y="20%" width="10%" height="10%" />
          <rect onClick={() => updateSection("130")} x="60%" y="30%" width="10%" height="10%" />
          <rect onClick={() => updateSection("134")} x="60%" y="40%" width="10%" height="10%" />
          <rect onClick={() => updateSection("140")} x="60%" y="50%" width="10%" height="10%" />
          <rect onClick={() => updateSection("144")} x="60%" y="60%" width="10%" height="10%" />
          <rect onClick={() => updateSection("256")} x="60%" y="70%" width="10%" height="10%" />
          <rect onClick={() => updateSection("375")} x="60%" y="80%" width="10%" height="10%" />

          <rect onClick={() => updateSection("350")} x="70%" y="10%" width="10%" height="10%" />
          <rect onClick={() => updateSection("240")} x="70%" y="20%" width="10%" height="10%" />
          <rect onClick={() => updateSection("132")} x="70%" y="30%" width="10%" height="10%" />
          <rect onClick={() => updateSection("136")} x="70%" y="40%" width="10%" height="10%" />
          <rect onClick={() => updateSection("138")} x="70%" y="50%" width="10%" height="10%" />
          <rect onClick={() => updateSection("142")} x="70%" y="60%" width="10%" height="10%" />
          <rect onClick={() => updateSection("254")} x="70%" y="70%" width="10%" height="10%" />
          <rect onClick={() => updateSection("374")} x="70%" y="80%" width="10%" height="10%" />

          <rect onClick={() => updateSection("356")} x="80%" y="20%" width="10%" height="10%" />
          <rect onClick={() => updateSection("242")} x="80%" y="30%" width="10%" height="10%" />
          <rect onClick={() => updateSection("244")} x="80%" y="40%" width="10%" height="10%" />
          <rect onClick={() => updateSection("248")} x="80%" y="50%" width="10%" height="10%" />
          <rect onClick={() => updateSection("250")} x="80%" y="60%" width="10%" height="10%" />
          <rect onClick={() => updateSection("368")} x="80%" y="70%" width="10%" height="10%" />
        </svg>
      </div>
      <div className="container--tickets">
        {section !== '' ? (
          <div className="ticketsSelect">
            <p>Section sélectionnée : {section}</p>
            <p>Nombre de places : {countPlaces}</p>
            <p>Prix total : {totalPrice}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                Array.from({ length: 9 }).map((_, seatIndex) => {
                  const id = (rowIndex + 1) * 10 + seatIndex + 1;
                  return (
                    <circle
                      key={`seat-${id}`}
                      cx={`${(seatIndex + 1) * 10}%`}
                      cy={`${(rowIndex + 1) * 14}%`}
                      r="2"
                      className="notChosen"
                      id={id.toString()}
                      onClick={() => clickPlace(id)}
                    />
                  );
                })
              ))}

              {/* {Array.from({ length: 5 }).map((_, rowIndex) =>
                Array.from({ length: 9 }).map((_, seatIndex) => {
                  const id = (rowIndex + 1) * 10 + seatIndex + 1;
                  const seatState = determineSeatState(id);

                  return (
                    <circle
                      key={`seat-${id}`}
                      cx={`${(seatIndex + 1) * 10}%`}
                      cy={`${(rowIndex + 1) * 14}%`}
                      r="2"
                      className={seatState}
                      id={id.toString()}
                      onClick={() => clickPlace(id, seatState)}
                    />
                  );
                })
              )} */}
            </svg>
            <button onClick={() => payerPlace()}>PAYE</button>
          </div>
        ) : (
          <p>Sélectionnez une section</p>
        )}
      </div>

    </div >

  )
}

export default GameReservation