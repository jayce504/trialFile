import React from 'react';
// import { Button } from "react-bootstrap";
// import Client from "./Client";
// import NavBar from './NavBar';
// import { max_number } from "../helper";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";

import appSyncConfig from "../aws-exports";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient, { defaultDataIdFromObject } from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";

import '../App.css';
import NewClient from '../components/NewClient';
import AllClients from '../components/AllClients';
import ViewClient from '../components/ViewClient';

import Authentication from '../components/Authentication';

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

const client = new AWSAppSyncClient({
    url: appSyncConfig.aws_appsync_graphqlEndpoint,
    region: appSyncConfig.aws_appsync_region,
    auth: {
      type: appSyncConfig.aws_appsync_authenticationType,
      apiKey: appSyncConfig.aws_appsync_apiKey,
    },
    cacheOptions: {
      dataIdFromObject: (obj) => {
        let id = defaultDataIdFromObject(obj);
  
        if (!id) {
          const { __typename: typename } = obj;
          switch (typename) {
            case 'Comment':
              return `${typename}:${obj.commentId}`;
            default:
              return id;
          }
        }
  
        return id;
      }
    }
  });

const WithProvider = () => (
    <ApolloProvider client={client}>
    <Authentication>
      <Rehydrated>
        <App />
      </Rehydrated>
      </Authentication>
    </ApolloProvider>
  );

  export default WithProvider;