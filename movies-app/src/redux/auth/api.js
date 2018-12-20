import axios from 'axios';

export const loginUser = (user) => axios.post('http://marblejs-example.herokuapp.com/api/v1/auth/login/', user);
