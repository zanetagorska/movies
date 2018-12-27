import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './redux/rootReducer';
import Movies from './views/movies/Movies';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/rootSaga';
import 'normalize.css';
import { Router, Route } from 'react-router';
import Login from './views/login/Login';
import { history } from './utils/history';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

const token = sessionStorage.getItem('token');

render(
	<Provider store={store}>
		<Router history={history}>
			<Fragment>
				<Route path="/" exact render={() => (token ? <Movies /> : <Login />)} />
				<Route path="/movie/:id" />
			</Fragment>
		</Router>
	</Provider>,
	document.getElementById('root')
);
