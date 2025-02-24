import { axiosClientNotifications } from '../Lib/notifications_api'


export const getAllNotifications = async (page: number) => {
    var res = await axiosClientNotifications.get(`/getAllNotifications?page=${page}&limit=20`)
    return res
}