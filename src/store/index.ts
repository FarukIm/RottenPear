//libs
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
//slices
import { TvShowsAndMoviesSlice } from './features/tvShowsAndMoviesSlice';
import { SearchSlice } from './features/searchSlice';

export const store = configureStore({
	reducer: {
		tvShowsAndMovies: TvShowsAndMoviesSlice.reducer,
		search: SearchSlice.reducer,
	},
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof store.getState>
> = useSelector;
