import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Filtres from './components/Filtres/Filtres.js';
import CreationSession from './components/CreationSession/CreationSession.js';
import CreationGroupe from './components/CreationGroupe/CreationGroupe.js';
import ListeSession from './components/ListeSession/ListeSession.js';
import ListeGroupe from './components/ListeGroupe/ListeGroupe.js';
import VisualisationSession from './components/VisualisationSession/VisualisationSession.js';


function App() {
  const [datas, setDatas] = useState('');
  const [wait, setWait] = useState(false);
  const [groupes, setGroupes] = useState({});

  function updateGroupe() {
    const url = process.env.REACT_APP_API_ENDPOINT + '/v1.0/groupes';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setGroupes(data);
        setDatas({
          ...datas,
          groupes: data
        });
      })
      .catch(error => console.error('Error:', error));
  }
  

  const getDatas = async () => {

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
      console.log(datas);
      setGroupes(datas.groupes);
      setDatas(datas);
      setWait(true);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getDatas();
  }, []);

  return wait && (
    <Router>
        <div>
            <Header/>
            <Routes>
                <Route exact path="/sessions" element={<Sessions datas={datas}/>} />
                <Route path="/groupes" element={<Groupes datas={datas}/>} />
                <Route path="/creation" element={<Creation setDatas={setDatas} datas={datas} updateGroupe={updateGroupe}/>} />
            </Routes>
        </div>
    </Router>
  );
}

function Sessions(props){
  const [edit, setEdit] = useState('');
  const [visu, setVisu] = useState('');
  const [idSession, setIdSession] = useState(0);
  const [session, setSession] = useState([]);
  const [sessions, setSessions] = useState(false);
  const [filtres , setFiltres] = useState({date: '0', groupe: '0', salle: '0', matiere: '0', type: '0', intervenant: '0'});

  return (
    <div>
      {visu 
      ? <VisualisationSession session={session} setVisu={setVisu} idSession={idSession}/>
      : edit 
        ? <div className='edit'><CreationSession datas={props.datas} session={session} setSession={setSession} setEdit={setEdit} edit={edit}/> </div>
        : <div> <Filtres filtres={filtres} setFiltres={setFiltres} datas={props.datas} setSessions={setSessions} edit={edit} visu={visu}/> <ListeSession setIdSession={setIdSession} sessions={sessions} setSession={setSession} setVisu={setVisu} setEdit={setEdit}/> </div>
      }

    </div>
  )
}


const Groupes = (props) => (
  <div>
    <ListeGroupe groupes={props.datas.groupes}/>
  </div>
);
const Creation = (props) => (
  <div className="creation">
    <CreationSession datas={props.datas}/>
    <CreationGroupe setDatas={props.setDatas} datas={props.datas} updateGroupe={props.updateGroupe}/>
  </div>
);

export default App;