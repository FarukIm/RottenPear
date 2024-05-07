import React from 'react';

import { SearchProps } from '../../utils/interfaces/search.interface';

import './search.css';

const Search: React.FC<SearchProps> = ({ searchValue, setSearchValue }) => {
	return (
		<div className="center margin-top">
			<input
				className="searchBar"
				type="search"
				value={searchValue}
				onChange={(e) => {
					setSearchValue(e.target.value);
				}}
				placeholder="Search..."
			/>
		</div>
	);
};

export default Search;
