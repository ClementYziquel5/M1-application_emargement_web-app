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
            <div className="liste-visuSession">
                <div className="infos-liste-visuSession" key={props.session.id}>
                    <div className="cours-visuSession">
                        <div className="matiere-visuSession">
                            {props.session.matiere}
                        </div>
                        <div className="type">
                            {props.session.type}
                        </div>
                    </div>
                    <div className="groupes-visuSession">
                        {props.session["groupes"].map((groupe) => 
                            <div className="groupe-visuSession">
                                {groupe}
                            </div>
                        )}
                    </div>
                    <div className="intervenants-visuSession">
                        {props.session["intervenants"].map((intervenant) =>
                            <div className="intervenant-visuSession">
                                {intervenant}
                            </div>
                        )}
                    </div>
                    <div className="salles-visuSession">
                        {props.session["salles"].map((salle) =>
                            <div className="salle-visuSession">
                                {salle}
                            </div>
                        )}
                    </div>
                    <div className="date-visuSession">
                        <div className="la-date-visuSession">
                            {props.session.date}
                        </div>
                    </div>
                    <div className="heure-visuSession">
                        <div className="heure-debut-visuSession">
                            {props.session.heureDebut}
                        </div>
                        <div className="heure-fin">
                            {props.session.heureFin}
                        </div>
                    </div>
                </div>
            </div>
            <div className="infos-groupes">
                {etudiants.map((item,index) =>
                    <div className="infos-presence" key={index}>
                        <div className='nom-groupe'>{item.groupe}</div>
                        {item.etudiants.map((etudiant) =>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='nom-etudiant'>
                                                {etudiant.nom.toUpperCase() + " " + etudiant.prenom}
                                            </td>
                                            <td className={etudiant.presence ? "present" : "absent"}>
                                                {etudiant.presence ? "Présent" : "Absent"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>            
        </div>
    );
}

export default VisualisationSession;