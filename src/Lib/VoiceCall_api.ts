import axios from 'axios'

export const apiClientVoiceCall = axios.create({
    baseURL: 'https://chat.intellectus.app.br/rtc'
})