import { useState } from "react";
import RoomCard from "../RoomCard";
import SmallRoomCard from "../SmallRoomCard";

interface RoomControllerProps{
    tarja?: 'Participante' | 'Administrador'
    openOption: () => void
    onProfile?: boolean
}

export default function RoomCardController(props: RoomControllerProps){

    const [open, setOpen] = useState(false)

    return(
        open ? (
            <RoomCard openOption={props.openOption}/>
        ): (
        <SmallRoomCard onProfile={props.onProfile} openOption={props.openOption} userType={props.tarja} openCard={() => setOpen(true)}/>)
    )
}