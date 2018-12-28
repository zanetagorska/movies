import axios from 'axios';

export const fetchActor = (imdbId) =>
	axios.get(`http://marblejs-example.herokuapp.com/api/v1/actors/${imdbId}/`, {
		headers: { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` }
	});
