import React from "react";

interface CardMediaProps {
    apiBaseImageUrl: string,
    title?: string,
    backdropPath?: string,
    posterPath?: string,
}
const placeholderImage = `${process.env.PUBLIC_URL}/assets/images/no_image.png`;

const CustomCardMedia: React.FC<CardMediaProps> = ({ backdropPath, posterPath, apiBaseImageUrl, title }) => {
  const imageUrl = backdropPath || posterPath ? `${apiBaseImageUrl}${backdropPath ?? posterPath}` : placeholderImage;

  const handleImageError = (event:React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = placeholderImage;
  };

  return (
    <img
      className="img-styles"
      alt={title}
      loading="lazy"
      src={imageUrl}
      onError={handleImageError}
    />
  );
};

export default CustomCardMedia;
