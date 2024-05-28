export const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://api.themoviedb.org/3/discover/movie',
    apiSearchUrl: process.env.REACT_APP_API_BASE_SEARCH_URL || 'https://api.themoviedb.org/3/search/movie',
    apiFindByIdUrl: process.env.REACT_APP_API_FIND_BY_ID_URL || 'https://api.themoviedb.org/3/movie',
    apiToken: process.env.REACT_APP_API_ACCESS_AUTH_TOKEN,
    apiKey: process.env.REACT_APP_API_KEY || '355ffb68ee9060912a2c39cd9919d52e',
    apiBaseImageUrl: process.env.REACT_APP_API_IMAGE_BASE_URL,
  };
