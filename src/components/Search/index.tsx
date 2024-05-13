//Libs
import { useState } from 'react';
//State
import { useAppDispatch, useAppSelector } from '../../store';
import { setSearchTerm } from '../../store/features/searchSlice';
//Hooks
import useDebounce from '../../hooks/useDebounce';
//Style
import './search.css';

const Search = () => {
	const dispatch = useAppDispatch();
	const searchTerm = useAppSelector((state) => state.search.term);
	const [query, setQuery] = useState(searchTerm);

	dispatch(setSearchTerm(useDebounce(query, 1000)));

	return (
		<div className="center margin-top">
			<input
				className="searchBar"
				type="search"
				placeholder="Search..."
				onChange={(e) => setQuery(e.target.value)}
				value={query}
			/>
		</div>
	);
};

export default Search;
