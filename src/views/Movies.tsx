import React, { useState, useCallback, useEffect } from "react";
import {  Pagination, CircularProgress } from "@mui/material";
import CustomCardMedia from '../components/CustomCardMedia';
import { Link } from "react-router-dom";
import { DEBOUNCE_DELAY } from '../constants';
import { useDebounce } from 'use-debounce';
import { Movie } from '../apis/types';
import { useAppDispatch } from "../store";
import { config } from '../config';
import { setMovieInfo } from "../store/active/reducer";
import { useGetAllMovies } from "../apis/hooks/useGetAllMovies";
import  ErrorBoundary  from '../components/ErrorBoundary'
import '../Movies.scss'


// static data outside of component
const { apiBaseImageUrl } = config;

const Movies: React.FC = () => {

    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [pageInput, setPageInput] = useState<string>(String(page)); // Local state for input
    const [debouncedSearch] = useDebounce(search, DEBOUNCE_DELAY); 
    const [debouncedPageInput] = useDebounce(pageInput, DEBOUNCE_DELAY);
    const dispatch = useAppDispatch();
    const { data, isLoading, isError } = useGetAllMovies(debouncedSearch, Number(debouncedPageInput) || 1);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value.toLowerCase());
        setPage(1); // Reset to first page on new search
    }, []);

    const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setPageInput(String(value)); // Sync input with page state
    }, []);

    const handleTextFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '') {
            setPageInput(value); // Clear the input field
            setPage(1); // Reset page to 1 when input is cleared
        } else {
            const pageNumber = Number(value);
            if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= (data?.total_pages || 1)) {
                setPage(pageNumber);
                setPageInput(value); // Update pageInput only when the value is valid
            }
        }
    }, [data?.total_pages]);
    
    

    useEffect(() => {
        setPageInput(String(page)); // Sync input with page state on data change
    }, [page]);

    const handleCardClick = (movie: Movie) => {
        dispatch(setMovieInfo(movie));
    };

    return (
        <ErrorBoundary fallback={<p>We couldn't find any movies. Please try again later.</p>}>
            <div className="flex-col gap-10 movies-container">
                <span>List of Movies</span>
                <input 
                    className="field-input"
                    value={search}
                    onChange={handleInputChange}
                    autoComplete="off"
                    placeholder="Search movie"
                />
                {isLoading ? (
                    <div className="circular-progress-box">
                        <CircularProgress />
                    </div>
                ) : isError ? (
                    <span>Error loading movies. Please try again.</span>
                ) : (
                    <>
                        <div className="img-grid">
                            {data?.results && data.results.length > 0 ? (
                                data.results.map((movie: Movie) => (
                                    <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
                                        <div className="img-card" onClick={() => handleCardClick(movie)} key={movie.id}>
                                            <CustomCardMedia
                                                apiBaseImageUrl={apiBaseImageUrl}
                                                title={movie?.title}
                                                backdropPath={movie.backdrop_path}
                                                posterPath={movie.poster_path}
                                            />
                                            <div className="img-card-content">
                                                <span className="word-break font-16 black">
                                                    {movie?.title}
                                                </span>
                                                <span className="font-14 black">
                                                    {movie?.release_date}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <span>No movies found</span>
                            )}
                        </div>
                        <div className="flex gap-10 mt-10 justify-center">
                            <Pagination count={data?.total_pages} page={page} onChange={handlePageChange} />
                            <input 
                                className="field-input"
                                type="number"
                                value={pageInput}
                                min={1}
                                max={data?.total_pages || 1}
                                onChange={handleTextFieldChange}
                                autoComplete="off"
                            />
                        </div>
                    </>
                )}
            </div>
        </ErrorBoundary>
    );
}

export default React.memo(Movies);
