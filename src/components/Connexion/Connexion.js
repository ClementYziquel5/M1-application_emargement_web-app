import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CasUserContext } from '../../context/casUserContext.js';
import './Connexion.css'

function Connexion(props){
    const navigate = useNavigate();
    const handleLogin = (event) => {
        // Empêche le rechargement de la page
        event.preventDefault();

        // Récupération des identifiants
        const identifiant = document.getElementById('identifiant').value;
        const password = document.getElementById('password').value;

        // Vérification des identifiants
        // Code à adapter
        if (identifiant === 'cas' && password === '12') {
            props.setIsAuthenticated(true);
            //Rediriger vers la page d'accueil
            navigate('/sessions');
        } else {
            props.setIsAuthenticated(false);
            //Afficher le message d'erreur
            document.getElementById('error-msg').innerHTML = 'Identifiants incorrects';
        }
    }

    return (
        <div>
            <div className='logo'>
                <img src='logo-ISEN.png' alt='logo'></img>
            </div>
            <div className='connexion'>
                <div className='form-connexion'>
                    <form onSubmit={handleLogin}>
                        <label htmlFor='identifiant'>Connexion</label>
                        <input type='text' id='identifiant' placeholder='Identifiant CAS'></input>
                        <input type='password' id='password' placeholder='Mot de passe'></input>
                        <button type='submit'>SE CONNECTER</button>
                    </form>
                </div>
                <div className='forgot-password'>
                    <a href='#'>Mot de passe oublié ?</a>
                </div>
                <div className='login-error'>
                    <p id='error-msg'></p>
                </div>
            </div>
        </div>
    );
}

export default Connexion;
