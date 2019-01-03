import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actor from './Actor';
import { connect } from 'react-redux';
import { fetchMovie } from '../../redux/movies/reducer';
import { fetchActor } from '../../redux/actors/reducer';
import { withAuth } from '../../hoc/withAuth';
import Modal from '../../components/_common/Modal';

class Movie extends Component {
	state = {
		isModalOpen: false
	};

	componentDidMount() {
		this.props.fetchMovie(this.props.match.params.imdbId);
	}

	showActorDetails = (imdbId) => {
		this.setState({ isModalOpen: true });
		this.props.fetchActor(imdbId);
	};

	renderActors = () => {
		const actors = this.props.movie.actors.map((actor) => (
			<li onClick={() => this.showActorDetails(actor.imdbId)} key={actor.imdbId}>
				{actor.name}
			</li>
		));
		return <ul>{actors}</ul>;
	};

	render() {
		const { movie } = this.props;
		return (
			<section>
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
				{this.renderActors()}
				<a href={`https://www.imdb.com/title/${movie.imdbId}/`} target="_blank" rel="noopener noreferrer">
					Przejdź do serwisu IMDB
				</a>
				{this.state.isModalOpen && (
					<Modal handleClose={() => this.setState({ isModalOpen: false })}>
						<Actor actor={this.props.actor} />
					</Modal>
				)}
			</section>
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

export default withAuth(connect(mapStateToProps, { fetchMovie, fetchActor })(Movie));
