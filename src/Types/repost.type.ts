export interface Repost {
     postId: number,
     postHexId: string,
     userId: number,
     mediaImage: string,
     userImage: string,
     userNickname: string,
     time: string,
     legend: string,
     audioPath?: string
}

export interface IRepost {
     publicationType: string
     originalPost: IOriginalPost
     repostOwner: IRepostOwner
}

export interface IOriginalPost {
     post: IPost
     medias: IMedia[]
     postOwner: IPostOwner
}

export interface IPost {
     postId: number
     postDate: string
     postColor: any
     postHexId: string
     postEnable: string
     postLegend: string
     postSpoiler: string
     tmdbMovieId: string
     postCategorie: string
     postEvaluation: string
}

export interface IMedia {
     idmedias: number
     mediaUrl: string
     mediaName: string
     mediaSize: string
     mediaType: string
     markedUsers: any
     mediaExtension: string
}

export interface IPostOwner {
     userId: number
     userName: string
     profileImage: string
     userNickname: string
}

export interface IRepostOwner {
     userId: number
     postDate: string
     repostId: number
     userName: string
     repostHexId: string
     profileImage: string
     repostLegend: string
     userNickname: string
}