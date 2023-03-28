import React, { useState, useEffect } from 'react';
import './VisualisationSession.css';

/*
 * Composant VisualisationSession : permet d'afficher les informations d'une session
 *
 * props :
 * - session : session à afficher
 * - idSession : id de la session à afficher
 * - setVisu : permet de modifier l'état de visualisation
 * - groupes : liste des groupes existants
 */
function VisualisationSession(props) {
    // Get Students by group by session
    const [etudiants, setEtudiants] = useState([{groupe: "", etudiants: []}]);
    const [isEtudiantsLoaded, setIsEtudiantsLoaded] = useState(false);

    useEffect(() => { // Au chargement du composant on récupère les étudiants de la session
        getetudiants();
    }, []);

    function getetudiants() {
        const newEtudiants = [];
        let idGroupe = 0;
        props.session["groupes"].map((groupe) => { // Pour chaque groupe de la session, on récupère les étudiants de ce groupe
            // récupérer id du groupe en fonction du nom du groupe
            props.groupes.map((groupe2) => {
                if (groupe2.groupe === groupe) {
                    idGroupe = groupe2.id;
                }
            })
            const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/session/' + props.idSession + '/groupe/' + idGroupe + '/etudiants';
            fetch(url)
            .then(response => response.json())
            .then(data => {
                newEtudiants.push({ groupe: groupe, etudiants: data });
                if (newEtudiants.length === props.session["groupes"].length) {
                    setEtudiants(newEtudiants);
                    setIsEtudiantsLoaded(true);
                }
            }) 
            .catch(error => console.log(error));
        })
    }
    

    function getetudiants() {
        // Créer une fonction pour effectuer la requête pour un groupe
        const fetchEtudiants = (groupe) => {
            let idGroupe = 0;
            props.groupes.map((groupe2) => {
                if (groupe2.groupe === groupe) {
                    idGroupe = groupe2.id;
                }
            })
            const url =
                process.env.REACT_APP_API_ENDPOINT +
                "/v1.0/session/" +
                props.idSession +
                "/groupe/" +
                idGroupe +
                "/etudiants";
            return fetch(url)
                .then((response) => response.json())
                .then((data) => {
                return { groupe: groupe, etudiants: data };
                });
        };
      
        // Créer un tableau de promesses pour toutes les requêtes
        const etudiantsPromises = props.session["groupes"].map(fetchEtudiants);
      
        // Attendre que toutes les promesses soient résolues
        Promise.all(etudiantsPromises)
            .then((newEtudiants) => {
                setEtudiants(newEtudiants);
                setIsEtudiantsLoaded(true);
            })
            .catch((error) => console.log(error));
    }
    

    return isEtudiantsLoaded && ( // On affiche les informations de la session dès qu'elle est chargée
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
                            <div className="groupe-visuSession" key={groupe}>
                                {groupe}
                            </div>
                        )}
                    </div>
                    <div className="intervenants-visuSession">
                        {props.session["intervenants"].map((intervenant) =>
                            <div className="intervenant-visuSession" key={intervenant}>
                                {intervenant}
                            </div>
                        )}
                    </div>
                    <div className="salles-visuSession">
                        {props.session["salles"].map((salle) =>
                            <div className="salle-visuSession" key={salle}>
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