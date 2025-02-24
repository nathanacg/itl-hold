import { create } from 'zustand';

type useCreateComment = {
    commentId: number
    setCommentId: (id: number) => void
    reloadComments: boolean
    setReloadComment:  (value: boolean) => void
    commentType: 'comentary' | 'answer',
    setCommentType: (value: 'comentary' | 'answer') => void
}


const useCreateComment = create<useCreateComment>((set) => ({
    commentId: 0,
    setCommentId: (id: number) => set({ commentId: id }),
    commentType: 'comentary',
    setCommentType: (value:  'comentary' | 'answer') => set({ commentType: value }),
    reloadComments: false,
    setReloadComment:  (value: boolean) => set({ reloadComments: value }),
}));


export default useCreateComment;