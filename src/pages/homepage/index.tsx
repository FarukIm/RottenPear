import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

const HomePage = () => {
	const [displayData, setDisplayData] = useState<DisplayTypes>(
		DisplayTypes.Movies
	);
	const [searchValue, setSearchValue] = useState("");
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
		if (searchValue.length < 3) {
			getData();
		} else {
			getSearchItems();
		}
	}, [displayData]);

	const updateDisplayData = (name: string) => {
		if (name.toLowerCase() === "shows") setDisplayData(DisplayTypes.Shows);
		else setDisplayData(DisplayTypes.Movies);
	};

	const searchBar = () => {
		return (
			<div>
				<input
					type='search'
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
		return (
			<div>
				<button onClick={() => updateDisplayData(name.toLowerCase())}>
					{name}
				</button>
			</div>
		);
	};

	const getPoster = (path: string) => {
		return (
			<img
				src={"https://image.tmdb.org/t/p/w300" + path}
				alt='Image not available'
			></img>
		);
	};

	const renderMovie = (item: IMovie) => {
		return (
			<Link to={"../item/movie/" + item.id}>
				<div>
					{getPoster(item.poster_path)}
					<p>{item.title}</p>;
				</div>
			</Link>
		);
	};
	const renderShow = (item: IShow) => {
		return (
			<Link to={"../item/show/" + item.id}>
				<div>
					{getPoster(item.poster_path)}
					<p>{item.name}</p>;
				</div>
			</Link>
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
			{categoryButton("Movies")}
			{categoryButton("Shows")}
			{displayContent()}
		</>
	);
};

export default HomePage;
