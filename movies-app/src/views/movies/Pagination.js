import React from 'react';

const Pagination = (props) => {
	let pagesCount = props.limit ? Math.ceil(11 / props.limit) : 0;

	const pages = Array.from({ length: pagesCount }, (value, key) => (
		<li key={key}>
			<button
				onClick={() => props.onPageClick(key + 1)}
				className={`${props.page === key + 1 ? 'pagination-link is-current' : 'pagination-link'}`}
			>
				{key + 1}
			</button>
		</li>
	));

	return (
		<nav className="pagination">
			<ul className="pagination-list">{pages}</ul>
		</nav>
	);
};

export default Pagination;
