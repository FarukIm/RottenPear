//libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//interfaces
import { IMovie } from '../../utils/interfaces/movies.interface';
import { IShow } from '../../utils/interfaces/shows.interface';

interface SearchState {
	results: (IMovie | IShow)[];
	term: string;
}

const initialState: SearchState = {
	results: [],
	term: '',
};

export const SearchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchResults(state, action: PayloadAction<(IMovie | IShow)[]>) {
			state.results = action.payload;
		},
		setSearchTerm(state, action: PayloadAction<string>) {
			state.term = action.payload;
		},
	},
});

export default SearchSlice.reducer;

export const { setSearchResults, setSearchTerm } = SearchSlice.actions;
