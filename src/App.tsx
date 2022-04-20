import React from 'react';
import { useSelector } from 'react-redux';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';
import CreatePlaylist from './pages/CreatePlaylist';
import Login from './pages/Login';
import { RootState } from './redux/store';

function App() {
  const isAuthorized: boolean = useSelector(
    (state: RootState) => state.auth.isAuthorized
  );

  return (
    <Router>
      <Switch>
        <Route path="/create-playlist" exact>
          {isAuthorized ? <CreatePlaylist /> : <Redirect to="/" />}
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;