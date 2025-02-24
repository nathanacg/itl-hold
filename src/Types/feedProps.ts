import { markerUser } from "./postProps";
import { audio } from "./postProps";
export interface feed {
    postId: number;
    profileImage: string;
    publicationType: string,
    postLegend: string | null;
    postHexId: string;
    markedUsers?: markerUser[]
    postSpoiler: number;
    postEvaluation: string;
    postCategorie: string;
    postEnable: 0 | 1;
    accountConfig: IUserInfoConfig;
    postColor?: string,
    isClosed: 1 | 0
    isSaved?: boolean
    userId: number;
    link?: string;
    postDate: string;
    userNickname: string;
    audio?: audio | null
    medias: medias[];
    followingUser: number
    tmdbMovieId?: number | string | null
}

export interface IUserInfoConfig {
    showVisualizations: boolean
    showLikes: boolean
}

export interface medias {
    idmedias?: number,
    mediaUrl: string,
    mediaName?: string,
    mediaSize?: string,
    mediaType?: string,
    markedUsers?: {
        username: string,
        position: { x: number, y: number }
    }[],
    mediaExtension: string,
    metrics?: number[]

}

export interface MediasArquive {
    idmedias: number,
    markedUsers: string,
    mediaExtension: string,
    mediaName: string,
    mediaSize: number,
    mediaType: string,
}

export interface RootMedia {
    medias: MediaSecundary[]
    post: Post
    postOwner: PostOwner
}

export interface MediaSecundary {
    idmedias: number
    markedUsers: any
    mediaExtension: string
    mediaName: string
    mediaSize: string
    mediaType: string
    mediaUrl: string
}

interface Post {
    link: any
    postCategorie: string
    postColor: any
    postDate: string
    postEnable: string
    postEvaluation: string
    postHexId: string
    postId: number
    postLegend: string
    postSpoiler: string
    tmdbMovieId: any
}

interface PostOwner {
    profileImage: string
    userId: number
    userName: string
    userNickname: string
}
