import { axiosClientProfile_api } from '../Lib/Profile_api';

type UserParticipationRooms = {
  active: number;
  articles: number;
  books: number;
  categories: string;
  channel: {
    channelName: string;
    privilegeExpireTime: number;
    role: number;
    token: string;
    uid: string;
  };
  created_at: string;
  description: string;
  image: string;
  movies: number;
  musics: number;
  podcasts: number;
  public: number;
  room_id: number;
  room_name: string;
  series: number;
  updated_at: string;
  userId: number;
};

export const getRoomsList = async () => {
  var res = await axiosClientProfile_api.get('/listRooms');
  return res;
};

export const getUserRoomsList = async (userId: number) => {
  var res = await axiosClientProfile_api.get(`/listRooms?userId=${userId}`);
  return res;
};

export const createRoom = async (form: any) => {
  var res = await axiosClientProfile_api.post('/createRoom', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export const desactiveRoom = async (roomId: number, activate: number) => {
  var res = await axiosClientProfile_api.post('/activateRoom/', {
    activate,
    roomId,
  });
  return res;
};

export const deleteRoom = async (roomId: number) => {
  var res = await axiosClientProfile_api.delete(`/deleteRoom/${roomId}`);
  return res;
};

export const getRoomsAdminList = async (roomId: number) => {
  var res = await axiosClientProfile_api.get(`/listRoomAdmins/${roomId}`);
  return res;
};

export const getRoomMembers = async (roomId: number) => {
  var res = await axiosClientProfile_api.get(`/listRoomMembers/${roomId}`);
  return res;
};

export const addRoomMember = async (userId: number, roomId: number) => {
  var res = await axiosClientProfile_api.post('/addRoomMember/', {
    userId,
    roomId,
  });
  return res;
};

export const addRoomAdmin = async (userId: number, roomId: number) => {
  var res = await axiosClientProfile_api.post('/addRoomAdmin/', {
    userId,
    roomId,
  });
  return res;
};

export const removeRoomAdmin = async (userId: number, roomId: number) => {
  var res = await axiosClientProfile_api.post('/removeRoomAdmin', {
    userId,
    roomId,
  });
  return res;
};

export const removeRoomMember = async (userId: number, roomId: number) => {
  var res = await axiosClientProfile_api.post('/removeRoomMember', {
    userId,
    roomId,
  });
  return res;
};

export const getRoomDurations = async (roomId: number) => {
  var res = await axiosClientProfile_api.get(`/showRoomDuration/${roomId}`);
  return res;
};

export const getParticipations = async (): Promise<
  UserParticipationRooms[]
> => {
  var res = await axiosClientProfile_api.get('/listUserParticipationRooms/');
  return res.data.result;
};

export const updateRoom = async (roomId: number, form: any) => {
  var res = await axiosClientProfile_api.put(`/updateRoom/${roomId}`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export const updateRoomDuration = async (
  roomId: number,
  startDatetime: Date,
  endDatetime: Date,
) => {
  var res = await axiosClientProfile_api.put(`/changeRoomDuration/${roomId}`, {
    startDatetime: `${startDatetime}`,
    endDatetime: `${endDatetime}`,
  });
  return res;
};

export const createRoomDuration = async (
  roomId: number,
  startDatetime: string,
  endDatetime: string,
) => {
  var res = await axiosClientProfile_api.put(`/changeRoomDuration/${roomId}`, {
    startDatetime: `${startDatetime}`,
    endDatetime: `${endDatetime}`,
  });
  return res;
};

export const getRoomDetails = async (roomId: number) => {
  var res = await axiosClientProfile_api.get(`/detailRoom/${roomId}`);
  return res;
};

export const getRequestsRoom = async (roomId: number) => {
  var res = await axiosClientProfile_api.get(
    `/listJoinRoomRequests?roomId=${roomId}`,
  );
  return res;
};

export const actionsRequestRoom = async (
  roomId: number,
  status: number,
  requestUserId: number,
) => {
  var res = await axiosClientProfile_api.post('/acceptOrDeclineRequestJoin', {
    roomId,
    status,
    requestUserId,
  });
  return res;
};

export const getRoomsProfile = async (userId: number) => {
  var res = await axiosClientProfile_api.get(`/getRoomsUser/${userId}`);
  return res;
};

export const removeRequestToJoinRoom = async (roomId: number) => {
  var res = await axiosClientProfile_api.delete('removeRequestToJoinRoom', {
    data: { roomId },
  });
  return res;
};
