const getTopShows = async () => {
	const response = await fetch(
		"https://api.themoviedb.org/3/tv/top_rated?api_key=c71c4cfcca0d03f577a5e60d21141c58&language=en-US&page=1"
	);
	let data = await response.json();
	data = data.results.slice(0, 10);
	return data;
};

export { getTopShows };
