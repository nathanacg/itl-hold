import axios from 'axios'

export const axiosSpotfyRequisition_api = axios.create({
    baseURL: "https://accounts.spotify.com/api/token"
})

export const axiosClientmusic_api = axios.create({
    baseURL: 'https://api.spotify.com/v1/',
})