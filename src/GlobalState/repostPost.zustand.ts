import { create } from 'zustand';
import { Repost } from '../Types/repost.type';

type RepostPubliState = {
     repost: Repost | null,
     setRepost: (newRepost: Repost) => void;
}

const useRepostPubli = create<RepostPubliState>((set) => ({
     repost: null,
     setRepost: (newRepost: Repost) => set({ repost: newRepost }),
}));

export default useRepostPubli;