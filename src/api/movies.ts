const getTopMovies = async () => {
	const response = await fetch(
		"https://api.themoviedb.org/3/movie/top_rated?api_key=c71c4cfcca0d03f577a5e60d21141c58&language=en-US&page=1"
	);
	let data = await response.json();
	data = data.results.slice(0, 10);
	return data;
};

const getSearchMovies = async (term: string) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=c71c4cfcca0d03f577a5e60d21141c58&language=en-US&query=${term}&page=1&include_adult=false`
	);
	const data = await response.json();
	return data;
};

const getMovie = async (id: string | undefined) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=c71c4cfcca0d03f577a5e60d21141c58&language=en-US`
	);
	const data = await response.json();
	return data;
};

const getTrailer = async (id: string | undefined, type: string | undefined) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=c71c4cfcca0d03f577a5e60d21141c58&language=en-US`
	);
	const data = await response.json();

	for (const element of data.results) {
		if (
			element.site === "YouTube" &&
			element.official === true &&
			element.type === "Trailer"
		) {
			return element.key;
		}
	}
	return undefined;
};

export { getTopMovies, getSearchMovies, getMovie, getTrailer };
