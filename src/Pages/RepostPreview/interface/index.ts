export interface ColorsBg {
    color: '#007bff' | "#dc3545" | "#000000" | "#17a2b8" | "#343a40" | "#6c757d",
    select: boolean,
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
    principalMedia: StoryFiles
}