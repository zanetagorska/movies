import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Actor from './Actor';
import { connect } from 'react-redux';
import { fetchMovie } from '../../redux/movies/reducer';
import { fetchActor } from '../../redux/actors/reducer';
import { withAuth } from '../../hoc/withAuth';
import Modal from '../../components/_common/Modal';
import { createLoadingSelector } from '../../redux/loading/selector';
import Loader from '../../components/_common/Loader';

const Movie = (props) => {
	const [ isModalOpen, setModal ] = useState(false);

	useEffect(() => {
		props.fetchMovie(props.match.params.imdbId);
	}, []);

	const showActorDetails = (imdbId) => {
		setModal(true);
		fetchActor(imdbId);
	};

	const renderActors = () => {
		const actors = props.movie.actors.map((actor) => (
			<li onClick={() => showActorDetails(actor.imdbId)} key={actor.imdbId}>
				{actor.name}
			</li>
		));
		return <ul>{actors}</ul>;
	};

	if (props.isFetching) {
		return <Loader />;
	}

	return (
		<section>
			<div>{props.movie.title}</div>
			<h2>{props.movie.title}</h2>
			<p>
				<span>Director: {props.movie.director}</span>
				<br />
				<span>Year: {props.movie.year}</span>
				<br />
				<span>Metascore: {props.movie.metascore}</span>
				<br />
			</p>
			<div>
				<img src={props.movie.posterUrl} alt="Movie poster" />
			</div>
			{renderActors()}
			<a href={`https://www.imdb.com/title/${props.movie.imdbId}/`} target="_blank" rel="noopener noreferrer">
				Przejdź do serwisu IMDB
			</a>
			{isModalOpen && (
				<Modal handleClose={() => setModal(false)}>
					<Actor actor={props.actor} />
				</Modal>
			)}
		</section>
	);
};

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

const loadingSelector = createLoadingSelector([ 'FETCH_MOVIE' ]);

const mapStateToProps = (state) => ({
	movie: state.movies.movie,
	isFetching: loadingSelector(state)
});

export default withAuth(connect(mapStateToProps, { fetchMovie, fetchActor })(Movie));
