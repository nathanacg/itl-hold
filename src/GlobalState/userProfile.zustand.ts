import { create } from 'zustand';
import { getProfile } from '../Service/Profile';
import { ProfileUser } from '../Types/User';
import { getFollowing } from '../Service/Followers';

type userProfile = {
  user: ProfileUser;
  followingProfilesNickname: string[];
  populateFollowingProfilesNickname: () => void;
  isFollowingByNickname: (nickname: string) => boolean;
  setUser: (item: ProfileUser) => void;
  initializeProfile: () => void;
};

const useUserProfile = create<userProfile>(set => ({
  user: {} as ProfileUser,
  setUser: (item: ProfileUser) => {
    const { populateFollowingProfilesNickname } = useUserProfile.getState();
    set({ user: item });
    populateFollowingProfilesNickname();
  },
  followingProfilesNickname: [] as string[],
  isFollowingByNickname: (nickname: string): boolean => {
    const { followingProfilesNickname } = useUserProfile.getState();
    return followingProfilesNickname.includes(nickname);
  },
  populateFollowingProfilesNickname: async () => {
    // console.log('########################### populateFollowingProfilesNickname');
    const { user } = useUserProfile.getState();
    const res = await getFollowing(user.userId)
      .then(r => r.data)
      .catch(console.log);

    const followingProfiles = res.result.map(
      (r: { userNickname: string }) => r.userNickname,
    );
    // console.log('populateFollowingProfilesNickname followingProfiles', followingProfiles);
    set({ followingProfilesNickname: followingProfiles });
  },
  initializeProfile: async () => {
    try {
      const result = await getProfile();
      set({
        user: {
          ...result.data,
          profileImage:
            result.data.profileImage + `?timestamp=${new Date().getTime()}`,
        },
      });
    } catch (error) {
      console.warn('initializeProfile - UserProfile (Zustand)');
      console.log(error);
    }
  },
}));

export default useUserProfile;
