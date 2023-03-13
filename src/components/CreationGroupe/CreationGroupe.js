import React, { useEffect } from 'react';
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
        fontWeight: "normal",
        fontFamily: "Inder",
        fontSize: "15px",
        width: "200px",
      },
    }
}));


/*
 * Composant CreationGroupe : permet de créer un nouveau groupe ou de modifier un groupe existant
 *
 * props (si création de groupe) :
 * - updateGroupe : fonction qui permet de mettre à jour la liste des groupes après la création d'un nouveau groupe
 * 
 * props (si modification de groupe) :
 * - setShowEditForm : fonction qui permet de cacher/afficher le formulaire de modification
 * - id : id du groupe à modifier
 * - nom : nom du groupe à modifier
 * - etudiants : étudiants du groupe à modifier
 * - getEtudiantsOfGroupe : fonction qui récupère les étudiants d'un groupe
 */
function CreationGroupe(props){

    const [groupe, setGroupe] = useState('');
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [ine, setIne] = useState();
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
            // On vérifie que l'étuddiant existe dans la base de données
            let exist = false;
            for (let i = 0; i < datas.length; i++) {
                if (datas[i].nom.toUpperCase() === nom && datas[i].prenom === prenom) {
                    exist = true;
                    setIne(datas[i].ine);
                }
            }
            if (!exist) {
                return;
            }

            setEtudiants([...etudiants, {nom, prenom, ine}]);

            // supprimer l'étudiant ajouté du tableau datas
            let newDatas = [...datas];
            for (let i = 0; i < newDatas.length; i++) {
                if (newDatas[i].nom.toUpperCase() === nom && newDatas[i].prenom === prenom) {
                    newDatas.splice(i, 1);
                }
            }
            setDatas(newDatas);

            setNom('');
            setPrenom('');
            setIne('');
        }
        const ele = autoC.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0];
        if (ele) ele.click();
    }

    function handleDeleteEtudiant(index) {
        const newEtudiants = [...etudiants];
        newEtudiants.splice(index, 1);
        setEtudiants(newEtudiants);
        // ajouter l'étudiant supprimé au tableau datas
        setDatas([...datas, {nom: etudiants[index].nom, prenom: etudiants[index].prenom, ine: etudiants[index].ine}]);
    }

    function handleNomPrenom(e) {
        const fullName = e.target.value;
        const parts = fullName.split(" ");
        const monPrenom = parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].substr(1).toLowerCase();
        const monNom = parts.slice(0, -1).join(" ").toUpperCase();
        setNom(monNom);
        setPrenom(monPrenom);
    }

    function handleNomPrenomAutoComplete(fullName) {
        const parts = fullName.split(" ");
        const monPrenom = parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].substr(1).toLowerCase();
        const monNom = parts.slice(0, -1).join(" ").toUpperCase();

        //for qui trouve l'ine correspondant au nom et prenom en piochant dans le tableau datas qui est le tableau des étudiants qu'on récupère de l'api
        for (let i = 0; i < datas.length; i++) {
            if (datas[i].nom.toUpperCase() === monNom && datas[i].prenom === monPrenom) {
                setIne(datas[i].ine);
            }
        }
        setNom(monNom);
        setPrenom(monPrenom);
    }

    function handleAutoComplete(e) {
        const input = e.target.value;
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/etudiants/' + input;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            let tempData = [];
            data.map((etudiant)=> {
                // Si l'étudiant n'est pas déjà etudiants, on l'ajoute à tempData
                if (!etudiants.some((item) => item.nom === etudiant.nom && item.prenom === etudiant.prenom)) {
                    tempData.push(etudiant);
                }
            })
            setDatas(tempData);
        })
    }

    //fonction qui envoie la requete api pour créer le groupe
    function handleCreateGroupe() {
        if(!groupe){
            document.getElementById('nomGroupe').focus();
            document.getElementById('msg-groupe').innerHTML = 'Veuillez renseigner le nom du groupe'; 
            return;
        }else if(!etudiants.length){
            document.getElementById('nom').focus();
            document.getElementById('msg-groupe').innerHTML = 'Veuillez renseigner au moins un étudiant';
            return;
        }else{
            document.getElementById('msg-groupe').innerHTML = '';
        }
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/groupe/creation';
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
                nom: groupe,
                ines: etudiants.map(etudiant => etudiant.ine)
            }
          )
        }).then( () => {
            props.updateGroupe();
        })
        .catch(error => {
            console.error('Error:', error);
        });


        setNom('');
        setPrenom('');
        setEtudiants([]);
        setGroupe('');
    }
            

    function handleUpdateGroupe(id, nom, etudiants,setShowEditForm){
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/groupe/miseajour';
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                nom: nom,
                ines: etudiants.map((item) => item.ine)
            })
        })
        .then(response => {
            if (response.ok) {
                props.getEtudiantsOfGroup(props.id);
            } else {
                throw new Error('UpdateGroupe error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        setShowEditForm(false);
    }

    useEffect(() => {
        if (props.etudiants) {
            setEtudiants(props.etudiants);
            setGroupe(props.nom);
        }
    }, [props.etudiants]);

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
                            <div>
                            <Autocomplete
                                className={classes.root}
                                name='nomPrenom'
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
                                <img src="button-delete.png" className="bouton-edit" alt='Bouton edit' onClick={() => handleDeleteEtudiant(index)}/>
                                <p>{etudiant.nom} {etudiant.prenom}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="validation-groupe">
                    <div id='msg-groupe' className='msg-groupe'></div>

                    {(props.nom) ?
                        <button className="button-rectangle input-creer" type="button" onClick={() => {
                            handleUpdateGroupe(props.id, groupe, etudiants, props.setShowEditForm)}}>Modifier</button>
                        :
                        <button className="button-rectangle input-creer" type="button" onClick={() => handleCreateGroupe()}>Créer</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default CreationGroupe;