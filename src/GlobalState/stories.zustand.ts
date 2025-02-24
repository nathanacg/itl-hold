import { create } from 'zustand';
import { story } from '../Components/Story/typeStory';
import {
  getStoryFollowingUsers,
  getUserStories,
  gethiddenStoryPerson,
} from '../Service/Story';
// import { getVideoDurationInSeconds } from 'get-video-duration';

type StoriesProfiles = {
  profileImage: string;
  userId: number;
  userName: string;
  userNickname: string;
};

type useStories = {
  initialStoryIndex: number;
  setInitialStoryIndex: (index: number) => void;
  currentStory: story[];
  setCurrentStory: (stories: story[]) => void;
  isModalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  storyDuration: number;
  setStoryDuration: (value: number) => void;
  friendsStories: StoriesProfiles[];
  hasStory: boolean;
  setHasStory: (bool: boolean) => void;
  currentStoryIndex: number;
  setCurrentStoryIndex: (index: number) => void;
  personalStories: story[];
  allStoriesProfiles: StoriesProfiles[];
  hiddenPersonsStories: number[];
  viewStories: (userId: number) => Promise<void>;
  updateAllStoriesProfiles: (
    friendsStories: StoriesProfiles[],
    personalStories: story[],
  ) => void;
  populatePersonalStories: (userId: number) => Promise<void>;
  populateHiddenPersons: () => Promise<void>;
  populateFriendsStories: () => Promise<void>;
  populateAllStories: (userId: number) => Promise<void>;
};

const useStories = create<useStories>(set => ({
  initialStoryIndex: 0,
  setInitialStoryIndex: (index: number) => set({ initialStoryIndex: index }),
  currentStory: [],
  setCurrentStory: (stories: story[]) => set({ currentStory: stories }),
  isModalVisible: false,
  openModal: () => {
    set({
      isModalVisible: true,
    });
  },
  closeModal: () => {
    set({
      isModalVisible: false,
      currentStory: [],
      storyDuration: 0,
      initialStoryIndex: 0,
      currentStoryIndex: 0,
    });
  },
  storyDuration: 0,
  setStoryDuration: (value: number) => set({ storyDuration: value }),
  hasStory: false,
  setHasStory: bool => set({ hasStory: bool }),
  currentStoryIndex: 0,
  setCurrentStoryIndex: (index: number) => set({ currentStoryIndex: index }),
  friendsStories: [],
  personalStories: [],
  hiddenPersonsStories: [],
  allStories: [],
  allStoriesProfiles: [],
  viewStories: async (userId: number) => {
    // Get current state
    const state = useStories.getState();
    let stories: Array<story> = [];

    if (
      state.personalStories.length > 0 &&
      userId === state.personalStories[0].userId
    ) {
      stories = [...state.personalStories];
    } else {
      stories = await getUserStories(userId).then(res => {
        // console.log('getUserStories length', res.data.length);
          return res.data || [];
        })
        .catch(error => {
          console.warn('GetUserStories - Error:', error);
          return [];
        });
    }

    let initialDuration = 60; // Default duration for images

    // Update current story with filtered results and set duration
    set({
      currentStory: stories,
      isModalVisible: stories.length > 0,
      currentStoryIndex: 0,
      storyDuration: initialDuration,
    });
  },

  updateAllStoriesProfiles: (
    friendsStories: StoriesProfiles[],
    personalStories: story[],
  ) => {
    let profiles: StoriesProfiles[] = [];
    if (personalStories.length > 0) {
      profiles.push({
        profileImage: personalStories[0].principalMedia.url,
        userId: personalStories[0].userId,
        userName: personalStories[0].username,
        userNickname: personalStories[0].username,
      });
    }
    set({
      allStoriesProfiles: [...profiles, ...friendsStories],
    });
  },

  populatePersonalStories: async (userId: number) => {
    try {
      const response = await getUserStories(userId);
      set({ personalStories: response.data });
      const state = useStories.getState();
      state.updateAllStoriesProfiles(
        state.friendsStories,
        state.personalStories,
      );
    } catch (error) {
      console.warn('GetUserStories - Error:', error);
    }
  },

  populateFriendsStories: async () => {
    try {
      await getStoryFollowingUsers().then(res => {
        set({ friendsStories: res.data });
      });
      const state = useStories.getState();
      state.updateAllStoriesProfiles(
        state.friendsStories,
        state.personalStories,
      );
    } catch (error) {
      console.warn('GetUserStories - Error:', error);
    }
  },

  populateHiddenPersons: async () => {
    try {
      const response = await gethiddenStoryPerson();
      const hidden = response?.data.response.usuarios[0].hiddenStoryUsers ?? [];
      set({ hiddenPersonsStories: hidden });
    } catch (error) {
      console.warn('GetHiddenPersons - Error:', error);
    }
  },

  populateAllStories: async (userId: number) => {
    try {
      await Promise.all([
        getStoryFollowingUsers().then(res => {
          // console.log('getStoryFollowingUsers length', res.data.length);
          set({ friendsStories: res.data });
        }),
        getUserStories(userId).then(res => {
          // console.log('getUserStories length', res.data.length);
          set({ personalStories: res.data });
        }),
        gethiddenStoryPerson().then(res => {
          const hidden = res?.data.response.usuarios[0].hiddenStoryUsers ?? [];
          // console.log('gethiddenStoryPerson length', hidden.length);
          set({ hiddenPersonsStories: hidden });
        }),
      ]);
      const state = useStories.getState();
      state.updateAllStoriesProfiles(
        state.friendsStories,
        state.personalStories,
      );
    } catch (error) {
      console.warn('FetchAllStories - Error:', error);
    }
  },
}));

export default useStories;
