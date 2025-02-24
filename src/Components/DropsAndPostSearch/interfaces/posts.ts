export interface Posts {
  publicationType: string
  medias: [
    {
      angle: number | null;
      idmedias: number;
      markedUsers: {
        username: string,
        userNickname: string,
        position: { x: number, y: number },
        idmarcations: number
      }[];
      mediaExtension: string;
      mediaName: string;
      mediaSize: string;
      mediaType: string;
      mediaUrl: string;
    }
  ];
  accountConfig: {
    showLikes: boolean
    showVisualizations: boolean
  }
  isClosed: 0 | 1,
  isSaved: boolean,
  followingUser: number
  postCategorie: string;
  postDate: string;
  postColor?: string
  postEnable: 0 | 1;
  postEvaluation: string;
  postHexId: string;
  postId: number;
  postLegend: string;
  postSpoiler: number;
  profileImage: string;
  tmdbMovieId: number;
  userId: number;
  userName: string;
  userNickname: string;
}