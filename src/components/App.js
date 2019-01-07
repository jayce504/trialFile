import React from 'react';
// import NavBar from './NavBar';
// import { max_number } from "../helper";
import 'bootstrap/dist/css/bootstrap.min.css';

import "semantic-ui-css/semantic.min.css";

import appSyncConfig from "../aws-exports";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient, { defaultDataIdFromObject } from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";

import '../App.css';

import Withauthenticator from '../components/Authentication';

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
      <Rehydrated>
        <Withauthenticator />
      </Rehydrated>
    </ApolloProvider>
  );

  export default WithProvider;