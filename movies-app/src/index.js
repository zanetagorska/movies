import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './redux/rootReducer';
import App from './components/App';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/rootSaga';
import 'normalize.css';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
