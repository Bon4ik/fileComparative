import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import 'rxjs';

import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const renderNode = () => (
    <Provider store={store} >
        <App />
    </Provider>
);

ReactDOM.render(renderNode(), document.getElementById('root'));
registerServiceWorker();
