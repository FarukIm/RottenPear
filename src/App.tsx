import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import HomePage from "./pages/homepage";
import MoviePage from "./pages/moviepage";

import "./App.css";
function App() {
	return (
		<Router>
			<Routes>
				<Route path='/item/:id' element={<MoviePage />} />
				<Route path='/homepage' element={<HomePage />} />
				<Route path='*' element={<Navigate to='/homepage' />} />
			</Routes>
		</Router>
	);
}

export default App;
