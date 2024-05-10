//libs
import React from 'react';
//state
import { useAppDispatch, useAppSelector } from '../../store';
import { setSearchTerm } from '../../store/features/searchSlice';
//style
import './search.css';

const Search = () => {
	const dispatch = useAppDispatch();
	const searchTerm = useAppSelector((state) => state.search.term);

	return (
		<div className="center margin-top">
			<input
				className="searchBar"
				type="search"
				value={searchTerm}
				onChange={(e) => {
					dispatch(setSearchTerm(e.target.value));
				}}
				placeholder="Search..."
			/>
		</div>
	);
};

export default Search;
