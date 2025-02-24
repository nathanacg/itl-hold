export interface Folder {
    idFolders: number;
    userId: number;
    isPublic: number;
    foldersName: string;
    story_saved: any;
    post_saved: any;
    reels_saved: any;
    cover_url: {
        mediaUrl: string;
    };
}

export interface Data {
    folders: Folder[];
    message: string;
}

export interface SavedItensGroupsProps {
    navigation: any;
}

export interface IItemFolder {
    userId: number
    profileImage: string
    username: string
    postHexId: string
    principalMedia: PrincipalMedia
}

export interface PrincipalMedia {
    url: string
    scale: string
    fileName: string
    position: Position
    usage_media: string
}

export interface Position {
    x: number
    y: number
}