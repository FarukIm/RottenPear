import React from "react";
import "./header.css";
import rottenpearlogo from "../../assets/images/rottenpearlogo.png";

const Header = () => {
	return (
		<div className='titleContainer'>
			<img
				src={rottenpearlogo}
				width='140'
				height='100'
				alt='company logo, rottenPear'
			/>{" "}
			RottenPear
		</div>
	);
};

export default Header;
