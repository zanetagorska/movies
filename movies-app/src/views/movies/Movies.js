import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMovies } from '../../redux/movies/reducer';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { history } from '../../utils/history';

const tableHeaders = [
	{ name: 'Number' },
	{ name: 'Title', sortBy: 'title' },
	{ name: 'Year', sortBy: 'year' },
	{ name: 'Metascore', sortBy: 'metascore' }
];
const Table = Styled.table`
	border-collapse: collapse;
	width: 100%;
`;

const Td = Styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
const Tr = Styled.tr`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;

	&:nth-child(even) {
		background-color: #dddddd;
	}
`;

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

	fetchMovies() {
		const params = queryString.parse(window.location.search);
		this.props.fetchMovies(params);
	}
	//Todo block when user click anothertime

	renderHeaders() {
		const headers = tableHeaders.map((header) => {
			if (header.sortBy) {
				return this.renderFilterHeader(header);
			}
			return <th key={header.name}>{header.name}</th>;
		});
		return (
			<thead>
				<Tr>{headers}</Tr>
			</thead>
		);
	}

	renderFilterHeader = (header) => (
		<th
			onClick={() => {
				this.setState({ activeFilter: header.sortBy });
				this.changeSearchParams({ sortBy: header.sortBy });
				this.fetchMovies();
			}}
			key={header.name}
		>
			{header.name}
			{this.state.activeFilter === header.sortBy && (
				<span>
					<button
						onClick={() => {
							this.changeSearchParams({ sortDir: -1 });
							this.fetchMovies();
						}}
					>
						/\
					</button>
					<button
						onClick={() => {
							this.changeSearchParams({ sortDir: 1 });
							this.fetchMovies();
						}}
					>
						\/
					</button>
				</span>
			)}
		</th>
	);

	changeSearchParams(paramsToAdd) {
		const params = queryString.parse(window.location.search);

		for (let key in paramsToAdd) {
			params[key] = paramsToAdd[key];
		}

		const newPath = queryString.stringify(params);
		history.push(`/?${newPath}`);
	}

	renderBody() {
		const body = this.props.movies.map((movie, key) => (
			<Tr key={key}>
				<Td>{key}</Td>
				<Td>
					<Link to={`/movie/${movie._id}`}>{movie.title}</Link>
				</Td>
				<Td>{movie.year}</Td>
				<Td>{movie.metascore}</Td>
			</Tr>
		));
		return <tbody>{body}</tbody>;
	}

	render() {
		return (
			<Fragment>
				<h2>Movies</h2>
				<Table>
					{this.renderHeaders()}
					{this.renderBody()}
				</Table>
			</Fragment>
		);
	}
}

Movies.propTypes = {};

const mapStateToProps = (state) => ({
	movies: state.movies
});

export default connect(mapStateToProps, { fetchMovies })(Movies);
