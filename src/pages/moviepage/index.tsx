import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../../api/movies";
import Header from "../../components/header";
import { IMovie } from "../../utils/interfaces/movies.interface";

const MoviePage = () => {
	const { type, id } = useParams();
	const [data, setData] = useState<IMovie>();
	const getData = async () => {
		const _data = await getMovie(id);
		setData(_data);
	};
	const getPoster = (path: string | undefined) => {
		return (
			<img
				src={"https://image.tmdb.org/t/p/w300" + path}
				alt='Image not available'
			></img>
		);
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<Header />
			<p>{data?.title}</p>
			{getPoster(data?.poster_path)}
		</>
	);
};

export default MoviePage;
