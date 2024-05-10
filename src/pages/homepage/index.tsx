//Libs
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//Components
import Header from '../../components/Header';
import Search from '../../components/Search';
//Api
import { getTopMovies, getSearchMovies } from '../../api/movies';
import { getTopShows, getSearchShows } from '../../api/tvshows';
//State
import { useAppDispatch, useAppSelector } from '../../store';
import {
	setSelectedType,
	setTopMovies,
	setTopTVShows,
} from '../../store/features/tvShowsAndMoviesSlice';
import { setSearchResults } from '../../store/features/searchSlice';
//Enums
import { ItemTypes } from '../../utils/enums/homepage.enum';
//Style
import './homepage.css';
import ItemCard from '../../components/ItemCard';

const HomePage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const displayData = useAppSelector(
		(state) => state.tvShowsAndMovies.selectedType
	);
	const topMovies = useAppSelector((state) => state.tvShowsAndMovies.topMovies);
	const topShows = useAppSelector((state) => state.tvShowsAndMovies.topTVShows);
	const searchTerm = useAppSelector((state) => state.search.term);
	const searchResults = useAppSelector((state) => state.search.results);

	useEffect(() => {
		const getData = async () => {
			const movieData = await getTopMovies();
			const showData = await getTopShows();
			dispatch(setTopMovies(movieData));
			dispatch(setTopTVShows(showData));
		};

		const getSearchItems = async () => {
			if (searchTerm && searchTerm.length > 2) {
				if (displayData === ItemTypes.Movies) {
					const searchMovies = await getSearchMovies(searchTerm);
					dispatch(setSearchResults(searchMovies));
				} else {
					const searchShows = await getSearchShows(searchTerm);
					dispatch(setSearchResults(searchShows));
				}
			}
		};

		if (
			searchTerm.length < 3 &&
			topMovies.length === 0 &&
			topShows.length === 0
		) {
			getData();
		} else {
			getSearchItems();
		}
		navigate(`/homepage/?s=${searchTerm}&d=${displayData}`);
	}, [displayData, searchTerm]);

	const updateDisplayData = (name: string) => {
		if (name === ItemTypes.TV) dispatch(setSelectedType(ItemTypes.TV));
		else dispatch(setSelectedType(ItemTypes.Movies));
	};

	const categoryButton = (name: string) => {
		const show = name === 'TV Shows' ? ItemTypes.TV : ItemTypes.Movies;
		return (
			<div>
				<button
					className={
						show === displayData ? 'categoryButtonSelected' : 'categoryButton'
					}
					onClick={() => updateDisplayData(show)}>
					{name}
				</button>
			</div>
		);
	};

	const displayContent = () => {
		const itemsToDisplay =
			displayData === ItemTypes.Movies ? topMovies : topShows;
		const items = searchTerm.length < 3 ? itemsToDisplay : searchResults;
		return items.map((item) => <ItemCard item={item} key={item.id} />);
	};

	return (
		<>
			<Header />
			<Search />
			<div className="center margin-top">
				{categoryButton('TV Shows')}
				{categoryButton('Movies')}
			</div>
			<div className="center">
				<div className="container margin-top">{displayContent()}</div>
			</div>
		</>
	);
};

export default HomePage;
