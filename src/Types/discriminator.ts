import { medias } from "../Types/feedProps"
import { markerUser } from "./postProps";

export interface AllTypesPostsFeed {
    user: ArrayLike<any> | null | undefined
    postId: number;
    profileImage: string;
    publicationType: string,
    postColor?: string
    link?: string,
    audio: {
        duration: number,
        mediaUrl: string,
        idAudConfig: number,
        configAudTime: number,
        configAudMetrics: string
    },
    postLegend: string | null;
    postHexId: string;
    postSpoiler: number | string;
    markedUsers?: markerUser[]
    postEvaluation: string;
    postCategorie: string;
    postEnable: 1;
    show_likes: boolean;
    isSaved: boolean
    isArquived: boolean
    show_visualizations: boolean;
    isClosed: 1 | 0;
    userId: number;
    username: string,
    postDate: string;
    tmdbMovieId: number | null;
    userNickname: string;
    medias: medias[];
    followingUser: number
    commentsCount: number,
    likesCount: number,
    viewsCount: number,
    Iliked: number,
    usersLiked: string
    thumbnail: {
        url: string,
        scale: number,
        fileName: string,
        position: {
            x: number,
            y: number
        },
        usage_media: string
    },
    principalMedia: {
        url: string,
        scale: number,
        fileName: string,
        position: {
            x: number,
            y: number
        },
        usage_media: string
    },
    users: {
        userId: number,
        userName: string,
        userNickname: string,
        profileImage: string,
        followingUser: number
    }[],
    repostDataValue: {
        repostId: number
        postLegend: string
        repostHexId: string
        postHexId: string
        userId: number
        postDate: string
        visualizators_post: string[]
        archived: number
    }[],
    originalPost: {
        post: {
            postId: number,
            postDate: string,
            postColor?: string,
            isClosed: number,
            postHexId: string,
            postEnable: string,
            postLegend: string,
            postSpoiler: string,
            tmdbMovieId: string,
            postCategorie: string,
            postEvaluation: string,
            link: string | null
        },
        medias: medias[],
        postOwner: {
            userId: number,
            profileImage: string,
            userNickname: string,
            userName: string,
        },
    },
    repostOwner: {
        userId: number,
        audio: {
            mediaUrl: string | null
        }
        profileImage: string,
        userNickname: string,
        userName: string,
        repostId: number,
        repostHexId: string,
        repostLegend?: string
        postDate: string,
        isClosed: number
        postEvaluation?: string
    },
    Reposts: {
        userNickname: string
        profileImage: string
        followingUser: number
        medias: medias[],
        postLegend: string,
        avaliationPost?: string,
        postActions: boolean
        hasSpoiler?: boolean
        isClosed: number
        handleOpenBottomModal?: (type: 'comments' | 'likes') => void
        paddingTop?: string
        postHexId: string
        userId: number
        postDate: string
        tmdbMovieId: number | null
        postId: number
        isArquivaded?: void
        isSaved: boolean
        mediaImage?: any
        postEvaluation: string
        postSpoiler: string
    }[]
}