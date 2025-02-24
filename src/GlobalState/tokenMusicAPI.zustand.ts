import { create } from 'zustand';

type TokenMusic = {
    token: string,
    setToken: (key: string) => void
}

const tokenMusicApi = create<TokenMusic>((set) => ({
    token: "",
    setToken: (newToken) => set({token: newToken})
}))

export default tokenMusicApi;