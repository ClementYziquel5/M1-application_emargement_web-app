import * as React from 'react';
import { useState, useRef, useEffect } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import './CreationSession.css'


const animatedComponents = makeAnimated();

const multiSelectStyle = {
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
    const [types, setTypes] = useState([]);
    const [matieres, setMatieres] = useState([]);
    const options = [];
    useEffect(() => {
            getTypes();
            getMatieres();
            getSalles();
            getGroupes();
            getIntervenants();
    }, []);

    //fonction qui récupère les types via l'API 
    function getTypes() {
        const url = `http://127.0.0.1:8000/api/v1.0/types`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setTypes(data);
        })
        .catch(error => console.log(error));
    }

    function getMatieres() {
        const url = `http://127.0.0.1:8000/api/v1.0/matieres`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setMatieres(data);
        })
        .catch(error => console.log(error));
    }

    function getSalles() {
        const url = `http://127.0.0.1:8000/api/v1.0/salles`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const salle = data.map((item) => {
                return {value: item.salle, label: item.salle}
            })
            setSalles(salle);
        })
        .catch(error => console.log(error));
    }

    function getGroupes() {
        const url = `http://127.0.0.1:8000/api/v1.0/groupes`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const groupe = data.map((item) => {
                return {value: item.groupe, label: item.groupe}
            })
            setGroupes(groupe);
        })
        .catch(error => console.log(error));
    }

    function getIntervenants() {
        const url = `http://127.0.0.1:8000/api/v1.0/intervenants`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const intervenant = data.map((item) => {
                return {value: item.nom.toUpperCase() + ' ' + item.prenom, label: item.nom.toUpperCase() + ' ' + item.prenom}
            })
            setIntervenants(intervenant);
        })
        .catch(error => console.log(error));
    }


    return (
        <div>
            <form>
                <div className='creationSession'>
                    <div className='inputGroupe'>
                        <div className="matiere">
                            <label htmlFor='matiere'>Matière</label>
                            <select id='select-matiere'>
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
                            placeholder=""
                            components={animatedComponents}
                            isMulti
                            options={salles}
                            theme={selectTheme}
                            styles={multiSelectStyle}
                        />

                    </div>

                    <div className="inputGroupe">
                        <label htmlFor='groupe'>Groupe(s)</label>
                        <Select
                            placeholder=""
                            components={animatedComponents}
                            isMulti
                            options={groupes}
                            theme={selectTheme}
                            styles={multiSelectStyle}
                        />
                    </div>

                    <div className="inputGroupe">
                        <label htmlFor='intervenant'>Intervenant(s)</label>
                        <Select
                            placeholder=""
                            components={animatedComponents}
                            isMulti
                            options={intervenants}
                            theme={selectTheme}
                            styles={multiSelectStyle}
                        />
                    </div>

                    <div className='dateHeure'>
                        <div>
                            <label htmlFor='date'>Date</label>
                            <input required name='date' id='input_date' type='date' ></input>
                        </div>

                        <div>
                            <label htmlFor='heure_debut'>Début</label>
                            <input required name='heure_debut' id='input_heure_debut' type='time'></input>
                        </div>

                        <div>
                            <label htmlFor='heure_fin'>Fin</label>
                            <input required name='heure_fin' id='input_heure_fin' type='time'></input>
                        </div>
                    </div>
                    
                    <input type="submit" value="Créer"/>
                </div>
            </form>
        </div>
    );
}

export default CreationSession;