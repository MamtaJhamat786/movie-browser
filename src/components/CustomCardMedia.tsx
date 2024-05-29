import React from 'react';
import { CardMedia } from '@mui/material';

interface CardMediaProps {
    styles: Object,
    apiBaseImageUrl: string,
    title?: string,
    backdropPath?: string,
    posterPath?: string,
}
const placeholderImage = `${process.env.PUBLIC_URL}/assets/images/no_image.png`;

const CustomCardMedia: React.FC<CardMediaProps> = ({ backdropPath, posterPath, apiBaseImageUrl, styles, title }) => {
    const imageUrl = backdropPath || posterPath ? `${apiBaseImageUrl}${backdropPath ?? posterPath}` : placeholderImage;

    const handleImageError = (event:React.SyntheticEvent<HTMLImageElement, Event>) => {
        const imgElement = event.target as HTMLImageElement;
        imgElement.src = placeholderImage;
    };

    return (
        <CardMedia
            alt={title}
            component="img"
            sx={styles}
            loading="lazy"
            src={imageUrl}
            onError={handleImageError}
        />
    );
};

export default CustomCardMedia;
