import React, {useState} from 'react';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Filtres from './components/Filtres/Filtres.js';
import CreationSession from './components/CreationSession/CreationSession.js';
import CreationGroupe from './components/CreationGroupe/CreationGroupe.js';
import ListeSession from './components/ListeSession/ListeSession.js';
import ListeGroupe from './components/ListeGroupe/ListeGroupe.js';


const App = () => (
    <Router>
        <div>
            <Header/>
            <Routes>
                <Route exact path="/sessions" element={<Sessions/>} />
                <Route path="/groupes" element={<Groupes/>} />
                <Route path="/creation" element={<Creation/>} />
            </Routes>
        </div>
    </Router>
);

function Sessions(){
  const [edit, setEdit] = useState(false);
  const [idSession, setIdSession] = useState(0);
  return (
    <div>
      {edit 
      ? <CreationSession idSession={idSession} setEdit={setEdit} edit={edit}/> 
      : <div> <Filtres/> <ListeSession setIdSession={setIdSession} setEdit={setEdit}/> </div>
      }
    </div>
  )
}


const Groupes = () => (
  <div>
    <ListeGroupe/>
  </div>
);
const Creation = () => (
  <div className="creation">
    <CreationSession/>
    <CreationGroupe/>
  </div>
);

export default App;