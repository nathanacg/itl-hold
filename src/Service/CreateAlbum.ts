import { axiosClientProfile_api } from '../Lib/Profile_api'

export const newAlbum = async () => {
    var res = await axiosClientProfile_api.post(`/album/createAlbum`)
    return res
}