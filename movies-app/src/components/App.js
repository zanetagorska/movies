import React, { Fragment } from 'react';
import { Route } from 'react-router';
import Login from '../views/login/Login';
import Movie from '../views/movie/Movie';
import Movies from '../views/movies/Movies';

const App = () => {
	return (
		<Fragment>
			<Route path="/" exact component={Movies} />
			<Route path="/login" component={Login} />
			<Route path="/movie/:imdbId" component={Movie} />
		</Fragment>
	);
};

export default App;
