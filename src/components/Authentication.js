import { withAuthenticator } from 'aws-amplify-react';
import React from 'react';
// import { Button } from "react-bootstrap";
// import Client from "./Client";
// import NavBar from './NavBar';
// import { max_number } from "../helper";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";


import '../App.css';
import NewClient from '../components/NewClient';
import ViewClient from '../components/ViewClient';
import AllClients from '../components/AllClients';

const Home = () => (
    <div className="ui container">
      <AllClients />
    </div>
  );

const App = () => (
    <Router>
      <div>
        <Route exact={true} path="/" component={Home} />
        <Route path="/client/:id" component={ViewClient} />
        <Route path="/newClient" component={NewClient} />
      </div>
    </Router>
  );

export default withAuthenticator(App)