//Libs
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
//Redux
import { Provider } from 'react-redux';
import { store } from './store';
//Application
import App from './App';
//Style
import './index.css';

//Basic configuration for axios API, issues with using env variables
const apiURL = 'https://api.themoviedb.org/3/';
const apiKey =
	'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzFjNGNmY2NhMGQwM2Y1NzdhNWU2MGQyMTE0MWM1OCIsInN1YiI6IjYzOTFhN2RhMTg4NjRiMDA3Y2RkNjZlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.crxfVE5T30pdq6-BmpnX7IoQSSq9-N0CjPk8wRQxqzk';

axios.defaults.baseURL = apiURL;
axios.defaults.headers.common['Authorization'] = apiKey;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
