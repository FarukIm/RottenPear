import axios from 'axios';

const getTopMovies = async () => {
	const options = {
		method: 'GET',
		url: `movie/top_rated?language=en-US&page=1`,
	};
	try {
		const { data: response } = await axios.request(options);
		return response.results.slice(0, 10);
	} catch (e) {
		console.log(e);
		return e;
	}
};

const getSearchMovies = async (term: string) => {
	const options = {
		method: 'GET',
		url: `search/movie?query=${term}&language=en-US&page=1&include_adult=false`,
	};
	try {
		const { data: response } = await axios.request(options);
		return response.results;
	} catch (e) {
		console.log(e);
		return e;
	}
};

const getMovie = async (id: string | undefined) => {
	const options = {
		method: 'GET',
		url: `movie/${id}?language=en-US`,
	};
	try {
		const { data: response } = await axios.request(options);
		return response;
	} catch (e) {
		console.log(e);
		return e;
	}
};

const getTrailer = async (id: string | undefined, type: string | undefined) => {
	const options = {
		method: 'GET',
		url: `${type}/${id}/videos?language=en-US`,
	};
	try {
		const { data: response } = await axios.request(options);
		for (const element of response.results) {
			if (
				element.site === 'YouTube' &&
				element.official === true &&
				element.type === 'Trailer'
			) {
				return element.key;
			}
		}
		return undefined;
	} catch (e) {
		console.log(e);
		return e;
	}
};

export { getTopMovies, getSearchMovies, getMovie, getTrailer };
