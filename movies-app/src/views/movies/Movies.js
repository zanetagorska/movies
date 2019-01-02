import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMovies } from '../../redux/movies/reducer';
import queryString from 'query-string';
import Table from './Table';
import Pagination from './Pagination';
import { withAuth } from '../../hoc/withAuth';

class Movies extends Component {
	state = {
		activeFilter: null
	};

	componentDidMount() {
		this.fetchMovies();
		const params = queryString.parse(window.location.search);
		if (params.sortBy) {
			this.setState({ activeFilter: params.sortBy });
		}
	}

	showActorDetails = (imdbId) => {
		this.setState({ isModalOpen: true });
		this.props.fetchActor(imdbId);
	};

	fetchMovies() {
		const params = queryString.parse(window.location.search);
		this.props.fetchMovies(params);
	}

	changeSearchParams(paramsToAdd) {
		const params = queryString.parse(window.location.search);

		for (let key in paramsToAdd) {
			params[key] = paramsToAdd[key];
		}

		const newPath = queryString.stringify(params);
		this.props.history.push(`/?${newPath}`);
		this.fetchMovies();
	}

	onHeaderClick = (header) => {
		this.setState({ activeFilter: header.sortBy });
		this.changeSearchParams({ sortBy: header.sortBy });
	};

	onSortButtonClick = (sortDir) => {
		this.changeSearchParams({ sortDir: sortDir });
	};

	onOptionClick = (value) => {
		this.changeSearchParams({ limit: value, page: 1 });
	};

	onPageClick = (number) => {
		this.changeSearchParams({ page: number });
	};

	render() {
		const params = queryString.parse(window.location.search);
		return (
			<Fragment>
				<h2>Movies</h2>
				<Table
					collection={this.props.collection}
					activeFilter={this.state.activeFilter}
					onHeaderClick={this.onHeaderClick}
					onSortButtonClick={this.onSortButtonClick}
				/>
				<label>Ilość wyników </label>
				<select onChange={({ target }) => this.onOptionClick(target.value)}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="5">5</option>
					<option value="10">10</option>
				</select>
				<Pagination limit={params.limit} page={Number(params.page)} onPageClick={this.onPageClick} />
			</Fragment>
		);
	}
}

Movies.propTypes = {
	collection: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			imdbId: PropTypes.string,
			title: PropTypes.string,
			director: PropTypes.string,
			year: PropTypes.number,
			metascore: PropTypes.number,
			actors: PropTypes.arrayOf(PropTypes.shape({ imdbId: PropTypes.string, name: PropTypes.string })),
			posterUrl: PropTypes.strin
		})
	)
};

const mapStateToProps = (state) => ({
	collection: state.movies.collection
});

export default withAuth(connect(mapStateToProps, { fetchMovies })(Movies));
