import { create } from 'zustand';


type FeedPosition = {
    isOnFeed: boolean;
    setIsOnFeed: (value: boolean) => void;
    goToTop: boolean
    setGoToTop: (value: boolean) => void;

};

const useFeedPostion = create<FeedPosition>((set) => ({
    isOnFeed: false,
    setIsOnFeed: (value: boolean) => set({isOnFeed: value}),
    goToTop: false,
    setGoToTop: (value: boolean) => set({goToTop: value})
}));


export default useFeedPostion;