import './CreationSession.css'

function CreationSession(props){
    return (
        <div>
            <form>
                <div className='creationSession'>
                    <div className='inputGroupe'>
                        <div className="matiere">
                            <label htmlFor='matiere'>Matière</label>
                            <input required name='matiere' id='input_matiere' type='text'></input>
                        </div>

                        <div className="type">
                            <label htmlFor='type'>Type</label>
                            <input required name='type' id='input_type' type='text'></input>
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