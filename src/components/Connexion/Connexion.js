import React from "react";
import './Connexion.css'

function Connexion(props){

    return (
        <div>
            <div className='logo'>
                <img src='logo-ISEN.png' alt='logo'></img>
            </div>
            <div className='connexion'>
                <div className='form-connexion'>
                    
                    <label htmlFor='identifiant'>Connexion</label>
                    <input type='text' id='identifiant' placeholder='Identifiant CAS'></input>
                    <input type='password' id='password' placeholder='Mot de passe'></input>
                    <button onClick={() => {props.cas.attemptCasLogin(false)}}>SE CONNECTER</button>
                    
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
