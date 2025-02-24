export interface RoomsList {
  room_id: number;
  room_name: string;
  image: string;
  description: string;
  participants: string[];
  roomImage: string;
}

export interface IRoom {
  room_id: number
  room_name: string
  categories: string
  description: string
  created_at: string
  updated_at: string
  public: number
  movies: number
  series: number
  books: number
  musics: number
  duration: {
    start_datetime: string
    end_datetime: string
  }[]
  temporaryRoom: string
  articles: number
  podcasts: number
  image: string
  userId: number
  active: number
  userName: string
  userNickname: string
  profileImage: string
  numMembers: number
}

export interface RoomType {
  active: number,
  articles: number,
  books: number,
  categories: string,
  channel: {
    channelName: string,
    privilegeExpireTime: number,
    role: number,
    token: string,
    uid: number
  },
  created_at: string,
  description: string,
  duration: {
    end_datetime: string,
    start_datetime: string
  }[],
  image: string
  movies: number,
  musics: number,
  numMembers: number,
  podcasts: number,
  profileImage: string,
  public: number,
  room_id: number,
  room_name: string,
  series: number,
  temporaryRoom: "true" | "false",
  updated_at: Date,
  userId: number,
  userName: string,
  userNickname: string
}