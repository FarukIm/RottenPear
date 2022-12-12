import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import HomePage from "./pages/homepage";
import ItemPage from "./pages/itempage";

import "./App.css";
function App() {
	return (
		<Router>
			<Routes>
				<Route path='/item/:type/:id' element={<ItemPage />} />
				<Route path='/homepage' element={<HomePage />} />
				<Route path='*' element={<Navigate to='/homepage' />} />
			</Routes>
		</Router>
	);
}

export default App;
