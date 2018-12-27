import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMovies } from '../../redux/movies/reducer';

class Movies extends Component {
	componentDidMount() {
		this.props.fetchMovies({ test: 'test' });
	}

	render() {
		return <div>MOVIES!</div>;
	}
}

Movies.propTypes = {};

const mapStateToProps = (state) => ({
	movies: state.movies
});

export default connect(mapStateToProps, { fetchMovies })(Movies);
