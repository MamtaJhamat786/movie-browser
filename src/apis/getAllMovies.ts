import { config } from '../config';
import {MOVIES} from './types'

export const allMovies = async(url: string) => {
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
    return data as MOVIES;
};
  
