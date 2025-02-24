import { create } from 'zustand';

type NavigationParams = {
  navigationParams: {
    from?: string;
    postHexId?: string;
    dropId?: string;
  };
  setNavigationParams: (params: any) => void;
};

const useNavigationParams = create<NavigationParams>(set => ({
  navigationParams: {},
  setNavigationParams: (params: any) => {
    set({ navigationParams: params });
  },
}));

export default useNavigationParams;
