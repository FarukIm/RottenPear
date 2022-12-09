import React, { useEffect, useState } from "react";
//Components
import Header from "../../components/header";
//Api
import { getTopMovies } from "../../api/movies";
import { getTopShows } from "../../api/tvshows";
import { IMovie } from "../../utils/interfaces/movies.interface";
import { IShow } from "../../utils/interfaces/shows.interface";

const HomePage = () => {
	const [displayData, setDisplayData] = useState<IMovie[] | IShow[]>([]);
	const [topMovies, setTopMovies] = useState<IMovie[]>([]);
	const [topShows, setTopShows] = useState<IShow[]>([]);
	const getData = async () => {
		const movieData = await getTopMovies();
		const showData = await getTopShows();
		console.log(showData);
		setTopMovies(movieData);
		setTopShows(showData);
		setDisplayData(topMovies);
	};
	useEffect(() => {
		getData();
	}, []);

	const updateDisplayData = (name: string) => {
		if (name.toLowerCase() === "tv shows") setDisplayData(topShows);
		else setDisplayData(topMovies);
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

	const renderItems = (item: IMovie | IShow) => {
		if (isItemMovie(item)) {
			return <p>{item.title}</p>;
		} else {
			return <p>{item.name}</p>;
		}
	};

	return (
		<div>
			<Header />
			{searchBar()}
			{categoryButton("Movies")}
			{categoryButton("TV Shows")}
			{displayData?.map((item) => renderItems(item))}
		</div>
	);
};

export default HomePage;
