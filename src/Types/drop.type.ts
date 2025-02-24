export interface PrincipalMedia {
  url: string;
  fileName?: string;
  usage_media?: string;
  position?: {
    x: number;
    y: number;
  };
  scale?: number;
}

export interface SecondaryMedia {
  url: string;
  fileName: string;
  usage_media: string;
  position: {
    x: number;
    y: number;
  };
  scale: number;
}

export interface DocMedia {
  url: string;
  fileName: string;
  usage_media: string;
  position: {
    x: number;
    y: number;
  };
  scale: number;
}

export interface DropText {
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

export interface Music {
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

export interface TextUrl {
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

export interface Emoji {
  name: string;
  position: {
    x: number;
    y: number;
  };
  scale: number;
}

export interface DropList {
  postHexId: string;
  userId: number;
  profileImage: string;
  username: string;
  userNickname: string;
  thumbnail: {
    url: string;
  };
  principalMedia: PrincipalMedia;
  secondaryMedia?: SecondaryMedia;
  docMedia?: DocMedia;
  text?: DropText;
  music?: Music;
  text_url?: TextUrl;
  users_marcations?: UserMarcation[];
  emojis?: Emoji[];
}

export interface DropUsersList {
  userName: string;
  userNickname: string;
  profileImage: string;
  userId: number;
}

export interface SendData {
  principalMedia: {
    fileName: string;
    usage_media: string;
    position: { x: number; y: number };
    scale: number;
  };
  text: {};
  music: {};
  text_url: {};
  users_marcations: {
    username: string;
    position: { x: number; y: number };
    scale: number;
  }[];
  emojis: any[];
  docMedia?: {};
  secondaryMedia?: {};
  thumbnail?: {};
}

export interface DropContentProps {
  userId: number;
  id: number;
  postHexId: string;
  createdAt: string;
  postId?: number;
  isNext: boolean;
  video: string;
  userName: string;
  userImage: string;
  userNickname: string;
  handleOptionsModal: () => void;
  handleBottonModal: (type: 'comments' | 'likes') => void;
  handleAutoplay: () => void;
  onEnd?: () => void;
  showInFeed?: boolean;
  indexPositionFeed?: number;
  play: boolean;
  link?: TextUrl;
  text?: DropText;
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
  Iliked: number;
  isSaved: boolean;
  saveDrops: () => void;
  usersLiked: string;
  paddingTop: number;
  activeIndex?: number;
  viewDropsHexId: string;
  setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>;
}
