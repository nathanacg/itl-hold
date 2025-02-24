import { axiosClientpost_api } from '../Lib/Post_api'

export const createAlbum = async (album: any) => {
    var res = await axiosClientpost_api.post('/album/createAlbum', album)
    return res
}