import axios from 'axios'

export const axiosItensManager_api = axios.create({
    baseURL: 'https://itemsmanager.intellectus.app.br',
})