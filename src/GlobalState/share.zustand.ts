import { create } from 'zustand';


type ShareProps = {
    shareAudio: string | null;
    setShareAudio: (uri: string | null) => void;
};

export const useShare = create<ShareProps>((set) => ({
    shareAudio: null,
    setShareAudio: (uri) => set({ shareAudio: uri }),
}));