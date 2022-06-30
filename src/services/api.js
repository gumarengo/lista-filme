import axios from "axios";

//base url https://api.themoviedb.org/3/
//https://api.themoviedb.org/3/movie/now_playing?api_key=796c3865d427d5b32103b951fef74590&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;