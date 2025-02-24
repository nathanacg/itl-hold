import { create } from 'zustand';

interface userProps{
    userName: string,
    userEmail: string,
    userNickname: string,
    profileImage: string,
}

type captureImageStore = {
    user: userProps;
    setUser: (item: userProps) => void;
};

const useCaptureImageStore = create<captureImageStore>((set) => ({
    user: {
        profileImage:'',
        userEmail:'',
        userName:'',
        userNickname:''
    },
    setUser: (item) => set({ user: item }),
}));


export default useCaptureImageStore;