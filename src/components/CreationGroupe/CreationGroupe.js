import React from 'react';
import { useState, useRef } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import './CreationGroupe.css'

const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiInputBase-root": {
        background: "white",
        textAlign: "center",
        color: "black",
        borderRadius: "5px",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        fontWeight: "normal",
        fontFamily: "Inder",
        fontSize: "15px",
        width: "200px",


      },
      "& .MuiOutlinedInput-root": {
        padding: 0,
        margin: 0,
      },
      "& MuiAutocomplete-inputRoot": {
        padding: 0,
        margin: 0,
      }
    }
  }));

function CreationGroupe(props){

    const [groupe, setGroupe] = useState('');
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [nomPrenom, setNomPrenom] = useState();
    const [etudiants, setEtudiants] = useState([]);
    const [datas, setDatas] = useState([]);
    const classes = useStyles();
    const autoC = useRef(null);

    function handleGroupe(e) {
        const newGroupe = e.target.value;
        const newGroupeCap = newGroupe.split(' ').map(word => word.charAt(0).toUpperCase() + word.substr(1)).join(' ');
        setGroupe(newGroupeCap);
    }

    function handleAddEtudiant() {
        if (nom && prenom) {
            setEtudiants([...etudiants, {nom, prenom}]);
            setNom('');
            setPrenom('');
        }
        const ele = autoC.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0];
        if (ele) ele.click();
    }

    function handleDeleteEtudiant(index) {
        const newEtudiants = [...etudiants];
        newEtudiants.splice(index, 1);
        setEtudiants(newEtudiants);
    }

    function handleNomPrenom(e) {
        const fullName = e.target.value;
        const parts = fullName.split(" ");
        const prenom = parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].substr(1).toLowerCase();
        const nom = parts.slice(0, -1).join(" ").toUpperCase();
        setNom(nom);
        setPrenom(prenom);
    }

    function handleNomPrenomAutoComplete(fullName) {
        const parts = fullName.split(" ");
        const prenom = parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].substr(1).toLowerCase();
        const nom = parts.slice(0, -1).join(" ").toUpperCase();
        setNom(nom);
        setPrenom(prenom);
    }

    function handleAutoComplete(e) {
        const input = e.target.value;
        const url = `http://127.0.0.1:8000/api/v1.0/etudiants/${input}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setDatas(data);
        })
    }

    //fonction qui envoie la requete api pour créer le groupe
    function handleCreateGroupe() {
        const url = 'http://127.0.0.1:8000/api/v1.0/groupe/creation';
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
                nom: groupe
            }
          )
        })
        .catch(error => {
            console.error('Error:', error);
            
        });

        setNom('');
        setPrenom('');
        setEtudiants([]);
        setGroupe('');
    }

    return (
        <div>
            <div className='creation-groupe'>
                
                <div className='inputs'>
                    <div>
                        <label htmlFor='nomGroupe'>Nom du groupe</label>
                        <TextField className={classes.root} name='nomGroupe' id='nomGroupe' type='text' value={groupe} onChange={handleGroupe}/>
                    </div>

                    <div className='input-eleve'>
                        <div>
                            <label htmlFor='nom-prenom'>NOM Prénom</label>
                            {/* <input name='nom-prenom' id='nom-prenom' type='text' value={nomPrenom} onChange={handleNomPrenom}/> */}
                            <div>
                            <Autocomplete
                                className={classes.root}
                                name='nom-prenom'
                                id='nom-prenom'
                                type='text'
                                freeSolo
                                ref={autoC}
                                inputValue={nomPrenom}
                                onInputChange={(_, nomPrenomSelect) => { handleNomPrenomAutoComplete(nomPrenomSelect); }}
                                options={datas.map((option) => option.nom.toUpperCase() + ' ' + option.prenom)}
                                renderInput={(params) => 
                                <TextField
                                    className={classes.root}
                                    {...params}
                                    value={nomPrenom}
                                    onChange={(event) => { handleNomPrenom(event); handleAutoComplete(event); }}
                                />}
                            />
                            
                            
                            </div>
                        </div>

                        <button className="button-rectangle" type="button" onClick={handleAddEtudiant}>AJOUTER ➤</button>

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
                <button className="button-rectangle" type="button" onClick={handleCreateGroupe}>Créer</button>
            </div>
        </div>
    );
}

export default CreationGroupe;