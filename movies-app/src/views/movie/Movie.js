import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMovie } from '../../redux/movies/reducer';

class Movie extends Component {
	componentDidMount() {
		this.props.fetchMovie(this.props.match.params.imdbId);
	}

	render() {
		const { movie } = this.props;
		return (
			<div>
				<h2>{movie.title}</h2>
				<p>
					<span>Director: {movie.director}</span>
					<br />
					<span>Year: {movie.year}</span>
					<br />
					<span>Metascore: {movie.metascore}</span>
					<br />
				</p>
				<div>
					<img src={movie.posterUrl} alt="Movie poster" />
				</div>
				<ul>{movie.actors.map((actor) => <li key={actor.imdbId}>{actor.name}</li>)}</ul>
				<a href={`https://www.imdb.com/title/${movie.imdbId}/`} target="_blank" rel="noopener noreferrer">
					Przejdź do serwisu IMDB
				</a>
			</div>
		);
	}
}

Movie.propTypes = {
	movie: PropTypes.shape({
		_id: PropTypes.string,
		imdbId: PropTypes.string,
		title: PropTypes.string,
		director: PropTypes.string,
		year: PropTypes.number,
		metascore: PropTypes.number,
		actors: PropTypes.arrayOf(PropTypes.shape({ imdbId: PropTypes.string, name: PropTypes.string })),
		posterUrl: PropTypes.string
	})
};
const mapStateToProps = (state) => ({
	movie: state.movies.movie
});

export default connect(mapStateToProps, { fetchMovie })(Movie);
