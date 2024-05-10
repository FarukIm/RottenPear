//Libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//Interfaces
import { IMovie } from '../../utils/interfaces/movies.interface';
import { IShow } from '../../utils/interfaces/shows.interface';
//Enums
import { ItemTypes } from '../../utils/enums/homepage.enum';

interface TVShowsAndMoviesState {
	topTVShows: IShow[];
	topMovies: IMovie[];
	selectedType: 'tv' | 'movie';
	selectedItemId: number | null;
}

const initialState: TVShowsAndMoviesState = {
	topTVShows: [],
	topMovies: [],
	selectedType: 'tv',
	selectedItemId: null,
};

export const TvShowsAndMoviesSlice = createSlice({
	name: 'tvShowsAndMovies',
	initialState,
	reducers: {
		setTopTVShows(state, action: PayloadAction<IShow[]>) {
			state.topTVShows = action.payload;
		},
		setTopMovies(state, action: PayloadAction<IMovie[]>) {
			state.topMovies = action.payload;
		},
		setSelectedType(state, action: PayloadAction<ItemTypes>) {
			state.selectedType = action.payload;
		},
		setSelectedItemId(state, action: PayloadAction<number | null>) {
			state.selectedItemId = action.payload;
		},
	},
});

export default TvShowsAndMoviesSlice.reducer;

export const {
	setTopMovies,
	setTopTVShows,
	setSelectedType,
	setSelectedItemId,
} = TvShowsAndMoviesSlice.actions;
