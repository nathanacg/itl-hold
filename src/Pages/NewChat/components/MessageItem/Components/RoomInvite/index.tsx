import { ImageBackground, View } from "react-native";
import { BoldText, Container, DateText, MessageContainer, NormalText, Shadow, TextContainer } from "./style";
import { useEffect, useState } from "react";
import { getRoomDetails } from "../../../../../../Service/Rooms";
import { IRoom } from "../../../../../../Types/rooms.type";
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../../../../../Routes/StackTypes";
import useRoom from "../../../../../../GlobalState/room.zustand";

interface RoomIniteProps {
    RooomName?: string
    description?: string
    idRoom: number | string
    isMy: boolean
}

export default function RoomInvite(props: RoomIniteProps) {

    const navigation = useNavigation<StackRoutes>()
    const [roomDetail, setRoomDetail] = useState<IRoom>()
    const { setRoom } = useRoom()

    useEffect(() => {
        (async () => {
            try {
                const response = await getRoomDetails(props.idRoom)
                setRoomDetail(response.data.result)
            } catch (error) {
                console.warn('GetRoomDetail - RoomInvite')
                console.log(error.response.data)
            }


        })()
    }, [])

    const navi = async (roomId: number) => {
        try {
            const resGetRoom = await getRoomDetails(roomId)
            const room: IRoom = resGetRoom.data.result
            setRoom(room)
            navigation.navigate("RoomCommunity", { UserType: "admin", Room: room, RoomId: roomDetail?.room_id })
        } catch (error) {
            console.log('GetRoomDetail - Room Invite')
            console.log(error.response.data)
        }

    }

    return (
        <MessageContainer isMy={props.isMy} onPress={() => navi(roomDetail?.room_id)}>
            <Container
                source={{
                    uri: !!roomDetail?.image
                        ?
                        roomDetail?.image : ''
                }}>
                <Shadow>
                    <TextContainer>
                        <View style={{ width: "100%", height: 30 }}>
                            <BoldText>
                                {roomDetail?.room_name}
                            </BoldText>
                            <NormalText>
                                {roomDetail?.description}
                            </NormalText>
                        </View>
                    </TextContainer>
                </Shadow>
            </Container>
        </MessageContainer >
    )
}