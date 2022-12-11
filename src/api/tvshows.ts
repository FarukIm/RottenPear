const getTopShows = async () => {
	const response = await fetch(
		"https://api.themoviedb.org/3/tv/top_rated?api_key=c71c4cfcca0d03f577a5e60d21141c58&language=en-US&page=1"
	);
	let data = await response.json();
	data = data.results.slice(0, 10);
	return data;
};

const getSearchShows = async (term: string) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/search/tv?api_key=c71c4cfcca0d03f577a5e60d21141c58&language=en-US&query=${term}&page=1&include_adult=false`
	);
	const data = await response.json();
	return data;
};

const getShow = async (id: string | undefined) => {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${id}?api_key=c71c4cfcca0d03f577a5e60d21141c58&language=en-US`
	);
	const data = await response.json();
	return data;
};

export { getTopShows, getSearchShows, getShow };
