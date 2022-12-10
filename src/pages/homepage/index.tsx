import React, { useEffect, useState } from "react";
//Components
import Header from "../../components/header";
//Api
import { getTopMovies } from "../../api/movies";
import { getTopShows } from "../../api/tvshows";
//Interfaces
import { IMovie } from "../../utils/interfaces/movies.interface";
import { IShow } from "../../utils/interfaces/shows.interface";
//Enums
import { DisplayTypes } from "../../utils/enums/homepage.enum";

const HomePage = () => {
	const [displayData, setDisplayData] = useState<DisplayTypes>(
		DisplayTypes.Movies
	);
	const [topMovies, setTopMovies] = useState<IMovie[]>([]);
	const [topShows, setTopShows] = useState<IShow[]>([]);
	const getData = async () => {
		const movieData = await getTopMovies();
		const showData = await getTopShows();
		setTopMovies(movieData);
		setTopShows(showData);
	};
	useEffect(() => {
		getData();
	}, []);

	const updateDisplayData = (name: string) => {
		if (name.toLowerCase() === "shows") setDisplayData(DisplayTypes.Shows);
		else setDisplayData(DisplayTypes.Movies);
	};

	const searchBar = () => {
		return (
			<div>
				<input type='search' placeholder='Search...' />
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

	const isItemMovie = (item: IMovie | IShow): item is IMovie => {
		return (item as IMovie).title !== undefined;
	};

	const getPoster = (path: string) => {
		return <img src={"https://image.tmdb.org/t/p/w300" + path}></img>;
	};

	const renderMovie = (item: IMovie) => {
		return (
			<div>
				{getPoster(item.poster_path)}
				<p>{item.title}</p>;
			</div>
		);
	};
	const renderShow = (item: IShow) => {
		return (
			<div>
				{getPoster(item.poster_path)}
				<p>{item.name}</p>;
			</div>
		);
	};

	return (
		<>
			<Header />
			{searchBar()}
			{categoryButton("Movies")}
			{categoryButton("Shows")}
			{displayData === DisplayTypes.Movies
				? topMovies.map((item) => renderMovie(item))
				: topShows.map((item) => renderShow(item))}
		</>
	);
};

export default HomePage;
