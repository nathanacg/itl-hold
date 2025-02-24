interface PrincipalMedia {
    url: string
    fileName: string;
    usage_media: string;
    position: {
        x: number;
        y: number;
    };
    scale: number;
}

interface SecondaryMedia {
    fileName: string;
    usage_media: string;
    position: {
        x: number;
        y: number;
    };
    scale: number;
}

interface DocMedia {
    fileName: string;
    usage_media: string;
    position: {
        x: number;
        y: number;
    };
    scale: number;
}

interface Text {
    text: string;
    font: string;
    text_align: string;
    text_color: string;
    background_color: string;
    scale: number;
    position: {
        x: number;
        y: number;
    };
}

interface Music {
    music_url: string;
    time: {
        start: number;
        end: number;
    };
    style_type: string;
    scale: number;
    position: {
        x: number;
        y: number;
    };
}

interface TextUrl {
    url: string;
    position: {
        x: number;
        y: number;
    };
    scale: number;
    style_type: string;
}

export interface UserMarcation {
    username: string;
    position: {
        x: number;
        y: number;
    };
    scale: number;
}

interface Emoji {
    name: string;
    position: {
        x: number;
        y: number;
    };
    scale: number;
}

export interface StoryList {
    postHexId: string
    principalMedia: PrincipalMedia;
    secondaryMedia?: SecondaryMedia;
    docMedia: DocMedia;
    text: Text;
    music: Music;
    text_url: TextUrl;
    users_marcations: UserMarcation[];
    emojis: Emoji[];
}

