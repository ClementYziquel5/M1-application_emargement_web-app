import React, { useState, useEffect } from 'react';
import './VisualisationSession.css';

function VisualisationSession(props) {

    // Get Students by group by session
    const [etudiants, setEtudiants] = useState([{groupe: "", etudiants: []}]);

    useEffect(() => {
        getetudiants();
    }, []);

    function getetudiants() {
        const newEtudiants = [];
        props.session["groupes"].map((groupe) => {
            const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/session/' + props.idSession + '/groupe/' + groupe + '/etudiants';
            fetch(url)
            .then(response => response.json())
            .then(data => {
                newEtudiants.push({ groupe: groupe, etudiants: data });
                if (newEtudiants.length === props.session["groupes"].length) {
                    setEtudiants(newEtudiants);
                }
            }) 
            .catch(error => console.log(error));
        })
    }
    

    return (
        <div className="visualisation-session">
            <div className="retour">
                <button onClick={() => props.setVisu(false)}>Retour</button>
            </div>
            <div className="liste">
                <div className="infos-liste" key={props.session.id}>
                    <div className="cours-listeSession">
                        <div className="matiere">
                            {props.session.matiere}
                        </div>
                        <div className="type">
                            {props.session.type}
                        </div>
                    </div>
                    <div className="groupes-listeSession">
                        {props.session["groupes"].map((groupe) => 
                            <div className="groupe">
                                {groupe}
                            </div>
                        )}
                    </div>
                    <div className="intervenants-listeSession">
                        {props.session["intervenants"].map((intervenant) =>
                            <div className="intervenant">
                                {intervenant}
                            </div>
                        )}
                    </div>
                    <div className="salles-listeSession">
                        {props.session["salles"].map((salle) =>
                            <div className="salle">
                                {salle}
                            </div>
                        )}
                    </div>
                    <div className="date-listeSession">
                        <div className="la-date">
                            {props.session.date}
                        </div>
                    </div>
                    <div className="heure-listeSession">
                        <div className="heure-debut">
                            {props.session.heureDebut}
                        </div>
                        <div className="heure-fin">
                            {props.session.heureFin}
                        </div>
                    </div>
                </div>
            </div>
            <div className="infos-groupes">
                {console.log(etudiants)}
                {etudiants.map((item,index) =>
                    <div className="nom-groupe" key={index}>
                        {item.groupe}
                        {item.etudiants.map((etudiant) =>
                            <div>
                                <div className="nom-etudiant">
                                    {etudiant.nom.toUpperCase() + " " + etudiant.prenom}
                                </div>
                                <div className='presence'>
                                    {etudiant.presence ? "Présent" : "Absent"}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>            
        </div>
    );
}

export default VisualisationSession;