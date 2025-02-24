import { create } from 'zustand';

interface callProps {
    user: number,
    channel: string,
    channelToken: string,
}

type useCallStoreProps = {
    callStore: callProps;
    setCallStore: (item: callProps) => void;
};

const useCallStore = create<useCallStoreProps>((set) => ({
    callStore: {
        user: 0,
        channel: '',
        channelToken: '',
    },
    setCallStore: (item) => set({ callStore: item }),
}));


export default useCallStore;