//libs
import React from 'react';
import { useNavigate } from 'react-router-dom';
//state
import { useAppDispatch } from '../../store';
import { setSelectedItemId } from '../../store/features/tvShowsAndMoviesSlice';
//interfaces
import { ICard } from '../../utils/interfaces/card.interface';
import { IMovie } from '../../utils/interfaces/movies.interface';
//Style
import styles from './itemCard.module.css';

const ItemCard: React.FC<ICard> = ({ item }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const getPoster = (path: string) => {
		return (
			<img
				className={styles.poster}
				src={'https://image.tmdb.org/t/p/w300' + path}
				alt="Poster not available"></img>
		);
	};

	function isMovie(object: any): object is IMovie {
		return 'title' in object;
	}

	const handleCardClick = () => {
		dispatch(setSelectedItemId(item.id));
		navigate('../item');
	};

	return (
		<button
			className={styles.itemContainer}
			onClick={() => {
				handleCardClick();
			}}
			title={isMovie(item) ? item.title : item.name}>
			<div className={styles.posterContainer}>
				{getPoster(item.poster_path)}
				<p className={styles.itemTitle}>
					{isMovie(item) ? item.title : item.name}
				</p>
			</div>
		</button>
	);
};

export default ItemCard;
