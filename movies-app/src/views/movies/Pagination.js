import React from 'react';
import Styled from 'styled-components';

const Container = Styled.div`
	display: flex;
`;

const PageNumber = Styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background: #512DA8;
	color: #fff;
	border-radius: 50%;
	width: 1.5rem;
	height: 1.5rem;
	margin: .25rem;
	cursor: pointer;

	&.active {
		background: #7B1FA2;
	}
`;

const Pagination = (props) => {
	let pagesCount = props.limit ? Math.ceil(11 / props.limit) : 0;

	const pages = Array.from({ length: pagesCount }, (value, key) => (
		<PageNumber
			onClick={() => props.onPageClick(key + 1)}
			key={key}
			className={`${props.page === key + 1 ? 'active' : ''}`}
		>
			<div>{key + 1}</div>
		</PageNumber>
	));

	return <Container>{pages}</Container>;
};

export default Pagination;
