import { create } from 'zustand';

type token = {
  token: string,
  setToken: (token: string) => void
}

const userToken = create<token>((set) => ({
  token: '',
  setToken: (token) => {
    set(prev => ({ token: token }))
  }
}));


export default userToken;