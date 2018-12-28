import React, { Component } from 'react';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';

const tableHeaders = [
	{ name: 'Number' },
	{ name: 'Title', sortBy: 'title' },
	{ name: 'Year', sortBy: 'year' },
	{ name: 'Metascore', sortBy: 'metascore' }
];
const StyledTable = Styled.table`
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

class Table extends Component {
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
				this.props.onHeaderClick(header);
			}}
			key={header.name}
		>
			{header.name}
			{this.props.activeFilter === header.sortBy && (
				<span>
					<button onClick={() => this.props.onSortButtonClick(-1)}>/\</button>
					<button onClick={() => this.props.onSortButtonClick(1)}>\/</button>
				</span>
			)}
		</th>
	);

	renderBody() {
		const body = this.props.collection.map((movie, key) => (
			<Tr key={key}>
				<Td>{key + 1}</Td>
				<Td>
					<Link to={`/movie/${movie.imdbId}`}>{movie.title}</Link>
				</Td>
				<Td>{movie.year}</Td>
				<Td>{movie.metascore}</Td>
			</Tr>
		));
		return <tbody>{body}</tbody>;
	}

	render() {
		return (
			<StyledTable>
				{this.renderHeaders()}
				{this.renderBody()}
			</StyledTable>
		);
	}
}

export default Table;
