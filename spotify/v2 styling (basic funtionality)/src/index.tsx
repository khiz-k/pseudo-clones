import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

import './index.css';

window.oncontextmenu = () => false;

ReactDOM.render(<App />, document.getElementById('root'));
