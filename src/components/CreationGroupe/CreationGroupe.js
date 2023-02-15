import { useState } from "react";
import './CreationGroupe.css'
import React from 'react';

function CreationGroupe(props){

    const [groupe, setGroupe] = useState();
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [nomPrenom, setNomPrenom] = useState();
    const [etudiants, setEtudiants] = useState([]);

    function handleGroupe(e) {
        const newGroupe = e.target.value;
        const newGroupeCap = newGroupe.split(' ').map(word => word.charAt(0).toUpperCase() + word.substr(1)).join(' ');
        setGroupe(newGroupeCap);
    }

    // function handleNom(e) {
    //     setNom(e.target.value.toUpperCase());
    // }

    // function handlePrenom(e) {
    //     const newPrenom = e.target.value;
    //     const newPrenomCap = newPrenom.charAt(0).toUpperCase() + newPrenom.substr(1);
    //     setPrenom(newPrenomCap);
    // }
    
    function handleAddEtudiant() {
        if (nom && prenom) {
            setEtudiants([...etudiants, {nom, prenom}]);
            setNom('');
            setPrenom('');
        }
    }

    function handleNomPrenom(e) {
        const fullName = e.target.value;
        const parts = fullName.split(" ");
        const prenom = parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].substr(1).toLowerCase();
        const nom = parts.slice(0, -1).join(" ").toUpperCase();
        setNom(nom);
        setPrenom(prenom);
    }

    //fonction qui supprime un élève
    function handleDeleteEtudiant(index) {
        const newEtudiants = [...etudiants];
        newEtudiants.splice(index, 1);
        setEtudiants(newEtudiants);
    }


    return (
        <div>
            <div className='creation-groupe'>
                
                <div className='inputs'>
                    <div>
                        <label htmlFor='nomGroupe'>Nom du groupe</label>
                        <input name='nomGroupe' id='nomGroupe' type='text' value={groupe} onChange={handleGroupe}></input>
                    </div>

                    <div className='input-eleve'>
                        <div>
                            <label htmlFor='nom-prenom'>NOM Prénom</label>
                            <input name='nom-prenom' id='nom-prenom' type='text' value={nomPrenom} onChange={handleNomPrenom}/>
                        </div>

                        <button class="button-rectangle" type="button" onClick={handleAddEtudiant}>AJOUTER ➤</button>

                    </div>
                </div>

                <div className='liste'>
                    <h3>Liste des élèves</h3>
                    <div className='eleves'>
                        {etudiants.map((etudiant, index) => (
                            <div className="eleve" key={index}>
                                <img src="button-delete.png" className="bouton-edit" alt='Bouton edit' onClick={handleDeleteEtudiant}/>
                                <p>{etudiant.nom} {etudiant.prenom}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button class="button-rectangle" type="button">Créer</button>
            </div>
        </div>
    );
}

export default CreationGroupe;