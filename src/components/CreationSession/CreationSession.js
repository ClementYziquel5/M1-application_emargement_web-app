import * as React from 'react';
import { useState, useRef, useEffect } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import './CreationSession.css'


const animatedComponents = makeAnimated();

function CreationSession(props){
    const [groupe, setGroupe] = useState('');
    const [salle, setSalle] = useState('');
    const [type, setType] = useState([]);
    const [matiere, setMatiere] = useState([]);
    const options = [];
    useEffect(() => {
            getTypes();
            getMatieres();
            getSalles();
    }, []);

    function handleMatiere(e) {
        const input = e.target.value;
      
    }

    function handleGroupe(e) {
        const input = e.target.value;
    }

    //fonction qui récupère les types via l'API 
    function getTypes() {
        const url = `http://127.0.0.1:8000/api/v1.0/types`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setType(data);
        })
        .catch(error => console.log(error));
    }

    function getMatieres() {
        const url = `http://127.0.0.1:8000/api/v1.0/matieres`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setMatiere(data);
        })
        .catch(error => console.log(error));
    }

    function getSalles() {
        const url = `http://127.0.0.1:8000/api/v1.0/salles`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const salles = data.map((item) => {
                return {value: item.salle, label: item.salle}
            })
            setSalle(salles);
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
                                {matiere.map((item) => (
                                    <option value={item.matiere} key={item.matiere}>
                                        {item.matiere}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="type">
                            <label htmlFor='type'>Type</label>
                            <select id='select-type'>
                                {type.map((item) => (
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
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={salle}
                        />
                        

                        


                    </div>

                    <div className="inputGroupe">
                        <label htmlFor='groupe'>Groupe(s)</label>
                        <textarea required name='groupe' id='input_groupe' type='text'></textarea>
                    </div>

                    <div className="inputGroupe">
                        <label htmlFor='intervenant'>Intervenant(s)</label>
                        <textarea name='intervenant' id='input_intervenant' type='text'></textarea>
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