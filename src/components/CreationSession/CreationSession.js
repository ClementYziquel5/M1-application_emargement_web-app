import * as React from 'react';
import { useState, useRef, useEffect } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import './CreationSession.css'

const animatedComponents = makeAnimated();

const multiSelectStyle = {
    dropdownIndicator: (base) => ({
        ...base,
        ":hover": {
            cursor: 'pointer',
        }
    }),
    control: (provided, state) => ({
        ...provided,
        width: '220px',
        height: '120px',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '16px',
        alignItems: 'flex-start',
        border: '0px',
        overflow: 'hidden',
        ":hover": {
            cursor: 'text',
        }
    }),
    menu: (provided, state) => ({
        ...provided,
        width: '220px',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '16px',
        margin: '0px',
        padding: '0px',
        ":hover": {
            cursor: 'pointer',
        }
    }),
    option: (provided, state) => ({
        ...provided,
        color: 'black', // Modifier la couleur de la police
        backgroundColor: state.isSelected ? 'blue' : 'white', // Modifier la couleur de fond en fonction de l'état de la sélection
        '&:hover': {
          backgroundColor: 'rgb(245,245,245)', // Modifier la couleur de fond au survol
          cursor: 'pointer',
        },
    }),
    valueContainer: (provided) => ({
        ...provided,
        width: '200px', // Modifier l'espace entre les options sélectionnées
        padding: '3px',
        '&:hover': {
            cursor: 'pointer',
        },
    }),
    clearIndicator: (provided, state) => ({
        ...provided,
        cursor: 'pointer', // Modifier le curseur de la croix
    }),
}

const simpleSelectStyle = {
    control: (provided, state) => ({
        ...provided,
        width: '220px',
        height: '2.7em',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '16px',
        alignItems: 'flex-start',
        border: '0px',
        overflow: 'hidden',
        ":hover": {
            cursor: 'text',
        }
    }),
    menu: (provided, state) => ({
        ...provided,
        width: '220px',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '16px',
        margin: '0px',
        padding: '0px',
        ":hover": {
            cursor: 'pointer',
        }
    }),
    option: (provided, state) => ({
        ...provided,
        color: 'black', // Modifier la couleur de la police
        backgroundColor: state.isSelected ? 'blue' : 'white', // Modifier la couleur de fond en fonction de l'état de la sélection
        '&:hover': {
          backgroundColor: 'lightgray', // Modifier la couleur de fond au survol
          cursor: 'pointer',
        },
    }),
    valueContainer: (provided) => ({
        ...provided,
        width: '200px', // Modifier l'espace entre les options sélectionnées
        padding: '3px',
        '&:hover': {
            cursor: 'pointer',
        },
    }),
    clearIndicator: (provided, state) => ({
        ...provided,
        cursor: 'pointer', // Modifier le curseur de la croix
    }),
}

const selectTheme = (theme) => ({
    ...theme,
    colors: {
            ...theme.colors,
            primary25: 'lightgray',
            primary: 'black',
    },
})

