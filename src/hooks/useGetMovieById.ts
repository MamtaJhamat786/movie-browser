import { useQuery, UseQueryResult } from 'react-query';

import { MOVIE } from '../apis/types'

import {getMovieById} from "../apis/getMovieById";

export const useGetMovieById = (movieId: number): UseQueryResult<MOVIE, Error>=> {
    return useQuery(['movies'], () => getMovieById(movieId));
};
