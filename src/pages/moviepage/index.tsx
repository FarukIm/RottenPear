import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header";

const MoviePage = () => {
	const { id } = useParams();
	return (
		<>
			<Header />
			<p>{id}</p>
		</>
	);
};

export default MoviePage;
