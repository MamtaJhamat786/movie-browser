
import { useQuery, UseQueryResult } from 'react-query';
import { Movies } from '../types'
import { config } from '../../config';

const { apiBaseUrl, apiSearchUrl, apiKey } = config;

export const allMovies = async(url: string): Promise<Movies> => {
    const {  apiToken } = config;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiToken}`
        }
      };
    
    const response = await fetch(url, options);
    const data = await response.json();
    data.results = data.results.slice(0, 10);
    return data;
};

export const useGetAllMovies = (searchValue: string, page: number): UseQueryResult<Movies, Error> => {
    
    const searchURL = searchValue
        ? `${apiSearchUrl}?query=${encodeURIComponent(searchValue)}&api_key=${apiKey}&page=${page}`
        : `${apiBaseUrl}?api_key=${apiKey}&page=${page}`;

    return useQuery(['movies', searchValue, page], () => allMovies(searchURL), {
        keepPreviousData: true,
    });
};