//Libs
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
//Pages
import HomePage from './pages/homepage';
import ItemPage from './pages/itempage';
//Styles
import './App.css';
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/item" element={<ItemPage />} />
				<Route path="/homepage" element={<HomePage />} />
				<Route path="*" element={<Navigate to="/homepage" />} />
			</Routes>
		</Router>
	);
}

export default App;
