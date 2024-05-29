import { useQuery, UseQueryResult } from 'react-query';

import { Movie } from '../types'
import { config } from '../../config';

const {  apiKey, apiFindByIdUrl } = config;

export const useGetMovieById = (movieId: number): UseQueryResult<Movie, Error>=> {
    return useQuery(['movies'], () => getMovieById(movieId));
};

export const  getMovieById = async (movieId: number): Promise<Movie>=> {

    const url = `${apiFindByIdUrl}/${movieId}?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
}
