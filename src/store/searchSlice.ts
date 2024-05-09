// searchSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMovie } from '../utils/interfaces/movies.interface';
import { IShow } from '../utils/interfaces/shows.interface';

interface SearchState {
	results: (IMovie | IShow)[];
	term: string;
}

const initialState: SearchState = {
	results: [],
	term: '',
};

const searchSlice = createSlice({
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

export const { setSearchResults, setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
