import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";

function UserAccount() {

    const [messageErreur, setMessageErreur] = useState("");
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (!storedUser) {
                    setMessageErreur('No user data found in local storage');
                    return;
                }

                const credentials = { user_email: storedUser.email };

                const response = await axios.post('http://localhost:8888/places/search', credentials);

                setPlaces(response.data.data);
            } catch (error) {
                setMessageErreur(error.response?.data?.message || "An error occurred");
            }
        };

        fetchData(); 
    }, []);



    return (

        <div className="container--userAccount">
            <Header />
            {messageErreur && <div>{messageErreur}</div>}
            {places && (
                <ul>
                    {places.map((place, index) => (
                        <li key={index}>{place.user_email}, {place.game}, {place.section}, {place.place}</li>
                    ))}
                </ul>
            )}

        </div>

    )

}

export default UserAccount;
