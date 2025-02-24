import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { create } from 'zustand';
import { getPhotosDevice } from '../Utils/React-native-camera-row';

type GaleryData = {
    imagesList: PhotoIdentifier[]
    videosList: PhotoIdentifier[]
    allList: PhotoIdentifier[]
    setImageList: (newList: PhotoIdentifier[]) => void
    setVideosList: (newList: PhotoIdentifier[]) => void
    setAllList: (newList: PhotoIdentifier[]) => void
    initializeGalery: () => void
}

const useGaleryData = create<GaleryData>((set) => ({
    imagesList: [],
    videosList: [],
    allList: [],
    setImageList: (newList: PhotoIdentifier[]) => set({ imagesList: newList }),
    setVideosList: (newList: PhotoIdentifier[]) => set({ videosList: newList }),
    setAllList: (newList: PhotoIdentifier[]) => set({ allList: newList }),
    initializeGalery: async () => {
        await getPhotosDevice({
            assetType: "All", setPhotos: (result: PhotoIdentifier[]) => {
                set({
                    imagesList: result.filter(img => img.node.type.includes("image")),
                    videosList: result.filter(video => video.node.type.includes("video")),
                    allList: result
                })
            }
        })
    }
}));


export default useGaleryData;