import { IRepost } from "./repost.type";

export interface MediaInfo {
    angle: number;
    duration: number | null;
    idmedias: number;
    markedUsers: null;
    mediaExtension: string;
    mediaName: string;
    mediaSize: string;
    mediaType: string;
    mediaUrl: string;
    metrics: null;
};

export interface PublicationType extends IRepost {
    postId: number;
    publicationType: string;
    isArquivaded: boolean
    profileImage: string;
    postLegend: string;
    postColor?: string;
    postHexId: string;
    link?: string;
    isSaved: boolean
    postSpoiler: number | string;
    isClosed: number;
    postEvaluation: string;
    postCategorie: string;
    postEnable: 0 | 1;
    userId: number;
    postDate: string;
    userNickname: string;
    medias: MediaInfo[];
    followingUser: number;
    tmdbMovieId: number | null;
    userName: string;
}