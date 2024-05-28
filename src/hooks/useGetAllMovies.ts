
import { useQuery } from 'react-query';
import {config} from '../config'

import {allMovies} from "../apis/getAllMovies";

export const useGetAllMovies = (searchValue: string, page: number) => {
    const { apiBaseUrl, apiSearchUrl, apiKey } = config;

    const searchURL = searchValue
        ? `${apiSearchUrl}?query=${encodeURIComponent(searchValue)}&api_key=${apiKey}&page=${page}`
        : `${apiBaseUrl}?api_key=${apiKey}&page=${page}`;

    return useQuery(['movies', searchValue, page], () => allMovies(searchURL), {
        keepPreviousData: true,
    });
};

