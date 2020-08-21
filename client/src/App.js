import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PrivateRoute from './components/PrivateRoute'
import styled from 'styled-components'

import Login from "./components/Login";
import BubblePage from './components/BubblePage'
import "./styles.scss";

const Details = styled.header`

background-color:black;
color:white;
min-height:10vh;
display:flex;
justify-content:space-around;
align-items:center;

a {
  text-decoration:none;
  color:ivory;
}
`

function App() {
  return (
    <Router>
      <Details>
        <h2>Bubble App</h2>
        <Link to='/login'>Login</Link>
        <Link to='/protected'>Bubble Page</Link>
      </Details>

      <Switch>
        <PrivateRoute exact path='/protected' component={BubblePage} />
        <Route exact path="/" component={Login} />
        <Route>
          <Login />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;

