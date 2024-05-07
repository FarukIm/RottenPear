import './header.css';
import rottenpearlogo from '../../assets/images/rottenpearlogo.png';

const Header = () => {
	return (
		<div className="titleContainer">
			<img
				className="logoStyle"
				src={rottenpearlogo}
				alt="company logo, rottenPear"
			/>{' '}
			RottenPear
		</div>
	);
};

export default Header;
