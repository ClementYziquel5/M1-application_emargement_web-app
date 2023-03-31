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

const selectTheme = (theme) => ({
    ...theme,
    colors: {
            ...theme.colors,
            primary25: 'lightgray',
            primary: 'black',
    },
})

/*
 * Composant de création ou de modification de session
 *
 * props (création de session):
 * - datas: données nécessaires à la création de la session (groupes, salles, intervenants, matières, types)
 * 
 * props (modification de session):
 * - datas: données nécessaires à la création de la session (groupes, salles, intervenants, matières, types)
 * - session: données de la session à modifier
 * - setSession: fonction de modification de la session
 * - edit: état d'édition de la session
 * - setEdit: fonction de modification de l'état d'édition de la session
 */
function CreationSession(props){
    const [groupes, setGroupes] = useState([]);
    const [salles, setSalles] = useState([]);
    const [intervenants, setIntervenants] = useState([]);

    const [groupesSelected, setGroupesSelected] = useState([]);
    const [sallesSelected, setSallesSelected] = useState([]);
    const [intervenantsSelected, setIntervenantsSelected] = useState([]);

    const [groupesOptions, setGroupesOptions] = useState([]);
    const [sallesOptions, setSallesOptions] = useState([]);
    const [intervenantsOptions, setIntervenantsOptions] = useState([]);

    const [types, setTypes] = useState([]);
    const [matieres, setMatieres] = useState([]);
    const [idGroupes, setIdGroupes] = useState([]);
    const [idSalles, setIdSalles] = useState([]);
    const [idIntervenants, setIdIntervenants] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    
    useEffect(() => {   // Récupèrer toutes les données du datas de App.js et les mettre dans les states du composant
        if(props.datas !== undefined){
            setGroupes(props.datas.groupes);
            // Obligé de dédier un state "setXxOptions" pour les inputs en react-select qui prend en argument un tableau avec item: et label:
            const groupe = props.datas.groupes.map((item) => {  // On convertit notre tableau original avec un tableau compatabible avec react-select
                return {value: item.groupe, label: item.groupe}
            })
            setGroupesOptions(groupe);

            setSalles(props.datas.salles);
            const salle = props.datas.salles.map((item) => {
                return {value: item.salle, label: item.salle}
            })
            setSallesOptions(salle);

            setIntervenants(props.datas.intervenants);
            const intervenant = props.datas.intervenants.map((item) => {
                return {value: item.nom + ' ' + item.prenom, label: item.nom + ' ' + item.prenom}
            })
            setIntervenantsOptions(intervenant);

            setMatieres(props.datas.matieres);
            setTypes(props.datas.types);
            setIsDataLoaded(true);
        }
    }, [props.datas]);    
    
    useEffect(() => { // Remplissage des champs si on est en mode édition de session (props.edit = true) et que les données sont chargées
        if (props.edit && isDataLoaded) {
            fillInputs(props.session);
        }
    }, [props.edit, isDataLoaded])

    function handleCreateSession() {  
        // Vérification & récupération des champs
        
        let date = document.getElementById('input-date').value;
        let heure_debut = document.getElementById('input-heure-debut').value;
        let heure_fin = document.getElementById('input-heure-fin').value;
        let type = document.getElementById('select-type').value;

        let id_matiere;
        let matiereSelectionnee = document.getElementById('select-matiere').value;
        for (let i = 0; i < matieres.length; i++) {
            if (matieres[i].matiere === matiereSelectionnee) {
                id_matiere = matieres[i].id;
                break;
            }
        }

        // Vérification des champs vides
        if(id_matiere === undefined){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ matière';
            return;
        }else if(type === ''){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ type';
            return;
        }else if(groupesSelected.length === 0){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ groupe';
            return;
        }else if(sallesSelected.length === 0){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ salle';
            return;
        }else if(intervenantsSelected.length === 0){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ intervenant';
            return;
        }else if(date === ''){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ date';
            return;
        }else if(heure_debut === ''){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ heure de début';
            return;
        }else if(heure_fin === ''){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ heure de fin';
            return;
        }else{
            document.getElementById('msg-session').innerHTML = '';
        }

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
        }).then(() => {
            {props.edit // Si on est en mode édition de session, on affiche un message différent de celui de création de session
                ? <div>
                    {alert('La session a été modifiée')}
                    {props.setEdit(false) /* On remet le mode édition à false */ } 
                </div>
                : alert('La session a été créée')
            }
            clearInputs(); // On vide les champs
        })
        .catch(error => {
            console.error('Error:', error);
            {props.edit 
                ? <div>
                    {alert('Erreur : La session n\'a pas été modifiée')}
                    {props.setEdit(false)}
                </div>
                : alert('Erreur : La session n\'a pas été créée')
            }
        });
    }

    function handleChangeGroupe(e) {
        setGroupesSelected(e);  // Tableau avec format react-select
        let ids = [];
        e.map((item) => {   // Passer du format de react-select à notre format
            const groupe = groupes.find(g => g.groupe === item.value);
            if(groupe.id) {
                ids.push(groupe.id);
            }
        })
        setIdGroupes(ids);
    }

    function handleChangeSalle(e) {
        setSallesSelected(e);
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
        setIntervenantsSelected(e);
        let ids = [];
        e.map((item) => {   // Mettre les majuscules comme il faut (LE NOM Prénom De Truc)
            const nomComplet = item.value;
            const regex = /^([A-Z\s]+)\s(.*)$/;
            const resultats = nomComplet.match(regex);
            if (resultats) {
                const nom = resultats[1];
                const intervenant = intervenants.find(i => i.nom.toUpperCase() === nom);
                if(intervenant.id) {
                    ids.push(intervenant.id);
                }
            }
        })
        setIdIntervenants(ids);
    }

    function clearInputs() {
        // Clear les inputs
        document.getElementById('input-date').value = '';
        document.getElementById('input-heure-debut').value = '';
        document.getElementById('input-heure-fin').value = '';
        document.getElementById('select-matiere').value = '';
        document.getElementById('select-type').value = '';
        setGroupesSelected('');
        setSallesSelected('');
        setIntervenantsSelected('');
    }
    
    function fillInputs(session){ // Remplir les inputs avec les données de la session à modifier (si on est en mode édition)
        // Remplir les inputs avec les données de la session à modifier
        document.getElementById('input-date').value = session.date;
        document.getElementById('input-heure-debut').value = session.heureDebut;
        document.getElementById('input-heure-fin').value = session.heureFin;
        document.getElementById('select-matiere').value = session.matiere;
        document.getElementById('select-type').value = session.type;

        // Remplir les select avec les données de la session à modifier
        // Une fois les select remplis, on appelle les fonctions handleChange pour mettre à jour les ids des groupes, salles et intervenants sélectionnés
        const newGroupes = session.groupes.map(item => ({ value: item, label: item }));
        setGroupesSelected(newGroupes);
        handleChangeGroupe(newGroupes);

        const newSalles = session.salles.map(item => ({ value: item, label: item }));
        setSallesSelected(newSalles);
        handleChangeSalle(newSalles);

        const newIntervenants = session.intervenants.map(item => ({ value: item, label: item }));
        setIntervenantsSelected(newIntervenants);
        handleChangeIntervenant(newIntervenants);
    }

    function handleEditSession(id){
        // On récupère les données de la session à modifier
        let date = document.getElementById('input-date').value;
        let heure_debut = document.getElementById('input-heure-debut').value;
        let heure_fin = document.getElementById('input-heure-fin').value;
        let type = document.getElementById('select-type').value;
        let id_matiere;
        let matiereSelectionnee = document.getElementById('select-matiere').value;
        for (let i = 0; i < matieres.length; i++) {
            if (matieres[i].matiere === matiereSelectionnee) {
                id_matiere = matieres[i].id;
                break;
            }
        }

        // Vérification des champs vides
        if(id_matiere === undefined){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ matière';
            return;
        }else if(type === ''){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ type';
            return;
        }else if(groupesSelected.length === 0){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ groupe';
            return;
        }else if(sallesSelected.length === 0){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ salle';
            return;
        }else if(intervenantsSelected.length === 0){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ intervenant';
            return;
        }else if(date === ''){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ date';
            return;
        }else if(heure_debut === ''){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ heure de début';
            return;
        }else if(heure_fin === ''){
            document.getElementById('msg-session').innerHTML = 'Veuillez remplir le champ heure de fin';
            return;
        }else{
            document.getElementById('msg-session').innerHTML = '';
        }

        // On envoie les nouvelles données au serveur
        const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/session/miseajour';
        fetch(url, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                id: id,
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
        }).then(() => {
            {props.edit // Si on est en mode édition, on affiche un message de confirmation différent de celui de création
                ? <div>
                    {alert('La session a été modifiée')}
                    {props.setEdit(false)} {/* Lorsque la modification est terminée, on remet le mode édition à false pour revenir à la liste des sessions */}
                </div>
                : alert('La session a été créée')
            }
            clearInputs(); // On vide les inputs
        })
        .catch(error => {
            console.error('Error:', error);
            {props.edit 
                ? <div>
                    {alert('Erreur : La session n\'a pas été modifiée')}
                    {props.setEdit(false)}
                </div>
                : alert('Erreur : La session n\'a pas été créée')
            }
        });
    }

    return (
        <div>
            <div>
                <div className='creationSession'>
                    <div className='inputGroupe'>
                        <div className="matiere">
                            <label htmlFor='matiere'>Matière</label>
                            <select id='select-matiere' defaultValue={''}>
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
                            <select id='select-type' defaultValue={''} >
                            <option value='' disabled>Choisir un type</option>
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
                            value={sallesSelected}
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
                            value={groupesSelected}
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
                            value={intervenantsSelected}
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
                    
                    <div className="validation-session">
                        <div id="msg-session" className="msg-session"></div>

                        {props.edit
                        ? <div>
                            <button className='button-rectangle' type="button" onClick={() => handleEditSession(props.session.id)}>Modifier</button>
                            <button className='button-rectangle' type="button" onClick={() => props.setEdit(false)}>Annuler</button>
                        </div>
                        : <button className='button-rectangle' type="button" onClick={handleCreateSession}>Créer</button>
                        }
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default CreationSession;