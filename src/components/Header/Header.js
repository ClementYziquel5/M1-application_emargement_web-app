import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

function Header(props){
    const [showInfos, setShowInfos] = useState(false);
    const handleClick = () => {
      setShowInfos(!showInfos);
    };

    return (
        <div className="header">
            <div className="logo-div">
                <img src="logo.png" className="logo" alt='ISEN Logo'></img>
            </div>

            <div className="navbar">
                <Link to="/sessions">Sessions</Link>
                <Link to="/groupes">Groupes</Link>
                <Link to="/creation">Création</Link>
            </div>

            <div>
                <div className="hamburger-div">
                    <img src="hamburger-white.png" className="hamburger" alt='hamburger'  onClick={handleClick}></img>             
                </div>
            
                <div className='infos-hamburger' style={{ display: showInfos ? 'block' : 'none' }}>
                    <p id='nom'>Nom Prenom</p>
                    <p id='pseudo'>pseudo</p>
                    <a onClick={props.logout}><p className='deconnexion'>Déconnexion</p></a>
                </div>  
            </div>
        </div>
    );
}

export default Header;