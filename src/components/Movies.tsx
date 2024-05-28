import React, { useState } from "react";
import { Typography, Box, Pagination, TextField, CircularProgress } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CustomCardMedia from '../components/CustomCardMedia'
import { Link } from "react-router-dom";
import { useDebounce } from 'use-debounce';
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOVIE } from '../apis/types';
import { StyledTextField } from "./styledComponents/styles";
import { config } from '../config';
import { useGetAllMovies } from "../hooks/useGetAllMovies";

const Movies: React.FC = () => {
    const { apiBaseImageUrl } = config;
    const mobileView = useMediaQuery('(max-width:600px)');
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [debouncedSearch] = useDebounce(search, 500);
    const [debouncedPage] = useDebounce(page, 500);

    const { data, isLoading, isError } = useGetAllMovies(debouncedSearch, debouncedPage);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value.toLowerCase());
        setPage(1); // Reset to first page on new search
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const cardStyles= {
        width: mobileView ? '100%' : '220px',
        height: '99%',
        display: mobileView ? 'flex' : ''
    }
    console.log(data)
  
    return (
        <Box display='flex' gap='10px' width='inherit' flexDirection='column' sx={{ marginTop: '15px', backgroundColor: 'white', padding: '10px' }}>
            <Typography variant="h6" fontWeight='700' display='flex'>List of Movies</Typography>

            <StyledTextField
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
                                    <Card
                                        sx={{
                                            
                                        }}
                                        key={movie.id}>
                                        <CustomCardMedia
                                            styles={cardStyles}
                                            backdropPath={movie.backdrop_path}
                                            posterPath={movie.poster_path}
                                            apiBaseImageUrl={apiBaseImageUrl}
                                        />
                                        <CardContent>
                                            <Box display='flex' alignItems="start" flexDirection={mobileView ? 'column-reverse' : 'column'}>
                                                <Typography gutterBottom fontSize='16px'>
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
                    <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                        <Pagination count={data?.total_pages} page={page} onChange={(e)=>handleChange} />
                        <TextField 
                            type="number"
                            value={page}
                            InputProps={{ inputProps: { min: 1, max: 500 } }} // maximum cannot only 500 by TMDB database so cannot go more than that if existing
                            onChange={(e)=> setPage(Number(e.target.value))}
                            size="small"
                            autoComplete="off"
                            variant="outlined" />
                    </Box>
                </>
            )}
        </Box>
    );
}

export default Movies;