function CreationSession(props){
    const [groupes, setGroupes] = useState('');
    const [salles, setSalles] = useState('');
    const [intervenants, setIntervenants] = useState('');

    const [groupesOptions, setGroupesOptions] = useState('');
    const [sallesOptions, setSallesOptions] = useState('');
    const [intervenantsOptions, setIntervenantsOptions] = useState('');

    const [types, setTypes] = useState([]);
    const [matieres, setMatieres] = useState([]);
    const [idGroupes,setIdGroupes] = useState([]);
    const [idSalles,setIdSalles] = useState([]);
    const [idIntervenants,setIdIntervenants] = useState([]);
    
    useEffect(() => {
            getTypes();
            getMatieres();
            getSalles();
            getGroupes();
            getIntervenants();
            //setConstantes();
    }, []);

    function setConstantes() {
        console.log("test");
        setGroupes([{id: 1, groupe: 'Groupe 1'}, {id: 2, groupe: 'Groupe 2'}]);
        setSalles([{id: 1, salle: 'Salle 1'}, {id: 2, salle: 'Salle 2'}]);
        setIntervenants([{id: 1, intervenant: 'Intervenant 1'}, {id: 2, intervenant: 'Intervenant 2'}]);
        
        setGroupesOptions([{value: 'Groupe 1', label: 'Groupe 1'}, {value: 'Groupe 2', label: 'Groupe 2'}]);
        setSallesOptions([{value: 'Salle 1', label: 'Salle 1'}, {value: 'Salle 2', label: 'Salle 2'}]);
        setIntervenantsOptions([{value: 'Intervenant 1', label: 'Intervenant 1'}, {value: 'Intervenant 2', label: 'Intervenant 2'}]);
        
        setTypes([{type: 'Cours'}, {type: 'TD'}, {type: 'TP'}]);
        setMatieres([{id: 1, matiere: 'Mathématiques'}, {id: 2, matiere: 'Physique'}, {id: 3, matiere: 'Chimie'}]);
    }

    function getTypes() {
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/types';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setTypes(data);
        })
        .catch(error => console.error(error));
    }

    function getMatieres() {
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/matieres';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setMatieres(data);
        })
        .catch(error => console.error(error));
    }

    function getSalles() {
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/salles';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const salle = data.map((item) => {
                return {value: item.salle, label: item.salle}
            })
            setSalles(data);
            setSallesOptions(salle);
        })
        .catch(error => console.error(error));
    }

    function getGroupes() {
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/groupes';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const groupe = data.map((item) => {
                return {value: item.groupe, label: item.groupe}
            })
            setGroupes(data);
            setGroupesOptions(groupe);
        })
        .catch(error => console.error(error));
    }

    function getIntervenants() {
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/intervenants';

        fetch(url)
        .then(response => response.json())
        .then(data => {
            const intervenant = data.map((item) => {
                return {value: item.nom.toUpperCase() + ' ' + item.prenom, label: item.nom.toUpperCase() + ' ' + item.prenom}
            })
            setIntervenants(data);
            setIntervenantsOptions(intervenant);
        })
        .catch(error => console.error(error));
    }

    function handleCreateSession() {      
        let date = document.getElementById('input-date').value;
        let heure_debut = document.getElementById('input-heure-debut').value;
        let heure_fin = document.getElementById('input-heure-fin').value;

        let id_matiere;
        let matiereSelectionnee = document.getElementById('select-matiere').value;
        for (let i = 0; i < matieres.length; i++) {
            if (matieres[i].matiere === matiereSelectionnee) {
                id_matiere = matieres[i].id;
                break;
            }
        }

        let type = document.getElementById('select-type').value;

        console.log("date : ", date);
        console.log("heure_debut : ", heure_debut);
        console.log("heure_fin : ", heure_fin);
        console.log("id_matiere : ", id_matiere);
        console.log("type : ", type);
        console.log("idGroupes : ", idGroupes);
        console.log("idSalles : ", idSalles);
        console.log("idIntervenants : ", idIntervenants);

        console.log("typeof : ", typeof idIntervenants);


        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/session/create';
        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                date: date,
                heure_debut: heure_debut,
                heure_fin: heure_fin,
                id_matiere: id_matiere,
                type: type,
                idGroupes: idGroupes,
                idSalles: idSalles,
                idIntervenants: idIntervenants,
            }
            )
        })
        .catch(error => {
            console.error('Error:', error);
            
        });
    }

    function handleChangeGroupe(e) {
        let ids = [];
        e.map((item) => {
            const groupe = groupes.find(g => g.groupe === item.value);
            if(groupe.id) {
                ids.push(groupe.id);
            }
        })
        setIdGroupes(ids);
    }

    function handleChangeSalle(e) {
        let ids = [];
        e.map((item) => {
            const salle = salles.find(s => s.salle === item.value);
            if(salle.id) {
                ids.push(salle.id);
            }
        })
        setIdSalles(ids);
    }

    function handleChangeIntervenant(e) {
        let ids = [];
        e.map((item) => {
            const fullName = item.value;
            const parts = fullName.split(" ");
            const nom = parts.slice(0, -1).join(" ").toUpperCase();
            const prenom = parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].substr(1).toLowerCase();
            
            const intervenant = intervenants.find(i => i.nom.toUpperCase() === nom);
            if(intervenant.id) {
                ids.push(intervenant.id);
            }
        })
        setIdIntervenants(ids);
    }


    return (
        <div>
            <div>
                <div className='creationSession'>
                    <div className='inputGroupe'>
                        <div className="matiere">
                            <label htmlFor='matiere'>Matière</label>
                            <select id='select-matiere' defaultValue=''>
                                <option value='' disabled>Choisir une matière</option>
                                {matieres.map((item) => (
                                    <option value={item.matiere} key={item.matiere}>
                                        {item.matiere}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="type">
                            <label htmlFor='type'>Type</label>
                            <select id='select-type'>
                                {types.map((item) => (
                                    <option value={item.type} key={item.type}>
                                        {item.type}
                                    </option>
                                ))}
                            </select>
                          
                        </div>
                    </div>

                    <div className="inputGroupe">
                        <label htmlFor='salle'>Salle(s)</label>
                        <Select
                            id = 'select-salle'
                            placeholder=""
                            components={animatedComponents}
                            isMulti
                            options={sallesOptions}
                            theme={selectTheme}
                            styles={multiSelectStyle}
                            onChange={handleChangeSalle}
                        />

                    </div>

                    <div className="inputGroupe">
                        <label htmlFor='groupe'>Groupe(s)</label>
                        <Select
                            id = 'select-groupe'
                            placeholder=""
                            components={animatedComponents}
                            isMulti
                            options={groupesOptions}
                            theme={selectTheme}
                            styles={multiSelectStyle}
                            onChange={handleChangeGroupe}
                        />
                    </div>

                    <div className="inputGroupe">
                        <label htmlFor='intervenant'>Intervenant(s)</label>
                        <Select
                            id = 'select-intervenant'
                            placeholder=""
                            components={animatedComponents}
                            isMulti
                            options={intervenantsOptions}
                            theme={selectTheme}
                            styles={multiSelectStyle}
                            onChange={handleChangeIntervenant}
                        />
                    </div>

                    <div className='dateHeure'>
                        <div>
                            <label htmlFor='date'>Date</label>
                            <input required name='date' id='input-date' type='date' ></input>
                        </div>

                        <div>
                            <label htmlFor='heure_debut'>Début</label>
                            <input required name='heure_debut' id='input-heure-debut' type='time'></input>
                        </div>

                        <div>
                            <label htmlFor='heure_fin'>Fin</label>
                            <input required name='heure_fin' id='input-heure-fin' type='time'></input>
                        </div>
                    </div>
                    
                    <button className='button-rectangle' type="button" onClick={handleCreateSession}>Créer</button>
                </div>
            </div>
        </div>
    );
}

export default CreationSession;