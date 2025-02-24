import { create } from 'zustand';
import { postProps } from '../Types/postProps';
import { feed } from '../Types/feedProps';
import { IRepost } from '../Types/repost.type';


type OtherProfilePost = {
    post: feed;
    setPost: (item: feed) => void;
    repost: IRepost | null;
    setRepost: (item: IRepost) => void;
    nickName: string,
    setNickName: (nick: string) => void
    postHexId: string,
    setPostHexId: (id: string) => void
};

const useOtherProfilePost = create<OtherProfilePost>((set) => ({
    post: {
        postId: 0,
        publicationType: '',
        profileImage: '',
        postLegend: null,
        postHexId: '',
        link: '',
        isSaved: false,
        postSpoiler: 0,
        isClosed: 0,
        postEvaluation: '',
        postCategorie: '',
        postEnable: 1,
        userId: 0,
        postDate: '',
        accountConfig: {
            showLikes: false,
            showVisualizations: false
        },
        userNickname: '',
        markedUsers: [],
        medias: [],
        followingUser: 0,
        tmdbMovieId: null
    },
    repost: null,
    setRepost: (item) => set({ repost: item }),
    setPost: (item) => set({ post: item }),
    setNickName: (nick) => set({ nickName: nick }),
    nickName: "",
    postHexId: '',
    setPostHexId: (id: string) => set({ postHexId: id })
}));


export default useOtherProfilePost;