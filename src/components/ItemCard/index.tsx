import React from 'react';

import { useNavigate } from 'react-router-dom';

import { ICard } from '../../utils/interfaces/card.interface';
import { IMovie } from '../../utils/interfaces/movies.interface';

const ItemCard: React.FC<ICard> = ({ item }) => {
	const navigate = useNavigate();

	const getPoster = (path: string) => {
		return (
			<img
				className="poster"
				src={'https://image.tmdb.org/t/p/w300' + path}
				alt="Poster not available"></img>
		);
	};

	function isMovie(object: any): object is IMovie {
		return 'title' in object;
	}

	return (
		<button
			className="itemContainer"
			onClick={() => {
				navigate(
					isMovie(item) ? '../item/movie/' + item.id : '../item/tv/' + item.id
				);
			}}>
			<div className="posterContainer">
				{getPoster(item.poster_path)}
				<p>{isMovie(item) ? item.title : item.name}</p>
			</div>
		</button>
	);
};

export default ItemCard;
