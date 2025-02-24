import { axiosClientpost_api } from '../Lib/Post_api';

export const getFeed = async () => {
  var res = await axiosClientpost_api.get('/feed?max=100');
  return res;
};

export const getRoomFeed = async (idRoom: number) => {
  var res = await axiosClientpost_api.get(`post/listPostsRoom/${idRoom}`);
  return res;
};
