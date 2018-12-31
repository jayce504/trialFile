import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import App from './components/App';
import './index.css';

import config from './aws-exports'
import Amplify from 'aws-amplify'

Amplify.configure(config)


ReactDom.render(<App />, document.getElementById('root'));