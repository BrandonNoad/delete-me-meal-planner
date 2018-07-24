import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import '../node_modules/grommet/grommet.min.css';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

registerServiceWorker();
