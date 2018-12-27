import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMovies } from '../../redux/movies/reducer';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';

const tableHeaders = [ 'Number', 'Title', 'Year', 'Metascore' ];
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
	componentDidMount() {
		this.props.fetchMovies({ test: 'test' });
	}

	renderHeaders() {
		const headers = tableHeaders.map((header, key) => <th key={key}>{header}</th>);
		return (
			<thead>
				<Tr>{headers}</Tr>
			</thead>
		);
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
