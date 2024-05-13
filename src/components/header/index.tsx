import styles from './header.module.css';
import rottenpearlogo from '../../assets/images/rottenpearlogo.png';

const Header = () => {
	return (
		<div className={styles.titleContainer}>
			<img
				className={styles.logoStyle}
				src={rottenpearlogo}
				alt="company logo, rottenPear"
			/>{' '}
			RottenPear
		</div>
	);
};

export default Header;
