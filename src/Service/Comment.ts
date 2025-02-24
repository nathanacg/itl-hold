import { axiosClientpost_api } from '../Lib/Post_api'

export const newComment = async (postComment: { postHexId: string, commentText: string, marcations: number[] }) => {
    var res = await axiosClientpost_api.post('/comment/createComment', postComment)
    return res
}

export const deleteComment = async (commentId: string) => {
    var res = await axiosClientpost_api.delete('/comment/deleteComment', {
        data: { commentId }
    })
    return res
}

export const getComments = async (postHexId: string) => {
    var res = await axiosClientpost_api.get(`/comment/getAllComment/${postHexId}`);
    return res
}

export const getAnswers = async (commentId: number) => {
    var res = await axiosClientpost_api.get(`/comment/getAllSecCommented/${commentId}`)
    return res
}

export const newAnswer = async (commentAnswer: { postHexId: string, commentText: string, commentedId: number }) => {
    var res = await axiosClientpost_api.post('/comment/createCommented', commentAnswer)
    return res
}