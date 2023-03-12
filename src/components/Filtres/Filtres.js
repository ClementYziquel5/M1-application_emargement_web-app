import * as React from 'react';
import { useState, useRef, useEffect } from "react";

import './Filtres.css'

function Filtres(props){
    const [matieres, setMatieres] = useState([]);
    const [groupes, setGroupes] = useState([]);
    const [intervenants, setIntervenants] = useState([]);
    const [salles, setSalles] = useState([]);
    const [date, setDate] = useState("");

    useEffect(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const today = `${year}-${month}-${day}`;
      setDate(today);
    }, []);
    
    useEffect(() => {
        if(props.datas !== undefined){
            setGroupes(props.datas.groupes);
            setSalles(props.datas.salles);
            setIntervenants(props.datas.intervenants);
            setMatieres(props.datas.matieres);
        }
    }, []);

    useEffect(() => {
        if(props.filtres.matiere !== "0"){
            console.log("matiere", props.filtres.matiere);
            document.getElementById('select-matiere-Filtres').value = props.filtres.matiere;
        }
        if(props.filtres.groupe !== "0"){
            console.log("groupe", props.filtres.groupe);
            document.getElementById('select-groupe-Filtres').value = props.filtres.groupe;
        }
        if(props.filtres.intervenant !== "0"){
            console.log("intervenant", props.filtres.intervenant);
            document.getElementById('select-intervenant-Filtres').value = props.filtres.intervenant;
        }
        if(props.filtres.salle !== "0"){
            console.log("salle", props.filtres.salle);
            document.getElementById('select-salle-Filtres').value = props.filtres.salle;
        }
        if(props.filtres.date !== "0"){
            console.log("date", props.filtres.date);
            document.getElementById('date-input-Filtres').value = props.filtres.date;
        }
        console.log("filtres", props.filtres);
        getSelectValues();
    }, []);

    //fonction qui récupère les valeurs des select
    function getSelectValues() {
        let matiere = document.getElementById('select-matiere-Filtres').value;
        let groupe = document.getElementById('select-groupe-Filtres').value;
        let intervenant = document.getElementById('select-intervenant-Filtres').value;
        let salle = document.getElementById('select-salle-Filtres').value;
        let date = document.getElementById('date-input-Filtres').value;

        if (matiere === '') {
            matiere = '0';
        }
        if (groupe === '') {
            groupe = '0';
        }
        if (intervenant === '') {
            intervenant = '0';
        }
        if (salle === '') {
            salle = '0';
        }
        if (date === '') {
            date = '0';
        }

        props.setFiltres({date: date, groupe: groupe, matiere: matiere, intervenant: intervenant, salle: salle});

        getSessions(date, groupe, matiere, intervenant, salle);

        function getSessions(date, groupe, matiere, intervenant, salle){
            const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/sessions/date='+date+'/groupe='+groupe+'/matiere='+matiere+'/intervenant='+intervenant+'/salle='+salle;
            fetch(url)
            .then(response => response.json())
            .then(data => {
                props.setSessions(data);
            })
            .catch(error => console.log(error));
        }
    }

    
    return (
        <div className="top-filtres">
            <div className="filtres">

                <select className="select" id='select-matiere-Filtres' defaultValue=''>
                    <option className='select-default' value=''>Matière</option>
                    {matieres.map((item) => (
                        <option value={item.id} key={item.matiere}>
                            {item.matiere}
                        </option>
                    ))}
                </select>
                
                <select className="select" id='select-groupe-Filtres' defaultValue=''>
                    <option className='select-default' value=''>Groupe</option>
                    {groupes.map((item) => (
                        <option value={item.id} key={item.groupe}>
                            {item.groupe}
                        </option>
                    ))}
                </select>

                <select className="select" id='select-intervenant-Filtres' defaultValue=''>
                    <option className='select-default' value=''>Intervenant</option>
                    {intervenants.map((item) => (
                        <option value={item.id} key={item.nom}>
                            {item.nom.toUpperCase() + ' ' + item.prenom}
                        </option>
                    ))}
                </select>
                
                <select className="select" id='select-salle-Filtres' defaultValue=''>
                    <option className='select-default' value=''>Salle</option>
                    {salles.map((item) => (
                        <option value={item.id} key={item.salle}>
                            {item.salle}
                        </option>
                    ))}
                </select>

                <input className="select" required name='date' id='date-input-Filtres' type='date' defaultValue={date}></input>
                
                <div id="button-afficher-Filtres">
                    <button className="button-rectangle" type="button" onClick={ () => getSelectValues()}>Afficher
                    </button>
                </div>
                
            </div>
        </div>
       
    );
}

export default Filtres;