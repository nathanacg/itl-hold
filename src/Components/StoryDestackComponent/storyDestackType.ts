export interface Post {
     userId: number;
     profileImage: string;
     username: string;
     text: Text;
     postHexId: string;
     text_url: TextUrl;
     users_marcations: any;
     principalMedia: Media;
     secondaryMedia: Media;
     docMedia: Media;
     music: any;
     emojis: any;
}

interface Text {
     font: string | null;
     text: string | null;
     scale: number | null;
     position: { x: number; y: number } | null;
     text_align: string | null;
     text_color: string | null;
     background_color: string | null;
}

interface TextUrl {
     url: string | null;
     scale: number | null;
     position: { x: number; y: number } | null;
     style_type: string | null;
}

interface Media {
     url: string | null;
     scale: string | null;
     fileName: string | null;
     position: { x: number; y: number } | null;
     usage_media: string | null;
}