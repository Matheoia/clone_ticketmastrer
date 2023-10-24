import { useState } from "react"
import axios from "axios"


function SignUp() {

    const [messageErreur, setMessageErreur] = useState('')

    const [credentials, setCredentials] = useState({
        prenom: "Matheo",
        nom: "Marechal",
        email: 'matheo.marechal@ensg.eu',
        password: 'password'
    })

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:8888/users', credentials)
            .then((res) => {
                if (res.data.message === 'User created') {
                    localStorage.setItem('user', JSON.stringify(res.data.data));
                    window.location.href = '/home';
                } else {
                    console.log('Erreur lors de la création du compte:', res.data.message);
                }
            })
            .catch(err => setMessageErreur(err.response.data.message))

    }

    return (
        <div className="container--SignIn">
            <form onSubmit={onSubmit}>
                <div className="group">
                    <label>Prenom</label>
                    <input type="text" name="prenom" value={credentials.prenom} onChange={onChange} />
                </div>
                <div className="group">
                    <label>Nom</label>
                    <input type="text" name="nom" value={credentials.nom} onChange={onChange} />
                </div>
                <div className="group">
                    <label>Email</label>
                    <input type="text" name="email" value={credentials.email} onChange={onChange} />
                </div>
                <div className="group">
                    <label>Mot de passe</label>
                    <input type="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <div className="group">
                    <button>Connexion</button>
                </div>
            </form>
            <p>{messageErreur}</p>
            <a href="/SignUp">Already have an account ?</a>
        </div>
    )

}

export default SignUp;