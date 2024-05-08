//Libs
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
//Components
import Header from '../../components/Header';
import Search from '../../components/Search';
//Api
import { getTopMovies, getSearchMovies } from '../../api/movies';
import { getTopShows, getSearchShows } from '../../api/tvshows';
//Interfaces
import { IMovie } from '../../utils/interfaces/movies.interface';
import { IShow } from '../../utils/interfaces/shows.interface';
//Enums
import { ItemTypes } from '../../utils/enums/homepage.enum';
//Style
import './homepage.css';
import ItemCard from '../../components/ItemCard';

const HomePage = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const searchParam = searchParams.get('s');
	const [displayData, setDisplayData] = useState<ItemTypes | string | null>(
		searchParams.get('d') != null ? searchParams.get('d') : ItemTypes.TV
	);
	const [searchValue, setSearchValue] = useState<string>(
		searchParam ? searchParam : ''
	);
	const [searchOutput, setSearchOutput] = useState([]);
	const [topMovies, setTopMovies] = useState<IMovie[]>([]);
	const [topShows, setTopShows] = useState<IShow[]>([]);
	let typingTimer: NodeJS.Timeout;

	const getData = async () => {
		const movieData = await getTopMovies();
		const showData = await getTopShows();
		console.log({ movieData });
		setTopMovies(movieData);
		setTopShows(showData);
	};

	const getSearchItems = async () => {
		if (searchValue && searchValue.length > 2) {
			if (displayData === ItemTypes.Movies) {
				const searchMovies = await getSearchMovies(searchValue);
				setSearchOutput(searchMovies);
			} else {
				const searchShows = await getSearchShows(searchValue);
				setSearchOutput(searchShows.results);
			}
		}
	};

	useEffect(() => {
		console.log(searchParam);
		if (searchValue.length < 3) {
			getData();
		} else {
			getSearchItems();
		}
		navigate(`/homepage/?s=${searchValue}&d=${displayData}`);
	}, [displayData, searchValue]);

	const updateDisplayData = (name: string) => {
		if (name === ItemTypes.TV) setDisplayData(ItemTypes.TV);
		else setDisplayData(ItemTypes.Movies);
	};

	const searchBar = () => {
		return (
			<div className="center margin-top">
				<input
					className="searchBar"
					type="search"
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}
					onKeyUp={() => {
						clearTimeout(typingTimer);
						typingTimer = setTimeout(() => {
							getSearchItems();
						}, 1000);
					}}
					placeholder="Search..."
				/>
			</div>
		);
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
		if (displayData === ItemTypes.Movies) {
			if (searchValue.length < 3) {
				return topMovies.map((item: IMovie) => (
					<ItemCard item={item} key={item.id} />
				));
			} else {
				return searchOutput.map((item: IMovie) => (
					<ItemCard item={item} key={item.id} />
				));
			}
		} else {
			if (searchValue.length < 3) {
				return topShows.map((item: IShow) => (
					<ItemCard item={item} key={item.id} />
				));
			} else {
				return searchOutput.map((item: IShow) => (
					<ItemCard item={item} key={item.id} />
				));
			}
		}
	};

	return (
		<>
			<Header />
			<Search searchValue={searchValue} setSearchValue={setSearchValue} />
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
