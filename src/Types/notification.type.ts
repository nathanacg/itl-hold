export interface FbToken {
    fbId?: number,
    fbToken: string,
    fbUserId: number,
    platform?: string,
    apnToken?: string | null
}

export interface NotificationLikePost {
    postHexId: string,
    fbUserId: number,
}

export interface NotificationLikeDrop {
    postHexId: string,
    fbUserId: number,
}

export interface NotificationLikeCartaz {
    postHexId: string,
    fbUserId: number,
}

export interface TypeNotification {
    type?: "LIKED_POST" | "CHAT_MESSAGE" | "COMMENT_POST" | "LIKE_AWNSER" | "FOLLOW" | "RESPONSE_COMMENT" | "LIKED_COMMENT" | "LIKED_DROP" | "LIKED_CARTAZ" | "CALLING" | "FOLLOWER" | "REQUEST_MARCATION",
    postHexId?: string
    user?: number
    userNickname?: string
    channelToken?: string
    channel?: string
    chatParticipantUserId?: number
    userId?: number
}

export interface NotificationMessage {
    messageCummomId: string,
    chatRoomId: string,
    userId: number,
}

export interface NotificationCommentPost {
    commentId: number
    postHexId: string
    userId: number
    response: boolean
}

export interface NotificationLikeComment {
    commentId: number,
    userId: number,
    isAnswer: boolean
}

export interface NotificationFollower {
    fbUserId: number,
    userId: number,
}

export interface NotificationFollowerReq {
    fbUserId: number,
    userId: number,
}

export interface NotificationJoinRoom {
    userId: number,
    roomId: number
}

export interface NotificationCalling {
    fbUserId: number,
    ownerUserId: number,
    token: string,
    channel: string
}

export interface NotificationMarcation {
    fbUserId: number
    postHexId: string
}