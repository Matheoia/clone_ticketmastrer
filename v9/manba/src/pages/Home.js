import Header from "../components/Header";

function Home() {

    
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData);

    return ( 

        <div className="container--home">
            <Header />
        </div>
    )

}

export default Home;