import { create } from 'zustand';
import { ProfileUser } from '../Types/User';


type Props = {
    user: ProfileUser
    setUser: (item: ProfileUser) => void;
    screenName: string,
    setScreenName: (item: string) => void;
};

const useScreenName = create<Props>((set) => ({
    user: {
        userId: 0,
        notifications: false,
        userName: '',
        userEmail: '',
        site: '',
        userBirthday: '',
        userPhone: '',
        userNickname: '',
        user_verified: 0,
        userBio: '',
        profileImage: '',
        numSeguidores: 0,
        numSeguindo: 0,
        numPublicacoes: 0,
        private_account: 0,
        isFollowing: false,
        userFollowing: 0,
        gender: ''
    },
    setUser: (item) => set({ user: item }),
    screenName: '',
    setScreenName: (item) => set({ screenName: item }),
}));


export default useScreenName;