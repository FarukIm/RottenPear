// detailsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IMovie } from '../utils/interfaces/movies.interface';
import { IShow } from '../utils/interfaces/shows.interface';

interface DetailsState {
	item: IMovie | IShow | null;
}

const initialState: DetailsState = {
	item: null,
};

const detailsSlice = createSlice({
	name: 'details',
	initialState,
	reducers: {
		setSelectedItem(state, action: PayloadAction<IMovie | IShow | null>) {
			state.item = action.payload;
		},
	},
});

export const { setSelectedItem } = detailsSlice.actions;

export default detailsSlice.reducer;
