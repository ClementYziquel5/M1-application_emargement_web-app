import React from 'react';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Filtres from './components/Filtres/Filtres.js';
import Listes from './components/Listes/Listes.js';
import CreationSession from './components/CreationSession/CreationSession.js';
import CreationGroupe from './components/CreationGroupe/CreationGroupe.js';

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
    <Listes/>
  </div>
);
const Groupes = () => (
  <div>
    <Filtres/>
  </div>
);
const Creation = () => (
  <div class="creation">
    <CreationSession/>
    <CreationGroupe/>
  </div>
);

export default App;