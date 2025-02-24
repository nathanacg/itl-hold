import axios from 'axios'

export const axiosClientProfile_api = axios.create({
    baseURL: 'https://profile.intellectus.app.br',
})