
import { axiosClientmusic_api } from '../Lib/musicAPI';
import { IMusicResponse } from '../Types/Music';


const getBySearchMusic = async (name: string, token: string) => {
    try {
        const { data } = await axiosClientmusic_api.get<IMusicResponse>(`search?q=${encodeURI(name)}&type=track&market=BR`, {
            headers: {
                Authorization: `Bearer ${token}`
            }

        })
        return data.tracks.items

    } catch (error) {
        return error
    }
}

export {
    getBySearchMusic,
}