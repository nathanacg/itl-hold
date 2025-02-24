import axios from 'axios'

export const axiosClientNotifications = axios.create({
    baseURL: 'https://notifications.intellectus.app.br',
})