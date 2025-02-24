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

interface PostType {
  postCategorie: string
  postColor: string
  postDate: string
  postEnable: string
  postEvaluation: string
  postHexId: string
  postId: number
  postLegend: string
  postLink: any
  postSpoiler: string
  tmdbMovieId: string
}

export interface Post {
  repostOwner: any;
  userId: number;
  storyId: number;
  postId: number;
  profileImage: string;
  username: string;
  originalPost: {
    medias: MediaInfo[],
    post: PostType
  }
  text: {
    font: null;
    text: null;
    scale: null;
    position: null;
    text_align: null;
    text_color: null;
    background_color: null;
  };
  postHexId: string;
  text_url: {
    url: null;
    scale: null;
    position: null;
    style_type: null;
  };
  users_marcations: null;
  principalMedia: {
    url: string;
    scale: string;
    fileName: string;
    position: { x: number; y: number };
    usage_media: string;
  };
  secondaryMedia: {
    url: null;
    scale: null;
    fileName: null;
    position: null;
    usage_media: null;
  };
  docMedia: {
    url: null;
    scale: null;
    fileName: null;
    position: null;
    usage_media: null;
  };
  music: null;
  emojis: null;
  publicationType: string;
  postLegend: string;
  postColor?: string;
  postSpoiler: 0 | 1;
  isClosed: number;
  postEvaluation: string;
  postCategorie: string;
  postEnable: 0 | 1;
  postDate: string;
  userNickname: string;
  medias: MediaInfo[];
  followingUser: number;
  tmdbMovieId: number | null;
  userName: string;
}
