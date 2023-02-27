import React, { useEffect,useState, useContext, Box, Text, Spinner, Button, Paragraph,Login,Logout} from 'react';
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
            {/* <Route path='/connexion' element={<Connexion/>} />  */}
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/groupes" element={<Groupes />} />
            <Route path="/creation" element={<Creation />} />
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
    <Connexion/>
  );
}

function Sessions(){
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
          <Spinner
            border={[
              {
                side: "all",
                color: "brand",
                size: "medium",
                style: "dotted",
              },
            ]}
          />
          <Text>Redirecting ...</Text>
        </Box>
      )}
      {!cas.isLoading && (
        <Box align="center" gap="xsmall">
          <Paragraph textAlign="center">
            Hello anonymous! Please click{" "}
            <Text color="brand" size="large">
              LOGIN
            </Text>{" "}
            with follows account.
          </Paragraph>
          <Box align="center" gap="xsmall" direction="column">
            <Text size="xsmall">Username / Password</Text>
            <Text size="large">
              <Text color="brand" size="large">
                casuser
              </Text>{" "}
              /{" "}
              <Text color="brand" size="large">
                Mellon
              </Text>
            </Text>
          </Box>
          <Button
            label="Login"
            icon={<Login />}
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

function SecureHome(){
  const cas = useCas();
  const casUserContext = useContext(CasUserContext);

  return (
    <Layout background="status-ok" isSecure={true}>
      <Box align="center" gap="medium">
        <Paragraph textAlign="center">
          welome{" "}
          <Text color="brand" size="xxlarge">
            {casUserContext.user}
          </Text>
        </Paragraph>
      </Box>
      <Button
        label="Logout"
        icon={<Logout />}
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

const Home = () => (
  <div>

  </div>
);

// const Sessions = () => (
//   <div>
//     <Filtres />
//     <Listes />
//   </div>
// );
const Groupes = () => (
  <div>
    <Filtres />
  </div>
);
const Creation = () => (
  <div className="creation">
    <CreationSession />
    <CreationGroupe />
  </div>
);

export default App;
