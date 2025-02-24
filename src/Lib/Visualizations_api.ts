import axios from 'axios'

export const axiosClientVisualizations = axios.create({
    baseURL: 'https://visualization.intellectus.app.br',
})