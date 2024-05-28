
import { useQuery } from 'react-query';

import {getMovieById} from "../apis/getMovieById";

export const useGetMovieById = (movieId: number) => {
    return useQuery(['movies'], () => getMovieById(movieId));
};
