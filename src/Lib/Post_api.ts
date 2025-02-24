import axios from 'axios'

export const axiosClientpost_api = axios.create({
    baseURL: 'https://post.intellectus.app.br',
})