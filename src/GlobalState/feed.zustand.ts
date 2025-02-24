import { create } from 'zustand';
import { feed } from '../Types/feedProps';
import { getFeed } from '../Service/Feed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearStorage } from '../Lib/asyncStorage';

type FeedData = {
  feedList: feed[];
  loadingFeed: boolean;
  currentContentInViewHexId: string;
  setCurrentContentInViewHexId: (hexId: string) => void;
  initializeFeed: (resetCache?: boolean) => Promise<void>;
  incrementFeed: (post: feed) => void;
  removePostFromList: (postHexId: string) => void;
};

const useFeedData = create<FeedData>(set => ({
  feedList: [],
  loadingFeed: true,
  currentContentInViewHexId: '',
  removePostFromList: (postHexId: string) => {
    set(prev => ({
      feedList: prev.feedList.filter(post => post.postHexId !== postHexId),
    }));
  },
  setCurrentContentInViewHexId: (hexId: string) => {
    set({ currentContentInViewHexId: hexId });
  },
  initializeFeed: async (resetCache = false) => {
    try {
      set({ loadingFeed: true });
      if (resetCache) {
        await AsyncStorage.removeItem('@feedUser');
      }
      const feed = await AsyncStorage.getItem('@feedUser');

      const response = await getFeed();
      const feedData = feed ? JSON.parse(feed) : response.data.feed;
      console.log(
        '======> Initialize FEEDLIST',
        feedData.filter(item => item.publicationType === 'drops').length,
      );
      await AsyncStorage.setItem('@feedUser', JSON.stringify(feedData));

      set({
        feedList: feedData,
        loadingFeed: false,
      });
    } catch (error) {
      await clearStorage();

      console.warn('InitializeFeed - Feed(Zustand)');
      console.log(error);
    }
  },

  incrementFeed: (post: feed) => {
    set(prev => ({ feedList: [post, ...prev.feedList] }));
  },
}));

export default useFeedData;
