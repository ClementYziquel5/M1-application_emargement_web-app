import React, { useEffect,useState, useContext} from 'react';
import { Box, Text, Button, Heading } from 'rebass';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate, Outlet} from 'react-router-dom';
import Header from './components/Header/Header.js';
import Filtres from './components/Filtres/Filtres.js';
import Listes from './components/Listes/Listes.js';
import CreationSession from './components/CreationSession/CreationSession.js';
import CreationGroupe from './components/CreationGroupe/CreationGroupe.js';
import Connexion from './components/Connexion/Connexion.js';
import { CasUserContextProvider, useCasUserContext, CasUserContext } from './context/casUserContext';
import useCas from './hooks/useCas.js';

function App() {
  return (
      <Router>
          <Routes>
            <Route path='/' element={<Connexion_layout/>} />
            <Route exact path="/sessions" element={<Sessions />} />
            <Route exact path="/groupes" element={<Groupes />} />
            <Route exact path="/creation" element={<Creation />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      </Router>
  );
}

function Layout(props){
  const navigate = useNavigate();
  const [securityChecked, setSecurityChecked] = useState(false);
  const casUserContext = useContext(CasUserContext);

  useEffect(() => {
    if (props.isSecure && !casUserContext.user) {
      navigate('/');
    }else{
      setSecurityChecked(true);
    }
  }, [props.isSecure,casUserContext.user]);

  return (
    <Box align="center" background={props.background} fill>
      <Box justify="center" align="center">
        {props.children}
      </Box>
    </Box>  );
}

function Connexion_layout(){
  const navigate = useNavigate();
  const cas = useCas(true);
  const casUserContext = useContext(CasUserContext);

  useEffect(() => {
    if (casUserContext.user) {
      navigate('/sessions');
    }
  }, [casUserContext.user]);

  return (
    <Layout background="status-unknown" isSecure={false}>
      {cas.isLoading && (
        <Box align="center" gap="medium">
          <Text>Redirecting ...</Text>
        </Box>
      )}
      {!cas.isLoading && (
        <Box align="center" gap="xsmall">
          <Connexion/>
          <Button
            label="Login"
            a11yTitle="Login button"
            margin="medium"
            reverse
            onClick={() => {
              cas.attemptCasLogin(false);
            }}
          />
        </Box>
      )}
    </Layout>
  );
}

function Sessions(){
  const cas = useCas();
  const casUserContext = useContext(CasUserContext);

  return (
    <Layout background="status-ok" isSecure={true}>
      <Header logout={cas.logout}/>
      <Filtres />
      <Listes />
      <Button
        label="Logout"
        a11yTitle="Logout button"
        reverse
        onClick={() => {
          cas.logout();
        }}
      />
    </Layout>
  );
}

function Groupes(){
  const cas = useCas();
  const casUserContext = useContext(CasUserContext);

  return (
    <Layout background="status-ok" isSecure={true}>
      <Header logout={cas.logout}/>
      <Filtres />
      <Button
        label="Logout"
        a11yTitle="Logout button"
        reverse
        onClick={() => {
          cas.logout();
        }}
      />
    </Layout>
  );
}

function Creation(){
  const cas = useCas();
  const casUserContext = useContext(CasUserContext);

  return (
    <Layout background="status-ok" isSecure={true}>
      <Header logout={cas.logout}/>
      <div className="creation">
        <CreationSession />
        <CreationGroupe />
      </div>
      <Button
        label="Logout"
        a11yTitle="Logout button"
        reverse
        onClick={() => {
          cas.logout();
        }}
      />
    </Layout>
  );
}

const NotFound = () => (
  <div style={{textAlign:'center'}}>
    <h1>404</h1>
    <p>Page not found</p>
  </div>
);


export default App;
