import { config } from '../config';



export const  getMovieById = async (movieId: number)=> {
    const {  apiKey, apiFindByIdUrl } = config;
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
