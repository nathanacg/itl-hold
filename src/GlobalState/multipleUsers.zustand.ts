import { create } from 'zustand';
import { getProfile, getProfiles } from '../Service/Profile';
import { getUser } from '../Service/UserRegister';
import { getStoreItem, setStoreObject } from '../Lib/asyncStorage';
import { ProfileUser } from '../Types/User';

type multipleUsers = {
    users: { token: string, profile: ProfileUser }[];
    setUsers: (item: { token: string, profile: ProfileUser }[]) => void;
    getUsers: () => void
};

const useMultipleUsers = create<multipleUsers>((set) => ({
    users: [] as { token: string, profile: ProfileUser }[],
    setUsers: async (item: { token: string, profile: ProfileUser }[]) => set({ users: item }),
    getUsers: async () => {
        var list = await getProfiles()
        set({ users: list })
    }
}))



export default useMultipleUsers;