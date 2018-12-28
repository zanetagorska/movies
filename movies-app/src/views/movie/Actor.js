import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Actor = ({ actor }) => (
	<section>
		<h2>{actor.name}</h2>
		<p>
			<span>Birthday: {actor.birthday}</span>
			<br />
			<span>Country: {actor.birthday}</span>
			<br />
		</p>
		<img src={actor.photoUrl} alt="Actor" />
		<a href={`https://www.imdb.com/name/${actor.imdbId}/`} target="_blank" rel="noopener noreferrer">
			Przejdź do serwisu IMDB
		</a>
	</section>
);

const mapStateToProps = (state) => ({
	actor: state.actors.actor
});

Actor.propTypes = {
	actor: PropTypes.shape({
		_id: PropTypes.string,
		imdbId: PropTypes.string,
		name: PropTypes.string,
		birthday: PropTypes.string,
		country: PropTypes.string,
		gender: PropTypes.string,
		photoUrl: PropTypes.string
	})
};

export default connect(mapStateToProps)(Actor);
