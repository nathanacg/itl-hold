import { axiosClientMediaApi } from '../Lib/Media_api'

export const createAlbumAdd = async (form: FormData) => {
    try {
        var res = await axiosClientMediaApi.post("/createAlbum", form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return res
    } catch (e) {
        console.log(e)
    }
}

export const getUserAlbuns = async (userId: number) => {
    try {
        const response = await axiosClientMediaApi.get(`/getAlbuns/${userId}`)
        return response
    } catch (error) {
        throw error
    }
}

export const delAlbum = async (albumId: number) => {
    try {
        var res = await axiosClientMediaApi.delete(`/deleteAlbum`, {
            data: { albumId }
        })
        return res
    } catch (e) {
        console.warn("quebrou ao deletar album", e)
    }
}

export const updateAlbum = async (form: FormData) => {
    try {
        var res = await axiosClientMediaApi.put("/updateAlbum", form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return res
    } catch (e) {
        console.log('Error: ', e)
    }
}

export const updatePrivacyAlbum = async (isPublic: number, idFolders: number) => {
    var res = await axiosClientMediaApi.patch(`/setFolderPrivacy`, {
        isPublic,
        idFolders
    })
    return res
}