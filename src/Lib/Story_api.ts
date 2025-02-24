import axios from 'axios'

export const axiosClientStory_api = axios.create({

    baseURL: 'https://stories.intellectus.app.br',
})