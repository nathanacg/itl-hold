import { create } from 'zustand'

type CreateDestack = {
    title: string
    setTitle: (item: string) => void
    destackCover: any
    setDestackCover: (file: any) => void
    storiesSelected: any[]
    setStoriesSelected: (stories: any) => void
};

const useCreateDestack = create<CreateDestack>((set) => ({
    title: '',
    setTitle: (item: string) => set({title: item}),
    destackCover: {},
    setDestackCover: (file: any) => set({destackCover: file}),
    storiesSelected: [],
    setStoriesSelected: (stories: any) => set({storiesSelected: stories})
}));

export default useCreateDestack