import axios from 'axios'

export const axiosClientTv_api = axios.create({
    baseURL: 'https://api.themoviedb.org/'
})