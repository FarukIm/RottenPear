//Libs
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Components
import Header from "../../components/header";
//Api
import { getMovie, getTrailer } from "../../api/movies";
import { getShow } from "../../api/tvshows";
//Enum
import { DisplayTypes } from "../../utils/enums/homepage.enum";
//Style
import "./itempage.css";

const ItemPage = () => {
	const navigate = useNavigate();
	const { type, id } = useParams();
	const [data, setData] = useState<any>([]);
	const [trailer, setTrailer] = useState();

	const getData = async () => {
		if (type === DisplayTypes.Movies) {
			const _data = await getMovie(id);
			setData(_data);
		} else {
			const _data = await getShow(id);
			setData(_data);
		}
		const _trailer = await getTrailer(id, type);
		setTrailer(_trailer);
	};
	const renderTitle = () => {
		if (type === DisplayTypes.Movies) {
			return <div>{data?.title}</div>;
		} else {
			return <div>{data?.name}</div>;
		}
	};
	const getPoster = (path: string | undefined) => {
		return (
			<img
				className='poster'
				src={"https://image.tmdb.org/t/p/w300" + path}
				alt='Poster not available'
			></img>
		);
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<Header />
			<div className='center'>
				<div className='container'>
					<div className='start'>
						<div
							className='backButton margin-top margin-left'
							onClick={() => {
								navigate(-1);
							}}
						>
							<div className='backArrow' />
							Back
						</div>
					</div>
					<h1 className='itemTitle'>{renderTitle()}</h1>
					<div className='mediaContainer start'>
						{trailer ? (
							<iframe
								className='video'
								src={`https://www.youtube.com/embed/${trailer}`}
								title='YouTube video player'
							/>
						) : (
							getPoster(data?.poster_path)
						)}
					</div>
					<div className='start'>
						<div className='overview '>
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
