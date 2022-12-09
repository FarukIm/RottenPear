import React from "react";
import "./header.css";

const Header = () => {
	return (
		<div className='titleContainer'>
			<img
				src='rottenpearlogo.png'
				width='140'
				height='100'
				alt='company logo, rottenPear'
			/>{" "}
			RottenPear
		</div>
	);
};

export default Header;
