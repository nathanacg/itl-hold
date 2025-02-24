import { create } from 'zustand';
import { postProps } from '../Types/postProps';

interface propsImageUploaded {
  type: string;
  userId: number;
  marker: string | number;
  id: number;
  userNickname: string;
  key: string | number;
  fileName: string;
  profileImage: string;
  url: string;
  markedUsers: {
    userId?: number;
    name: string;
    address: string;
    positionX: number;
    positionY: number;
  }[];
}

export interface markerUsers {
  image?: string;
  persons?: number[];
}

type createPostProps = {
  post: postProps;
  postHexId: string | null;
  postId: number | null;
  movieSelected:
    | {
        id: number | string;
        name: string;
        description: string;
        image?: string;
      }
    | undefined;
  setPostHexId: (item: string | null) => void;
  setPostId: (item: number | null) => void;
  setPost: (item: postProps) => void;
  files: any;
  setFiles: (file: any) => void;
  imagesUpload: propsImageUploaded[];
  setImagesUpload: (images: propsImageUploaded[]) => void;
  nickName: string;
  setNickName: (nick: string) => void;
  markedPerson: propsImageUploaded[];
  setMarkedPerson: (users: propsImageUploaded[]) => void;
  markedPhoto: markerUsers[];
  setMarkerPhoto: (photo: markerUsers[]) => void;
};

const useCreatePost = create<createPostProps>(set => ({
  post: {
    postCategorie: '',
    postEvaluation: '',
    link: '',
    postLegend: '',
    postColor: '',
    isSaved: false,
    postSpoiler: false,
    isClosed: false,
    surveyOpinion: [
      {
        letter: '',
        text: '',
      },
    ],
    tmdbMovieId: null,
  },
  postId: null,
  postHexId: null,
  movieSelected: undefined,
  setPostHexId: item => set({ postHexId: item }),
  setPostId: item => set({ postId: item }),
  setPost: item => set({ post: item }),
  files: [],
  markedPhoto: [],
  setMarkerPhoto: photoMarker =>
    set({
      markedPhoto: photoMarker,
    }),
  setFiles: file => set({ files: file }),
  imagesUpload: [
    {
      id: 0,
      userId: 0,
      marker: '',
      fileName: '',
      userNickname: '',
      key: '',
      profileImage: '',
      markedUsers: [
        {
          address: '',
          name: '',
          positionX: 0,
          positionY: 0,
        },
      ],
      url: '',
    },
  ],
  setImagesUpload: images => set({ imagesUpload: images }),
  setNickName: nick => set({ nickName: nick }),
  nickName: '',
  markedPerson: [] as propsImageUploaded[],
  setMarkedPerson: users => {
    set({ markedPerson: [] });
    set({ markedPerson: users });
  },
}));

export default useCreatePost;
