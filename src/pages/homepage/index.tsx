//Libs
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//Components
import Header from "../../components/header";
//Api
import { getTopMovies, getSearchMovies } from "../../api/movies";
import { getTopShows, getSearchShows } from "../../api/tvshows";
//Interfaces
import { IMovie } from "../../utils/interfaces/movies.interface";
import { IShow } from "../../utils/interfaces/shows.interface";
//Enums
import { DisplayTypes } from "../../utils/enums/homepage.enum";
//Style
import "./homepage.css";

const HomePage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [locationData, setLocationData] = useState(location.state);
	const [displayData, setDisplayData] = useState<DisplayTypes | null>(
		locationData ? locationData.display : DisplayTypes.Movies
	);
	const [searchValue, setSearchValue] = useState(
		locationData ? locationData.search : ""
	);
	const [searchOutput, setSearchOutput] = useState([]);
	const [topMovies, setTopMovies] = useState<IMovie[]>([]);
	const [topShows, setTopShows] = useState<IShow[]>([]);
	var typingTimer: NodeJS.Timeout;

	const getData = async () => {
		const movieData = await getTopMovies();
		const showData = await getTopShows();
		setTopMovies(movieData);
		setTopShows(showData);
	};

	const getSearchItems = async () => {
		if (searchValue.length > 2) {
			if (displayData === DisplayTypes.Movies) {
				const searchMovies = await getSearchMovies(searchValue);
				setSearchOutput(searchMovies?.results);
			} else {
				const searchShows = await getSearchShows(searchValue);
				setSearchOutput(searchShows?.results);
			}
		}
	};

	useEffect(() => {
		setLocationData(location.state);

		if (searchValue.length < 3) {
			getData();
		} else {
			getSearchItems();
		}
	}, [displayData, searchValue]);

	const updateDisplayData = (name: string) => {
		if (name === DisplayTypes.TV) setDisplayData(DisplayTypes.TV);
		else setDisplayData(DisplayTypes.Movies);
	};

	const searchBar = () => {
		return (
			<div className='center margin-top'>
				<input
					className='searchBar'
					type='search'
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
					placeholder='Search...'
				/>
			</div>
		);
	};

	const categoryButton = (name: string) => {
		const show = name === "Shows" ? DisplayTypes.TV : DisplayTypes.Movies;
		return (
			<div>
				<button
					className={
						show === displayData ? "categoryButtonSelected" : "categoryButton"
					}
					onClick={() => updateDisplayData(show)}
				>
					{name}
				</button>
			</div>
		);
	};

	const getPoster = (path: string) => {
		return (
			<img
				className='poster'
				src={"https://image.tmdb.org/t/p/w300" + path}
				alt='Movie Poster'
			></img>
		);
	};

	const renderMovie = (item: IMovie) => {
		return (
			<div
				className='itemContainer'
				onClick={() => {
					navigate("../item/movie/" + item.id, {
						state: { search: searchValue, display: displayData },
					});
				}}
			>
				<div className='posterContainer'>
					{getPoster(item.poster_path)}
					<p>{item.title}</p>
				</div>
			</div>
		);
	};
	const renderShow = (item: IShow) => {
		return (
			<div
				className='itemContainer'
				onClick={() => {
					navigate("../item/tv/" + item.id, {
						state: { search: searchValue, display: displayData },
					});
				}}
			>
				<div className='posterContainer'>
					{getPoster(item.poster_path)}
					<p>{item.name}</p>;
				</div>
			</div>
		);
	};

	const displayContent = () => {
		if (displayData === DisplayTypes.Movies) {
			if (searchValue.length < 3) {
				return topMovies.map((item) => renderMovie(item));
			} else {
				return searchOutput.map((item) => renderMovie(item));
			}
		} else {
			if (searchValue.length < 3) {
				return topShows.map((item) => renderShow(item));
			} else {
				return searchOutput.map((item) => renderShow(item));
			}
		}
	};

	return (
		<>
			<Header />
			{searchBar()}
			<div className='center margin-top'>
				{categoryButton("Movies")}
				{categoryButton("Shows")}
			</div>
			<div className='container margin-top'>{displayContent()}</div>
		</>
	);
};

export default HomePage;
