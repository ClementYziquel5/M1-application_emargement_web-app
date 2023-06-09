import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Filtres from './components/Filtres/Filtres.js';
import CreationSession from './components/CreationSession/CreationSession.js';
import CreationGroupe from './components/CreationGroupe/CreationGroupe.js';
import ListeSession from './components/ListeSession/ListeSession.js';
import ListeGroupe from './components/ListeGroupe/ListeGroupe.js';
import VisualisationSession from './components/VisualisationSession/VisualisationSession.js';

function App() {
  const [datas, setDatas] = useState(''); // datas = {groupes: [], salles: [], matieres: [], types: [], intervenants: []}
  const [wait, setWait] = useState(false); // wait = true quand les datas sont chargées

  function updateGroupe() { // fonction pour mettre à jour les groupes après création d'un nouveau groupe
    const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/groupes';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setDatas({
          ...datas,
          groupes: data
        });
      })
      .catch(error => console.error('Error:', error));
  }
  
  const getDatas = async () => { // fonction pour récupérer les datas fixes (groupes, salles, matières, types, intervenants)
    const urls = [  process.env.REACT_APP_API_ENDPOINT + '/v1.0/groupes',
                    process.env.REACT_APP_API_ENDPOINT + '/v1.0/salles',
                    process.env.REACT_APP_API_ENDPOINT + '/v1.0/matieres',
                    process.env.REACT_APP_API_ENDPOINT + '/v1.0/types',
                    process.env.REACT_APP_API_ENDPOINT + '/v1.0/intervenants'];
  
    try {
      const responses = await Promise.all(urls.map(url => fetch(url)));
      const data = await Promise.all(responses.map(response => response.json()));
      const [groupesData, sallesData, matieresData, typesData, intervenantsData] = data;

      let datas = {
        groupes: groupesData,
        salles: sallesData,
        matieres: matieresData,
        types: typesData,
        intervenants: intervenantsData,
      };
      setDatas(datas);
      setWait(true);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => { // au chargement de la page, on récupère les datas
    getDatas();
  }, []);

  return wait && ( // on attend que les datas soient chargées
    <Router>
        <div>
            <Header/> 
            <Routes>
                <Route exact path="/sessions" element={<Sessions datas={datas}/>} />
                <Route path="/groupes" element={<Groupes datas={datas} updateGroupe={updateGroupe}/>} />
                <Route path="/creation" element={<Creation datas={datas} updateGroupe={updateGroupe}/>} />
            </Routes>
        </div>
    </Router>
  );
}

function Sessions(props){ // composant pour afficher les sessions
  const [edit, setEdit] = useState(''); // edit = true quand on est en mode édition
  const [visu, setVisu] = useState(''); // visu = true quand on est en mode visualisation
  const [idSession, setIdSession] = useState(0); // idSession = id de la session à visualiser ou à éditer
  const [session, setSession] = useState([]); // session = données de la session à visualiser ou à éditer
  const [sessions, setSessions] = useState(false); // sessions = liste des sessions à afficher
  let date = new Date().toISOString().split('T')[0]; // date = date du jour 
  const [filtres , setFiltres] = useState({date: date, groupe: '0', salle: '0', matiere: '0', type: '0', intervenant: '0'}); // filtres = filtres appliqués à la liste des sessions


  /* 
   * Initialement, on affiche les filtres et la liste des sessions du jour
   * si on clique sur "Voir infos", on affiche la visualisation de la session (visu = true) => VisualisationSession
   * si on clique sur "Modifier", on affiche le formulaire d'édition de la session (edit = true) => CreationSession
   */
  return ( 
    <div>
      {visu 
      ? <VisualisationSession session={session} setVisu={setVisu} idSession={idSession} groupes={props.datas.groupes} />
      : edit 
        ? <div className='edit'><CreationSession datas={props.datas} session={session} setSession={setSession} setEdit={setEdit} edit={edit}/> </div>
        : <div> 
            <Filtres filtres={filtres} setFiltres={setFiltres} datas={props.datas} setSessions={setSessions} edit={edit} visu={visu}/> 
            <ListeSession setIdSession={setIdSession} sessions={sessions} setSession={setSession} setVisu={setVisu} setEdit={setEdit}/> 
          </div>
      }

    </div>
  )
}

/*
 * Composant pour afficher les groupes existants
 */
const Groupes = (props) => (
  <div>
    <ListeGroupe groupes={props.datas.groupes} updateGroupe={props.updateGroupe} />
  </div>
);

/*
 * Composants pour créer une session ou un groupe
 */
const Creation = (props) => (
  <div className="creation">
    <CreationSession datas={props.datas}/>
    <CreationGroupe updateGroupe={props.updateGroupe}/>
  </div>
);

export default App;
