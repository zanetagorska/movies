import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createLoadingSelector } from '../../redux/loading/selector';
import Loader from '../../components/_common/Loader';

const Actor = ({ actor, isFetching }) => {
	return (
		<section>
			{isFetching ? (
				<Loader />
			) : (
				<Fragment>
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
				</Fragment>
			)}
		</section>
	);
};

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

const loadingSelector = createLoadingSelector([ 'FETCH_ACTOR' ]);

const mapStateToProps = (state) => ({
	actor: state.actors.actor,
	isFetching: loadingSelector(state)
});

export default connect(mapStateToProps)(Actor);
