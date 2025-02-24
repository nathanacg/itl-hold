import axios from 'axios'

export const axiosClientChat_api = axios.create({
    baseURL: 'https://chat.intellectus.app.br',
})