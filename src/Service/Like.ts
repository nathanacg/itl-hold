import { axiosClientpost_api } from '../Lib/Post_api'

export const newLike = async (postId: { postHexId: string }) => {
    var res = await axiosClientpost_api.post('/like/liked', postId)
    return res
}

export const deleteLike = async (postId: { postHexId: string }) => {
    var res = await axiosClientpost_api.delete('/like/unliked', {
        data: postId,
    })
    return res
}

export const getLikes = async (postHexId: string) => {
    var res = await axiosClientpost_api.get(`/like/listUsersLikedPostHexId/${postHexId}`)
    return res
}


export const newCommentLike = async (commentId: number) => {
    var res = await axiosClientpost_api.post('/like/liked', { commentId })
    return res
}

export const deleteCommentLike = async (commentId: number) => {
    var res = await axiosClientpost_api.delete('/like/unliked', {
        data: { commentId }
    })
    return res
}

export const getCommentLikes = async (commentId: number) => {
    var response = await axiosClientpost_api.get(`/like/listUsersLikedCommentId/${commentId}`)
    return response
}