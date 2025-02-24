import { create } from 'zustand'

interface DocumentProps {
  mime: string | null,
  uri: string,
  name: string
}

export type destackInfoStore = {
  destackName: string
  setDestackName: (name: string) => void
  destackImage: DocumentProps;
  setDestackImage: (destackImage: DocumentProps) => void;
  verificationDetack: boolean
  setVerificationDestack: (verification: boolean) => void
  destackId: number
  setDestackId: (destack: number) => void
  listValuesDestack: number[]
  setListValuesDestack: (numberId: number[]) => void
};

const useDestackInfoStore = create<destackInfoStore>((set) => ({
  destackImage: {
    mime: null,
    uri: '',
    name: ''
  },
  setDestackImage: (destackInfo) => set({ destackImage: destackInfo }),
  destackName: '',
  setDestackName: (name) => set({ destackName: name }),
  verificationDetack: false,
  setVerificationDestack: (verification) => set({ verificationDetack: verification }),
  destackId: 0,
  setDestackId: (destack: number) => set({ destackId: destack }),
  listValuesDestack: [],
  setListValuesDestack: (numberId: number[]) => set({ listValuesDestack: numberId })
}));

export default useDestackInfoStore;