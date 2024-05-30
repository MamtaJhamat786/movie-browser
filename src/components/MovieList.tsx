import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CustomCardMedia from "../components/CustomCardMedia";
import { Link } from "react-router-dom";
import { Movie, Movies } from "../apis/types";
import { config } from "../config";

const { apiBaseImageUrl } = config;

interface MovieListProps  {
    isError: boolean;
    isLoading: boolean;
    data: Movies | undefined ;
  }
  

const MovieList: React.FC<MovieListProps> = ({ isError, isLoading, data }) => {

  if (isError) {
    return <span>Error loading movies. Please try again.</span>;
  }

  if (isLoading) {
    return <div className="circular-progress-box"><CircularProgress /></div>;
  }

  if (!data || !data.results || data.results.length === 0) {
    return <span>No movies found</span>;
  }

  return (
    <div className="img-grid">
      {data.results.map((movie: Movie) => (
        <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: "none" }}>
          <div className="img-card" key={movie.id}>
            <CustomCardMedia
              apiBaseImageUrl={apiBaseImageUrl}
              title={movie?.title}
              backdropPath={movie.backdrop_path}
              posterPath={movie.poster_path}
            />
            <div className="img-card-content">
              <span className="word-break font-16 black">{movie?.title}</span>
              <span className="font-14 black">{movie?.release_date}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
