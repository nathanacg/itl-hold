export interface ColorsBg {
    color: '#000' | '#004690' | "#dc3545" | "#ffffff" | "#009b36" | "#ffdd00" | "#6c757d" | "#c60094",
    select: boolean,
    text: boolean,
    id: number
}
export interface ResponsePost {
    postHexId: string,
    postId: number
}
export interface StoryFiles {
    fileName: string,
    usage_media: string,
    position: { x: number, y: number },
    scale: number,
    postHexId?: string
}
export interface PrincipalMedia {
    principalMedia: StoryFiles,
    hasSpoiler: boolean
    isClosed: boolean
}