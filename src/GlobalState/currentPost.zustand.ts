import { create } from 'zustand';

type  useCreatePostCurrent = {
    postId: string
    setPostId: (item: string) => void
}

const useCreatePostCurrent = create<useCreatePostCurrent>((set) => ({
    postId: "",
    setPostId: (item: string) => set({ postId: item }),
}));


export default useCreatePostCurrent;