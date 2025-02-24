import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import { IRoom } from '../../Types/rooms.type'

import { getUserRoomsList } from '../../Service/Rooms'

import RoomCard from '../RoomCard'

import { TextNotPublicationsArchiveds } from '../AlbumCard/style'

interface RoomsListProps {
    paddingTop: number
    tarja: "user" | "admin"
    openModal: () => void
    onProfile?: boolean
    userId: number
}

export default function RoomsList(props: RoomsListProps) {
    const [listRooms, setListRooms] = useState<IRoom[]>([])

    useEffect(() => {
        (async () => {
            const response = await getUserRoomsList(props.userId)
            setListRooms(response.data.result)
        })()
    }, [])

    return (
        <FlatList
            scrollEnabled={false}
            data={listRooms}
            keyExtractor={(item) => 'roomcard' + item.room_id}
            style={{ paddingTop: props.paddingTop }}
            ListEmptyComponent={<TextNotPublicationsArchiveds>Não existe nenhuma Sala</TextNotPublicationsArchiveds>}
            contentContainerStyle={{ alignItems: "center", gap: 5 }}
            renderItem={({ item }) => <RoomCard room={item} userType={props.tarja} onProfile openOption={() => { }} />}
        />
    )
}