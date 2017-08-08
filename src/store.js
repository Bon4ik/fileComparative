import { applyMiddleware, createStore, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import reducers from './reducers';
import rootEpic from './epics/comparative';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware(rootEpic);

export default createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(
            epicMiddleware
        )
    ),
)