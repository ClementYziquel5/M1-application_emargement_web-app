import * as React from 'react';
import { useState, useRef, useEffect } from "react";

import './Filtres.css'

/*
 * Composant Filtres : permet de filtrer les sessions à afficher 
 * par matière, groupe, intervenant, salle et date
 * 
 * props : 
 * - datas : données des groupes, salles, intervenants et matières
 * 
 * - filtres : filtres appliqués à la liste des sessions, on les stocke pour pouvoir les réappliquer lors du rechargement de la page(si edition ou visualisation)
 * - setFiltres : fonction qui permet de mettre à jour les filtres
 * 
 * - setSessions : fonction qui permet de mettre à jour la liste des sessions à afficher
 * 
 * - edit : booléen qui permet de savoir si on est en mode édition
 * - visu : booléen qui permet de savoir si on est en mode visualisation
 */
function Filtres(props){
    const [matieres, setMatieres] = useState([]); // Liste des matières
    const [groupes, setGroupes] = useState([]); // Liste des groupes
    const [intervenants, setIntervenants] = useState([]); // Liste des intervenants
    const [salles, setSalles] = useState([]); // Liste des salles
    const [date, setDate] = useState(""); // Date
    const [isLoaded, setIsLoaded] = useState(false); // Booléen qui permet de savoir si les données sont chargées
    const [isFiltred, setIsFiltred] = useState(false); // Booléen qui permet de savoir si les filtres ont été appliqués
    
    useEffect(() => { // au chargement de la page, on récupère les datas et les filtres à appliquer
        if(props.datas !== undefined && props.filtres !== undefined){
            setDate(props.filtres.date);
            setGroupes(props.datas.groupes);
            setSalles(props.datas.salles);
            setIntervenants(props.datas.intervenants);
            setMatieres(props.datas.matieres);
        }
        setIsLoaded(true); // Les données sont chargées
    }, []);


    useEffect(() => { // Lorsque les données sont chargées, on applique les filtres
        if(isLoaded){
            if(props.filtres.matiere !== "0"){
                document.getElementById('select-matiere-Filtres').value = props.filtres.matiere;
            }
            if(props.filtres.groupe !== "0"){
                document.getElementById('select-groupe-Filtres').value = props.filtres.groupe;
            }
            if(props.filtres.intervenant !== "0"){
                document.getElementById('select-intervenant-Filtres').value = props.filtres.intervenant;
            }
            if(props.filtres.salle !== "0"){
                document.getElementById('select-salle-Filtres').value = props.filtres.salle;
            }
            if(props.filtres.date !== "0"){
                document.getElementById('date-input-Filtres').value = props.filtres.date;
            }
            setIsFiltred(true); // Les filtres sont appliqués
            setIsLoaded(false); // Les données ne sont plus chargées
        }        
    }, [isLoaded]);


    useEffect(() => { // Lorsque les filtres sont appliqués, on récupère les valeurs des select et on met à jour la liste des sessions en fonction des filtres
        if(isFiltred){ 
            getSelectValues(); 
            setIsFiltred(false);
        }
    }, [isFiltred]);


    //fonction qui récupère les valeurs des select et qui met à jour la liste des sessions en fonction des filtres
    function getSelectValues() {
        let matiere = document.getElementById('select-matiere-Filtres').value;
        let groupe = document.getElementById('select-groupe-Filtres').value;
        let intervenant = document.getElementById('select-intervenant-Filtres').value;
        let salle = document.getElementById('select-salle-Filtres').value;
        let date = document.getElementById('date-input-Filtres').value;

        // Si les valeurs des select sont vides, on met 0 pour les filtres (0 = pas de filtre)
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

        // On met à jour les filtres dans le state, pour pouvoir les réutiliser lors du prochain chargement de la page
        props.setFiltres({date: date, groupe: groupe, matiere: matiere, intervenant: intervenant, salle: salle});

        // On passe la requête à l'API pour récupérer les sessions en fonction des filtres
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/sessions/date='+date+'/groupe='+groupe+'/matiere='+matiere+'/intervenant='+intervenant+'/salle='+salle;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            props.setSessions(data);
        })
        .catch(error => console.log(error));
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