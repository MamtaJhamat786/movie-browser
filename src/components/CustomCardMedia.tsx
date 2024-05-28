import React from 'react';
import { CardMedia } from '@mui/material';
import placeholderImage from '../assets/images/no_image.png'; // Some image that show no  image for that movie

interface CardMediaProps {
    backdropPath?: string,
    posterPath?: string,
    apiBaseImageUrl?: string,
    styles?: Object,
}

const CustomCardMedia: React.FC<CardMediaProps> = ({ backdropPath, posterPath, apiBaseImageUrl, styles }) => {
    const imageUrl = backdropPath || posterPath ? `${apiBaseImageUrl}${backdropPath ?? posterPath}` : placeholderImage;

    const handleImageError = (event:React.SyntheticEvent<HTMLImageElement, Event>) => {
        const imgElement = event.target as HTMLImageElement;
        imgElement.src = placeholderImage;
    };

    return (
        <CardMedia
            component="img"
            sx={styles}
            loading="lazy"
            src={imageUrl}
            onError={handleImageError}
        />
    );
};

export default CustomCardMedia;
