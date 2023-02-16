import * as React from 'react';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import './Autocomplete.css'

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
    }
  }
}));

export default function FreeSolo(props) {

  const classes = useStyles();
  const [datas, setDatas] = useState([]);

  //fonction qui récupère plusieurs noms pour l'autocomplétion via une requete api en local avec en argument l'input nom-prenom
  function handleAutoComplete(e) {
    const input = e.target.value;
    const url = `http://127.0.0.1:8000/api/v1.0/etudiants/${input}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        setDatas(data);
    })

  }


  return (
    <div>
      <Autocomplete
        className={classes.root}
        name='nom-prenom'
        id='nom-prenom'
        type='text' 
        freeSolo
        options={datas.map((option) => option.nom.toUpperCase() + ' ' + option.prenom)}
        renderInput={(params) => <TextField
                                    className={classes.root}
                                    {...params}
                                  />}
      />
      <br></br>

      </div>
  );
}