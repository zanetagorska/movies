import axios from 'axios';

export const fetchMovies = (params) =>
	axios.get('http://marblejs-example.herokuapp.com/api/v1/movies/', {
		params,
		headers: { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` }
	});

export const fetchMovie = (imdbId) =>
	axios.get(`http://marblejs-example.herokuapp.com/api/v1/movies/${imdbId}/`, {
		headers: { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` }
	});
