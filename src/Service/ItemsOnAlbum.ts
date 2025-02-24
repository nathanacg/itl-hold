import { axiosClientProfile_api } from "../Lib/Profile_api";
import { getStoreItem } from "../Lib/asyncStorage";


export const saveAlbumContent = async (userId: number, albumId: number, postId: number) => {
    try {
        const token = await getStoreItem("@intellectus:tokenUser");
        const res = await axiosClientProfile_api.post(`/saveAlbumContent/post`, { userId, albumId, postId }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
        });
        return res;
    } catch (error) {

    }
};

export const saveAlbumContentDrops = async (userId: number, albumId: number, postHexId: string) => {
    try {
        const token = await getStoreItem("@intellectus:tokenUser");
        const res = await axiosClientProfile_api.post(`/saveAlbumContent/reels`, { userId, albumId, postHexId }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
        });
        return res.data;
    } catch (error) {
        
    }
};

export const getAlbumPost = async (albumId: number, postId: number) => {
    try {
        const res = await axiosClientProfile_api.get(`/getAlbumContent/post/${albumId}/${postId}`)
        return res
    } catch (e) {
        console.log('error: ', e)
    }
}

export const getAlbumDrops = async (albumId: number, postId: number) => {
    try {
        const res = await axiosClientProfile_api.get(`/getAlbumContent/reels/${albumId}/${postId}`)
        return res
    } catch (e) {
        console.log('error: ', e)
    }
}

export const deleteAlbumPost = async (userId: number, albumId: number, postId: number) => {
    try {
        const res = await axiosClientProfile_api.delete('/removeAlbumContent/post', {
            data: {
                userId: userId,
                albumId: albumId,
                postId: postId
            },
        })
        return res;
    } catch (e) {
        console.log('DeleteAlbumPost - ItemsOnAlbum')
        console.log(e)
    }
}

export const deleteAlbumDrops = async (userId: number, albumId: number, postHexId: string) => {
    var token = await getStoreItem("@intellectus:tokenUser")
    try{
        const res = await axiosClientProfile_api.delete('/removeAlbumContent/reels', {
            data: {
                userId: userId,
                albumId: albumId,
                postHexId: postHexId
            },
            headers: {
                Authorization: `${token}`
            }
        })
        return res;
    } catch (e) {
    }
}