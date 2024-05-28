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

    const { data } = useGetMovieById(Number(id));
    console.log(id, data);

    const { apiBaseImageUrl } = config;
    const cardStyles= {
        aspectRatio: '3/3'
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
                        backdropPath={data?.backdrop_path}
                        posterPath={data?.poster_path}
                        apiBaseImageUrl={apiBaseImageUrl}
                    />
                </Card>
            </Box>
            <Box display='flex' gap='14px' flexDirection='column' alignItems={mobileView ? 'center' : 'start'} width={mobileView ? '100%' : '50%'}>
                <Typography display='flex' fontSize='20px' fontWeight='700' sx={{ wordBreak: 'break-word' }}>
                    {data?.original_title ?? ''}
                </Typography>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography fontSize='14px' sx={{ lineHeight: 1.3 }} >
                        {data?.overview ?? ''}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Typography fontSize='20px' sx={{ lineHeight: 1.3 }} >
                        Released on {data?.release_date}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Button
                        startIcon={<ShoppingCartRoundedIcon />}
                        color='success'
                        variant='contained'
                        onClick={() => dispatch(addItemToBag(item + 1))}
                        sx={{ fontSize: '16px', minWidth: '24px' }}
                    >
                        Buy Tickets
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default SingleMovie;
