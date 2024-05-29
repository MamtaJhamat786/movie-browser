import React, { useState, useCallback, useEffect } from "react";
import { Typography, Box, Pagination, TextField, CircularProgress } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CustomCardMedia from '../components/CustomCardMedia';
import { Link } from "react-router-dom";
import { DEBOUNCE_DELAY } from '../constants';
import { useDebounce } from 'use-debounce';
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOVIE } from '../apis/types';
import { useAppDispatch } from "../store";
import { config } from '../config';
import { setMovieInfo } from "../store/active/reducer";
import { useGetAllMovies } from "../hooks/useGetAllMovies";

const Movies: React.FC = () => {
    const { apiBaseImageUrl } = config;
    const mobileView = useMediaQuery('(max-width:600px)');
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
        setPageInput(value);
        const pageNumber = Number(value);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= (data?.total_pages || 1)) {
            setPage(pageNumber);
        }
    }, [data?.total_pages]);

    useEffect(() => {
        setPageInput(String(page)); // Sync input with page state on data change
    }, [page]);

    const handleCardClick = (movie: MOVIE) => {
        dispatch(setMovieInfo(movie));
    };

    const cardStyles = {
        width: mobileView ? '100%' : '220px',
        height: '99%',
        display: mobileView ? 'flex' : ''
    };

    return (
        <Box display='flex' gap='10px' width='inherit' flexDirection='column' sx={{ marginTop: '15px', backgroundColor: 'white', padding: '10px' }}>
            <Typography display='flex'>List of Movies</Typography>
            <TextField
                value={search}
                onChange={handleInputChange}
                size="small"
                autoComplete="off"
                label={mobileView ? 'Search' : 'Search for movies'}
                variant="outlined"
            />
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <Typography color="error">Error loading movies. Please try again.</Typography>
            ) : (
                <>
                    <Box
                        display='grid'
                        gap='10px'
                        rowGap='10px'
                        columnGap='20px'
                        gridTemplateColumns={mobileView ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))'}
                        sx={{ overflowX: 'scroll' }}
                    >
                        {data?.results && data.results.length > 0 ? (
                            data.results.map((movie: MOVIE) => (
                                <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
                                    <Card onClick={() => handleCardClick(movie)} key={movie.id}>
                                        <CustomCardMedia
                                            styles={cardStyles}
                                            apiBaseImageUrl={apiBaseImageUrl}
                                            title={movie?.title}
                                            backdropPath={movie.backdrop_path}
                                            posterPath={movie.poster_path}
                                        />
                                        <CardContent>
                                            <Box display='flex' alignItems="start" flexDirection={mobileView ? 'column-reverse' : 'column'}>
                                                <Typography sx={{ wordBreak: 'break-word' }} gutterBottom fontSize='16px'>
                                                    {movie?.title}
                                                </Typography>
                                                <Typography gutterBottom fontSize='14px'>
                                                    {movie?.release_date}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))
                        ) : (
                            <Typography>No movies found</Typography>
                        )}
                    </Box>
                    <Box sx={{ justifyContent: 'center', display: 'flex', gap: '10px', marginTop: '10px', flexDirection: mobileView ? 'column': 'row' }}>
                        <Pagination count={data?.total_pages} page={page} onChange={handlePageChange} />
                        <TextField 
                            type="number"
                            value={pageInput}
                            InputProps={{ inputProps: { min: 1, max: data?.total_pages || 1 } }} // Set max dynamically
                            onChange={handleTextFieldChange}
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                        />
                    </Box>
                </>
            )}
        </Box>
    );
}

export default React.memo(Movies);
