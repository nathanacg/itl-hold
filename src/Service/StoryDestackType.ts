interface Media {
  idmedias: number;
  markedUsers: null;
  mediaExtension: string;
  mediaName: string;
  mediaSize: string;
  mediaType: string;
  mediaUrl: string;
}

export interface Post {
  audio: null;
  createdAt: string;
  id: number;
  markedUsers: null;
  medias: Media[];
  postCategorie: string;
  postColor: null;
  postDate: string;
  postEnable: string;
  postEvaluation: string;
  postHexId: string;
  postId: number;
  postLegend: string;
  postSpoiler: string;
  profileImage: string;
  publicationType: string;
  show_likes: number;
  show_visualizations: number;
  tmdbMovieId: string;
  userId: number;
  userName: string;
  userNickname: string;
}

interface DocMedia {
  fileName: null;
  position: null;
  scale: null;
  url: null;
  usage_media: null;
}

interface Music {
  music_url: null;
  position: null;
  scale: null;
  style_type: null;
  time: null;
}

interface PrincipalMedia {
  fileName: string;
  position: { x: null; y: null };
  scale: string;
  url: string;
  usage_media: string;
}

interface SecondaryMedia {
  fileName: null;
  position: null;
  scale: null;
  url: null;
  usage_media: null;
}

interface Text {
  background_color: null;
  font: null;
  position: null;
  scale: null;
  text: null;
  text_align: null;
  text_color: null;
}

interface TextUrl {
  position: null;
  scale: null;
  style_type: null;
  url: null;
}

export interface StoryAndPost {
  createdAt: string;
  docMedia: DocMedia;
  emojis: null;
  id: number;
  postId: number;
  storyId: number;
  originalPost: {
    medias: Media[],
    post: [Object],
    postOwner: [Object]
  }
  music: Music;
  postHexId: string;
  principalMedia: PrincipalMedia;
  profileImage: string;
  publicationType: string;
  reported: number;
  secondaryMedia: SecondaryMedia;
  text: Text;
  text_url: TextUrl;
  userId: number;
  username: string;
  users_marcations: null;
  medias: Media[];
  audio: null;
  markedUsers: null;
  postCategorie: string;
  postColor: string;
  postDate: string;
  postEnable: string;
  postEvaluation: string;
  postLegend: string;
  postSpoiler: string;
  show_likes: number;
  show_visualizations: number;
  tmdbMovieId: string;
  userName: string;
  userNickname: string;
}