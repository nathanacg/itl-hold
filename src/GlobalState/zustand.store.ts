import { create } from 'zustand';

export type captureImageStore = {
    captureImage: {
        type: string;
        filename: string;
        filepath: string | null;
        extension: string | null;
        uri?: string | any;
        height: number;
        width: number;
        fileSize: number | null;
        itemId?: number
    }[];
    setCaptureImage: (capture: any) => void;
    addCaptureImage: (image: any) => void
    removeImage: (image: any) => void
    verifyImage: (image: any, callBack: (value: any) => void) => void
    midiaSelectionType: "image" | "video"
    setMidiaSelectionType: (value: "image" | "video") => void
};

const useCaptureImageStore = create<captureImageStore>((set) => ({
    captureImage: [],
    setCaptureImage: (capture) => set({ captureImage: capture }),
    addCaptureImage: (image) => set(pv => ({ captureImage: [...pv.captureImage, image] })),
    removeImage: (image) => set(pv => ({ captureImage: pv.captureImage.filter((item) => item.uri !== image.uri) })),
    midiaSelectionType: "image",
    verifyImage: (image, callBack) => set(pv => {
        callBack(pv.captureImage.findIndex(item => item.uri === image.uri) !== -1)
        return pv
    }),
    setMidiaSelectionType: (value: "image" | "video") => set({ midiaSelectionType: value })
}));


export default useCaptureImageStore;