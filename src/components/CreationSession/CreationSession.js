import React from 'react';
import { useState, useRef, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles'
import './CreationSession.css'

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

function CreationSession(props){
    const [matiere, setMatiere] = useState('');
    const [groupe, setGroupe] = useState('');
    const [datas, setDatas] = useState([]);
    const classes = useStyles();
    useEffect(() => {
            getTypes();
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
            setDatas(data);
            console.log(data);
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
                            <input required name='matiere' id='input_matiere' type='text'></input>
                            {/* <Autocomplete
                                className={classes.root}
                                name='matiere'
                                id='input-matiere'
                                type='text'
                                freeSolo
                                inputValue={matiere}
                                // onInputChange={(_, nomPrenomSelect) => { handleNomPrenomAutoComplete(nomPrenomSelect); }}
                                options={datas.map((option) => option)}
                                renderInput={(params) => 
                                <TextField
                                    className={classes.root}
                                    {...params}
                                    value={matiere}
                                    onChange={(event) => { handleMatiere(event);}}
                                />}
                            /> */}
                        </div>

                        <div className="type">
                            <label htmlFor='type'>Type</label>
                            <select id='select-type'>
                                {datas.map((item) => (
                                    <option value={item.type} key={item.type}>
                                        {item.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="inputGroupe">
                        <label htmlFor='salle'>Salle(s)</label>
                        <textarea name='salle' id='input_salle' type='text'></textarea>
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