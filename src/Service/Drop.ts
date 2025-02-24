import { axiosClientDrop_api } from '../Lib/Drop_api'
import { ReportPost } from '../Types/postProps'

export const newDrop = async (dropsItens: any) => {
    var res = await axiosClientDrop_api.post('/createReels', dropsItens, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    return res
}


export const getDropsList = async (userId: number) => {
    var res = await axiosClientDrop_api.get(`/getAllReelsUser/${userId}`)
    return res
}

export const getAllUsersDrops = async () => {
    var res = await axiosClientDrop_api.get(`/getReels`)
    return res
}

export const getDrop = async (postId: string) => {
    var res = await axiosClientDrop_api.get(`/getReels/${postId}`);
    return res
};

export const getDropNav = async (postHexId: string) => {
    var res = await axiosClientDrop_api.get(`/getReels/${postHexId}`)
    return res
}

export const deleteDrop = async (postHexId: string) => {

    var res = await axiosClientDrop_api.delete(`/deleteReelsPost`, {
        data: {
            postHexId
        }
    })
    return res
}

export const reportDrops = async (postHexId: string, reason: string) => {
    try {
        var res = await axiosClientDrop_api.post<ReportPost>('/reportReels', {
            postHexId,
            reason
        })
        return res
    } catch (error) {
        console.log('deu ruim ao denunciar Drops.', error)
        throw error
    }
}