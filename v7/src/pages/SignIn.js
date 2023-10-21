import { useState } from "react"
import axios from "axios"

function SignIn() {

    const [messageErreur, setMessageErreur] = useState('')

    const [credentials, setCredentials] = useState({
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
        axios.post('http://localhost:8888/users/signin', credentials)
            .then((res) => {
                if (res.data.message === 'User signed in') {
                    localStorage.setItem('user', JSON.stringify(res.data.data));
                    window.location.href = '/home';
                } else {
                    setMessageErreur(res.data.message)
                    console.log('Erreur lors de la connexion au compte:', res.data.message);
                }
            })
            .catch(err => setMessageErreur(err.response.data.message))

    }

    return (
        <div className="container--SignUp">
            <form onSubmit={onSubmit}>
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
            <p id="messageErreur">{messageErreur}</p>
            <a href="/">No account ?</a>
        </div>
    )

}

export default SignIn;