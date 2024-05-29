import React from "react";
import { useParams } from 'react-router-dom';
import { useGetMovieById } from '../apis/hooks/useGetMovieById';
import CustomCardMedia from '../components/CustomCardMedia'
import { addItemToBag } from "../store/active/reducer";

import { useAppDispatch, useAppSelector } from "../store";
import { config } from '../config';
import '../Movies.scss'

const { apiBaseImageUrl } = config;

const SingleMovie: React.FC = () => {
    const { id } = useParams();
    const item = useAppSelector((s) => s.active.itemsInBag);
    const dispatch = useAppDispatch();

    const movie = useAppSelector((state) => state.active.movieInfo);
      // Fetch movie data using useGetMovieById hook if not available in Redux
      const { data } = useGetMovieById(Number(id));

        // Check if the movie data is available
    const movieData = movie || data ; // use the data from the API only when the page is reloaded and not available in redux, if only redux will be usedm data will be lost after refresh
    
    const handleAddToBag = () => {
        dispatch(addItemToBag(item + 1))
    }
    if (!movieData) return null;
    return (
        <div className="flex gap-20 p-30 m-auto justify-center width-70" id="single-card">
            <div className="single-img-card">
                <CustomCardMedia
                    apiBaseImageUrl={apiBaseImageUrl}
                    title={movieData.title}
                    backdropPath={movieData.backdrop_path}
                    posterPath={movieData.poster_path}
                />
            </div>
            <div className="flex-col gap-20 single-card-content">
                <span className="flex font-20 font-bold word-break">
                    {movieData.original_title ?? ''}
                </span>
                <div className="flex gap-10">
                    <span className="font-16">
                        {movieData.overview ?? ''}
                    </span>
                </div>
                <div className="flex gap-10">
                    <span className="font-20" >
                        Released on {movieData.release_date}
                    </span>
                </div>
                <div className="flex gap-10">
                <button
                    className="font-16 flex align-center min-width-24 add-to-cart"
                    onClick={handleAddToBag}
                >
                    Buy Tickets
                </button>

                </div>
            </div>
        </div>
    );
}

export default React.memo(SingleMovie);
