import axios from 'axios';

const getTopShows = async () => {
	const options = {
		method: 'GET',
		url: `tv/top_rated?language=en-US&page=1`,
	};
	try {
		const { data: response } = await axios.request(options);
		return response.results.slice(0, 10);
	} catch (e) {
		console.log(e);
		return e;
	}
};

const getSearchShows = async (term: string) => {
	const options = {
		method: 'GET',
		url: `search/tv?query=${term}&language=en-US&page=1&include_adult=false`,
	};
	try {
		const { data: response } = await axios.request(options);
		return response.results;
	} catch (e) {
		console.log(e);
		return e;
	}
};

const getShow = async (id: string | undefined) => {
	const options = {
		method: 'GET',
		url: `tv/${id}?language=en-US`,
	};
	try {
		const { data: response } = await axios.request(options);
		return response;
	} catch (e) {
		console.log(e);
		return e;
	}
};

export { getTopShows, getSearchShows, getShow };
