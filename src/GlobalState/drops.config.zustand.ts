import { create } from 'zustand';

type DropsConfig = {
  isMuted: boolean;
  toggleIsMuted: () => void;
};

const useDropsConfig = create<DropsConfig>(set => ({
  isMuted: true,
  toggleIsMuted: () => set(pv => ({ isMuted: !pv.isMuted })),
}));

export default useDropsConfig;
