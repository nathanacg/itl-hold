import { create } from 'zustand';
import { DropList } from '../Types/drop.type';
import { getAllUsersDrops } from '../Service/Drop';
import { Asset } from 'react-native-image-picker';

type useDropsCurrent = {
    dropList: DropList[]
    setDropList: () => void
    forceSetDropList: (list: DropList[]) => void
    videoDrop: Asset
    setVideoDrop: (video: Asset) => void

}


const useDropsCurrent = create<useDropsCurrent>((set) => ({
    dropList: [],
    setDropList: () => {
        getAllUsersDrops()
            .then(res => set({ dropList: res.data }))
            .catch((e) => {
                console.warn('GetAllUsersDrops - CurrentDrops(Zustand)')
                console.log(e)
            })
    },
    forceSetDropList: (list: DropList[]) => set({ dropList: list }),
    videoDrop: {},
    setVideoDrop: (video: Asset) => set({ videoDrop: video }),

}));

export default useDropsCurrent;