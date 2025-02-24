import axios from 'axios'

export const axiosClientMediaApi = axios.create({
    baseURL: 'https://storage.intellectus.app.br',
})