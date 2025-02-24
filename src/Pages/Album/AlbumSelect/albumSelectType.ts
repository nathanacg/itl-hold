export interface ArchivedPublication {
     postId: number,
     postLegend: string,
     postHexId: string,
     postSpoiler: number,
     postEvaluation: string,
     postCategorie: string,
     postEnable: string,
     userId: number,
     postDate: number,
     tmdbMovieId: null,
     userName: string,
     userNickname: string,
     profileImage: string,
     medias: [
          {
               idmedias: number,
               mediaUrl: string,
               mediaName: string,
               mediaSize: string,
               mediaType: string,
               markedUsers: null,
               mediaExtension: string
          }
     ]
}

interface Thumbnail {
     url: string;
     scale: string;
     fileName: string;
     position: { x: number; y: number };
     usage_media: string;
}

interface PrincipalMedia {
     url: string;
     scale: string;
     fileName: string;
     position: { x: number; y: number };
     usage_media: string;
}
export interface Post {
     userId: number;
     profileImage: string;
     username: string;
     text: Text;
     postId: number;
     postHexId: string;
     text_url: {
          url: string | null;
          scale: string | null;
          position: string | null;
          style_type: string | null;
     };
     users_marcations: null;
     thumbnail: Thumbnail;
     principalMedia: PrincipalMedia;
     secondaryMedia: {
          url: string | null;
          scale: string | null;
          fileName: string | null;
          position: string | null;
          usage_media: string | null;
     };
     docMedia: {
          url: string | null;
          scale: string | null;
          fileName: string | null;
          position: string | null;
          usage_media: string | null;
     };
     music: null;
     emojis: null;
     postCategorie: string;
}[]