export interface Drops {
  publicationType: string;
  userId: number;
  profileImage: string;
  userNickname: string;
  userName: string;
  postDate: string;
  commentsCount: number;
  likes: number;
  text: {
    font: any;
    text: any;
    scale: any;
    position: any;
    text_align: any;
    text_color: any;
    background_color: any;
  };
  postHexId: string;
  text_url: {
    url: any;
    scale: any;
    position: any;
    style_type: any;
  };
  users_marcations: any;
  principalMedia: {
    url: string;
    scale: string;
    fileName: string;
    position: {
      x: number;
      y: number;
    };
    usage_media: string;
  };
  thumbnail: {
    url: any;
    scale: any;
    fileName: any;
    position: any;
    usage_media: any;
  };
  secondaryMedia: {
    url: any;
    scale: any;
    fileName: any;
    position: any;
    usage_media: any;
  };
  docMedia: {
    url: any;
    scale: any;
    fileName: any;
    position: any;
    usage_media: any;
  };
  music: any;
  emojis: any;
}