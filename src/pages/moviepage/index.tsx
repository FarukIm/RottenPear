import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import Header from "../../components/header";

import { getMovie, getMovieTrailer } from "../../api/movies";
import { IMovie } from "../../utils/interfaces/movies.interface";

const MoviePage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { type, id } = useParams();
	const [data, setData] = useState<any>();
	const [trailer, setTrailer] = useState<string | boolean>();
	const getData = async () => {
		const _data = await getMovie(id);
		setData(_data);
		const _trailer = await getMovieTrailer(data?.id);
		setTrailer(_trailer);
	};
	const getPoster = (path: string | undefined) => {
		return (
			<img src={"https://image.tmdb.org/t/p/w300" + path} alt='Cover'></img>
		);
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<Header />
			<div
				onClick={() => {
					navigate("../../../homepage", {
						state: {
							search: location.state.search,
							display: location.state.display,
						},
					});
				}}
			>
				Back
			</div>
			<p>{location.state.search === null}</p>
			<p>{data?.title ? data.title : data?.name}</p>
			{trailer !== false ? (
				<iframe
					width='560'
					height='315'
					src={`https://www.youtube.com/embed/${trailer}`}
					title='YouTube video player'
				/>
			) : (
				getPoster(data?.poster_path)
			)}
		</>
	);
};

export default MoviePage;
