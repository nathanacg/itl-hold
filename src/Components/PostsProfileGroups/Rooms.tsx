import { FlatList } from "react-native";

import RoomCardController from "../RoomCardController";

interface RoomsListProps {
    paddingTop: number
    tarja?: 'Participante' | 'Administrador'
    openModal?: () => void
}

export default function RoomsList(props: RoomsListProps) {

    return (
        <FlatList
            data={[1, 2, 3]}
            keyExtractor={(item) => "roomId" + item}
            style={{ paddingTop: props.paddingTop }}
            contentContainerStyle={{ alignItems: "center", gap: 5 }}
            renderItem={() => <RoomCardController openOption={props.openModal || (() => { })} tarja={props.tarja} />}
        />
    )
}