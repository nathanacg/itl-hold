import { ImageBackground, View } from "react-native";
import { BoldText, Container, DateText, MessageContainer, NormalText, Shadow, TextContainer } from "./style";
import { fontStyle } from "../../../../Theme/theme";
import SendedMessage from "../SendedMessage";
import { useEffect, useState } from "react";
import { getRoomDetails } from "../../../../Service/Rooms";
import { IRoom } from "../../../../Types/rooms.type";
import Navigation from "../../../../Routes/Navigation";
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../../../Routes/StackTypes";
import useRoom from "../../../../GlobalState/room.zustand";

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

{/* <View style={{ alignSelf: "center", justifyContent: "center" }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <DateText fontFamily={fontStyle.semiBold} lineHeight={"8px"}>
                                    {roomDetail.}
                                </DateText>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <DateText>
                                    00/00/00
                                </DateText>
                                <DateText> - 14h20
                                </DateText>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 4 }}>
                                <DateText fontFamily={fontStyle.semiBold} lineHeight={"8px"}>
                                    Fim
                                </DateText>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <DateText>
                                    12/09/23
                                </DateText>
                                <DateText> - 14h20
                                </DateText>
                            </View>
                        </View> */}