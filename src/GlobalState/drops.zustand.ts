import { create } from 'zustand';
import { getAllUsersDrops } from '../Service/Drop';

export interface reels {
  userId: number;
  index: number;
  likesCount: number;
  viewsCount: number;
  idreels: number;
  /*  docMedia: {
     url: string
       fileName: string;
       usage_media: string;
       position: {
           x: number;
           y: number;
       };
       scale: number;
     } */
  profileImage: string;
  username: string;
  userNickname: string;
  postHexId: string;
  commentsCount: number;
  Iliked: number;
  isSaved: boolean;
  usersLiked: string;
  /*     thumbnail: {
            url: string
            scale?: number
            fileName?: string
            position?: {
                x: number
                y: number
            },
            usage_media?: string
        }, */
  principalMedia: {
    url: string;
    scale?: number;
    fileName?: string;
    position?: {
      x: number;
      y: number;
    };
    usage_media?: string;
  };
}

type dropsStore = {
  dropsList: reels[];
  drop: reels | null;
  loadingDrops: boolean;
  setDrop: (item: reels | null) => void;
  setDropsList: (item: any) => void;
  getAllDrops: () => Promise<void>;
  setInitialDrop: (drop: reels) => void;
  removeDropFromList: (postHexId: string) => void;
};

const useDropsStore = create<dropsStore>(set => ({
  dropsList: [],
  drop: null,
  loadingDrops: true,
  removeDropFromList: postHexId =>
    set(pv => ({
      dropsList: pv.dropsList.filter(drop => drop.postHexId !== postHexId),
    })),
  setDrop: item => set({ drop: item }),
  setDropsList: item => set({ dropsList: item }),
  getAllDrops: async () => {
    try {
      const response = await getAllUsersDrops();
      set(pv => ({ dropsList: [...response.data], loadingDrops: false }));
    } catch (error) {
      console.warn('GetAllUsersDrops - Drops(Zustand)');
      console.log(error);
    }

    /*  .then(res => {

         })
         .catch((e) => {
             console.warn('GetAllUsersDrops - Drops(Zustand)')
             console.log(e)
         }) */
  },
  setInitialDrop: drop =>
    set(pv => {
      if (pv.dropsList.length > 0) {
        if (pv.dropsList[0].postHexId != drop.postHexId) {
          return { dropsList: [drop, ...pv.dropsList] };
        } else {
          return {};
        }
      } else {
        return { dropsList: [drop] };
      }
    }),
}));

export default useDropsStore;
