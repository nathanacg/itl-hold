import { axiosClientMediaApi } from '../Lib/Media_api'
import { axiosClientpost_api } from '../Lib/Post_api'
import { axiosSpotfyRequisition_api } from '../Lib/musicAPI'
import { MovieListResponse, ReportPost, markedUserProps, postProps, postUpdateProps } from '../Types/postProps'
import { MovieData, SerieData } from '../Pages/MoreDetails/interface/types'
import { BookData } from '../Pages/MoreDetailsBooks/interface/types'
import { MusicData } from '../Pages/MoreDetailsMusic/interface/types'
import { axiosBooks_api } from '../Lib/booksAPI'


export const newPost = async (post: postProps) => {
    var res = await axiosClientpost_api.post('/post/createPost', post)
    return res
}

export const newRoomPost = async (post: postProps) => {
    var res = await axiosClientpost_api.post('/post/createRoomPost', post)
    return res
}

export const createMarcation = async (marcationList: markedUserProps) => {
    var res = await axiosClientpost_api.post('/post/createMarcation', marcationList)
    return res
}

export const uploadMedias = async (files: any) => {
    try {
        const res = await axiosClientMediaApi.post('/upload', files, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return res
    } catch (e) {
        console.log(e)
    }
}

export const updatePost = async (postUpdate: postUpdateProps) => {
    var res = await axiosClientpost_api.put('/post/editPost', postUpdate)
    return res
}

export const deletePost = async (postHexId: string) => {
    return await axiosClientpost_api.delete('/post/deletePost', {
        data: {
            postHexId
        }
    })
}

export const deleteRepost = async (repostHexId: string) => {
    return await axiosClientpost_api.delete('/post/deleteRepost', {
        data: {
            repostHexId
        }
    })
}

export const getPost = async (postHexId: string) => {
    var res = await axiosClientpost_api.get(`/post/listPost/${postHexId}`)
    return res
}

export const getHasAudioPost = async (postHexId: string) => {
    var res = await axiosClientpost_api.get(`/post/getAudioPost/${postHexId}`)
    return res
}

export const getMoviesList = async (movie: string) => {
    return await axiosClientpost_api.get<MovieListResponse>(`/tmdb/search?movie=${movie}`)
}

export const getMovie = async (movie: number) => {
    return await axiosClientpost_api.get<MovieData>(`/tmdb/filmeId=${movie}`)
}

export const getSerie = async (serie: number) => {
    return await axiosClientpost_api.get<SerieData>(`/tmdb/serieId=${serie}`)
}

export const getMusic = async (music: string) => {
    return await axiosClientpost_api.get<MusicData>(`/spotify/musicId=${music}`)
}

export const getBook = async (book: string) => {
    // return await axiosClientpost_api.get(`/book/bookId=${book}`)
    return await axiosBooks_api.get(book)

}


export const getSearchExplorer = async () => {
    try {
        var res = await axiosClientpost_api.get(`/post/listPostsExplore`)
        return res
    } catch (e) {
        console.log(e)
    }
}

export const getSearchExplorerv2 = async () => {
    try {
        var res = await axiosClientpost_api.get(`/post/listPostsExploreV2`)
        return res
    } catch (e) {
        console.log(e)
    }
}

export const repostPublication = async (postLegend: string, postHexId: string, postId: number) => {
    const response = await axiosClientpost_api.post('/post/createRepost', { postLegend, postHexId, postId })
    return response.data
}

export const repostPublicationWithAudio = async (postHexId: string, postId: number, file: FormData) => {
    const response = await axiosClientpost_api.post('/post/createRepostWithAudio', { postHexId, postId, file }, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    return response.data
}

export const getAccessTokenSpotfy = async () => {
    try {
        const response = await axiosSpotfyRequisition_api.post('', null, {
            params: {
                grant_type: 'client_credentials',
                client_id: '74199a00f2d0428d9352e6bef9d785cb',
                client_secret: '7e24d265887d419a892af589d51d9ac1',
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Erro ao obter token de acesso:', error);
        throw error;
    }
}

export const reportPost = async (postHexId: string, reason: string) => {
    try {
        const response = await axiosClientpost_api.post<ReportPost>('/post/reportPost', {
            postHexId,
            reason
        })
        return response
    } catch (error) {
        console.error("Deu ruim ao reportar a publicação.", error)
        throw error
    }
}

export const listAbleToMarcations = async () => {
    var res = await axiosClientpost_api.get(`/post/listAbleToMarcation`)
    return res
}

export const actionPendingMarcation = async (idmarcations: number, choice: number) => {
    var res = await axiosClientpost_api.patch('/post/resolvePendingMarcation/', {
        idmarcations,
        choice
    }
    )
    return res
}

