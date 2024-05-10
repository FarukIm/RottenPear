//Libs
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//Components
import Header from '../../components/Header';
//Api
import { getMovie, getTrailer } from '../../api/movies';
import { getShow } from '../../api/tvshows';
//State
import { useAppSelector } from '../../store';
//Enum
import { ItemTypes } from '../../utils/enums/homepage.enum';
//Style
import './itempage.css';

const ItemPage = () => {
	const navigate = useNavigate();
	const id = useAppSelector((state) => state.tvShowsAndMovies.selectedItemId);
	const type = useAppSelector((state) => state.tvShowsAndMovies.selectedType);
	const [data, setData] = useState<any>([]);
	const [trailer, setTrailer] = useState();

	const renderTitle = () => {
		if (type === ItemTypes.Movies) {
			return <div>{data?.title}</div>;
		} else {
			return <div>{data?.name}</div>;
		}
	};

	const getPoster = (path: string | undefined) => {
		return (
			<img
				className="cover"
				src={'https://image.tmdb.org/t/p/w300' + path}
				alt="Poster not available"></img>
		);
	};

	useEffect(() => {
		const getData = async () => {
			if (type === ItemTypes.Movies) {
				const _data = await getMovie(String(id));
				setData(_data);
			} else {
				const _data = await getShow(String(id));
				setData(_data);
			}
			const _trailer = await getTrailer(String(id), type);
			setTrailer(_trailer);
		};
		getData();
	}, []);

	return (
		<>
			<Header />
			<div className="center">
				<div className="container">
					<div className="start">
						<button
							className="backButton margin-top"
							onClick={() => {
								navigate(-1);
							}}>
							<div className="backArrow" />
							Back
						</button>
					</div>
					<h1 className="itemTitle">{renderTitle()}</h1>
					<div className="mediaContainer start">
						{trailer ? (
							<iframe
								className="video"
								src={`https://www.youtube.com/embed/${trailer}`}
								title="YouTube video player"
							/>
						) : (
							getPoster(data?.poster_path)
						)}
					</div>
					<div className="start">
						<div className="overview ">
							<h2>Overview:</h2>
							{data.overview}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ItemPage;
