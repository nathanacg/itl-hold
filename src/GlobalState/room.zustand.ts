import { create } from 'zustand';
import { IRoom } from '../Types/rooms.type';
import { getParticipations } from '../Service/Rooms';

type RoomProps = {
  room: IRoom | null;
  setRoom: (item: IRoom | null) => void;
  participatingRoomsIds: number[];
  populateParticipatingRoomsIds: () => Promise<void>;
  addParticipatingRoomsIds: (item: number) => void;
};

const useRoom = create<RoomProps>(set => ({
  room: null,
  setRoom: item => set({ room: item }),
  participatingRoomsIds: [],
  populateParticipatingRoomsIds: async () => {
    const response = await getParticipations();
    const ids: number[] = response.map(item => item.room_id);
    set({ participatingRoomsIds: ids });
  },
  addParticipatingRoomsIds: item => {
    set(state => ({
      participatingRoomsIds: [...state.participatingRoomsIds, item],
    }));
  },
}));

export default useRoom;
