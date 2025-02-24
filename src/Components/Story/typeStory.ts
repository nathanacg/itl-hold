interface mediaType {
  url: string | any;
  scale: string | null;
  fileName: string | null;
  position: {
    x: number | null;
    y: number | null;
  } | null;
  usage_media: string | null;
}

export interface StoryModalProps {
  isModalVisible: boolean;
  // onClose: () => void;
  // stories: story[];
}

export interface story {
  userId: number;
  createdAt: string;
  profileImage: string;
  postLegend?: string;
  postColor?: string;
  username: string;
  hasSpoiler: number;
  text: {
    font: string;
    text: string;
    scale: string;
    position: {
      x: number;
      y: number;
    };
    text_align: string;
    text_color: string;
    background_color: string;
  };
  postHexId: string;
  text_url: {
    url: string;
    scale: string;
    position: {
      x: number | null;
      y: number | null;
    };
    style_type: string;
  };
  users_marcations: {
    scale: string;
    position: {
      x: number | null;
      y: number | null;
    };
    username: string;
  }[];
  principalMedia: mediaType;
  secondaryMedia: mediaType;
  docMedia: mediaType;
  music: {
    time: {
      end: number;
      start: number;
    };
    scale: string;
    position: {
      x: number | null;
      y: number | null;
    };
    music_url: string;
    style_type: string;
  };
  emojis: {
    name: string;
    scale: string;
    position: {
      x: number | null;
      y: number | null;
    };
  }[];
}
