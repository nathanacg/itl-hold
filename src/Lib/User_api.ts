import axios from 'axios'

export const axiosUser_api = axios.create({
    baseURL: 'https://user.intellectus.app.br',
})