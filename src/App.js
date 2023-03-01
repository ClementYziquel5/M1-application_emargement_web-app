import React from 'react';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Filtres from './components/Filtres/Filtres.js';
import CreationSession from './components/CreationSession/CreationSession.js';
import CreationGroupe from './components/CreationGroupe/CreationGroupe.js';
import Liste_session from './components/Liste_session/Liste_session.js';
import Liste_groupe from './components/Liste_groupe/Liste_groupe.js';

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

const Sessions = () => (
  <div>
    <Filtres/>
    <Liste_session/>
  </div>
);
const Groupes = () => (
  <div>
    <Liste_groupe/>
  </div>
);
const Creation = () => (
  <div className="creation">
    <CreationSession/>
    <CreationGroupe/>
  </div>
);

export default App;