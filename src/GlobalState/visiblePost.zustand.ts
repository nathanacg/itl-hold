import { create } from 'zustand';

type visible = {
  visibleIndex: number,
  setVisible: (index: number) => void
}

const useVisiblePost = create<visible>((set) => ({
  visibleIndex: 0,
  setVisible: (index) => {
    set(prev => ({ visibleIndex: index }))
  }
}));


export default useVisiblePost;