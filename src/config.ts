export const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://api.themoviedb.org/3/discover/movie',
    apiSearchUrl: process.env.REACT_APP_API_BASE_SEARCH_URL || 'https://api.themoviedb.org/3/search/movie',
    apiFindByIdUrl: process.env.REACT_APP_API_FIND_BY_ID_URL || 'https://api.themoviedb.org/3/movie',
    apiToken: process.env.REACT_APP_API_ACCESS_AUTH_TOKEN || "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTVmZmI2OGVlOTA2MDkxMmEyYzM5Y2Q5OTE5ZDUyZSIsInN1YiI6IjY2NTIxZDI0NTZkMWNiM2RkN2MxMzEzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8XI-GBm-kzd0cWb3KorZpvxbWsPXBsvpsneFL_Ii2Z8",
    apiKey: process.env.REACT_APP_API_KEY || '355ffb68ee9060912a2c39cd9919d52e',
    apiBaseImageUrl: process.env.REACT_APP_API_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500',
  };
