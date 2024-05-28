import React from "react";
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Card } from "@mui/material";
import { useGetMovieById } from '../hooks/useGetMovieById';
import CustomCardMedia from '../components/CustomCardMedia'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { addItemToBag } from "../store/active/reducer";
import { useAppDispatch, useAppSelector } from "../store";
import useMediaQuery from "@mui/material/useMediaQuery";
import { config } from '../config';

const SingleMovie: React.FC = () => {
    const { id } = useParams();
    const mobileView = useMediaQuery('(max-width:600px)');
    const item = useAppSelector((s) => s.active.itemsInBag);
    const dispatch = useAppDispatch();

    const movie = useAppSelector((state) => state.active.movieInfo);
      // Fetch movie data using useGetMovieById hook if not available in Redux
      const { data } = useGetMovieById(Number(id));

        // Check if the movie data is available
    const movieData = movie || data ; // use the data from the API only when the page is reloaded and not available in redux, if only redux will be usedm data will be lost after refresh
    const { apiBaseImageUrl } = config;

    const cardStyles= {
        aspectRatio: '3/3'
    }
    const handleAddToBag = () => {
        dispatch(addItemToBag(item + 1))
    }
    return (
        <Box
            sx={{
                padding: '10px',
                display: 'flex',
                flexDirection: mobileView ? 'column' : 'row',
                justifyContent: 'center',
                gap: '20px',
                width: mobileView ? 'auto' : '70%',
                margin: 'auto',
                marginTop: '20px'
            }}>
            <Box width={mobileView ? '100%' : '50%'}>
                <Card>
                    <CustomCardMedia
                        styles={cardStyles}
                        apiBaseImageUrl={apiBaseImageUrl}
                        title={movieData?.title}
                        backdropPath={movieData?.backdrop_path}
                        posterPath={movieData?.poster_path}
                        
                    />
                </Card>
            </Box>
            <Box display='flex' gap='14px' flexDirection='column' alignItems={mobileView ? 'center' : 'start'} width={mobileView ? '100%' : '50%'}>
                <Typography display='flex' fontSize='20px' fontWeight='700' sx={{ wordBreak: 'break-word' }}>
                    {movieData?.original_title ?? ''}
                </Typography>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography fontSize='14px' sx={{ lineHeight: 1.3 }} >
                        {movieData?.overview ?? ''}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography fontSize='20px' sx={{ lineHeight: 1.3 }} >
                        Released on {movieData?.release_date}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Button
                        startIcon={<ShoppingCartRoundedIcon />}
                        color='success'
                        variant='contained'
                        onClick={handleAddToBag}
                        sx={{ fontSize: '16px', minWidth: '24px' }}
                    >
                        Buy Tickets
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default React.memo(SingleMovie);
