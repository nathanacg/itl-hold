import { useNotification } from '../context/notification';
import useRoom from '../GlobalState/room.zustand';
import useUserProfile from '../GlobalState/userProfile.zustand';
import {
  addRoomMember,
  getRequestsRoom,
  removeRequestToJoinRoom,
} from '../Service/Rooms';

export function isParticipatingInRoom(
  participatingRoomsIds: number[],
  roomId: number,
) {
  return participatingRoomsIds.includes(roomId);
}

export async function isAmInTheRoom(roomId: number, userName: string) {
  try {
    const response = await getRequestsRoom(roomId);

    return response.data.find((item: any) => {
      const profileName = item.userName;

      return profileName === userName;
    });
  } catch (e) {
    console.error('Room Card -- getRequestroom');
  }
}

export function useRoomUtils() {
  const { populateParticipatingRoomsIds } = useRoom();
  const { sendNotificationRequestJoinRoom } = useNotification();
  const { user } = useUserProfile();

  async function handleRequestRoom(roomId: number) {
    sendNotificationRequestJoinRoom(user.userId, roomId);
    await populateParticipatingRoomsIds();
  }

  async function handleDenyRequest(roomId: number) {
    await removeRequestToJoinRoom(roomId);
    await populateParticipatingRoomsIds();
  }

  async function handleAddInRoom(roomId: number) {
    await addRoomMember(user.userId, roomId);
    await populateParticipatingRoomsIds();
  }

  return {
    handleRequestRoom,
    handleDenyRequest,
    handleAddInRoom,
  };
}
