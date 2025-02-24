import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../../../Routes/StackTypes'

import { Button, Container, BottomText, Infos, SalaName, Description, Participants, ParticipantsImage, ParticipantsCount, UserImage } from './style'

import { ListRoomUsers } from '../../../../Types/User'
import { IRoom } from '../../../../Types/rooms.type'

import { Shadow } from '../../../../Components/RoomCard/style'
import { getRoomMembers } from '../../../../Service/Rooms'
import useUserProfile from '../../../../GlobalState/userProfile.zustand'
import { RoomLocationEnum } from '../../../../enum'

interface RoomsType {
    dataRoom: IRoom
}

export default function RoomCard(props: RoomsType) {

    const navigation = useNavigation<StackRoutes>()

    const { user } = useUserProfile()

    const [members, setMembers] = useState<ListRoomUsers[]>([])
    const [totalMembers, setTotalMembers] = useState<number>(0)


    const getMembers = async () => {
        try {
            const response = await getRoomMembers(props.dataRoom.room_id)
            const membersArray = response.data.result
            const totalMembers = membersArray.length

            setMembers(membersArray)
            setTotalMembers(totalMembers)
        } catch (error) {
            console.log('Erro ao buscar membros da sala.', error)
        }
    }

    useEffect(() => {
        getMembers()
    }, [])

    function limitNicknameLength(nickname: string, maxLength: number) {
        if (nickname.length > maxLength) {
            return nickname.slice(0, maxLength) + '...';
        }
        return nickname;
    }

    return (
        <Container source={{ uri: props.dataRoom.image }}>
            <Shadow>
                <Button onPress={() => navigation.navigate("RoomCommunity",
                    { from: RoomLocationEnum.FROM_POST, UserType: props.dataRoom.userId === user.userId ? "admin" : "user", RoomId: props.dataRoom.room_id, Room: props.dataRoom }
                )}>
                    <BottomText>
                        {props.dataRoom.public === 1 ? 'Entrar' : 'Solicitar'}
                    </BottomText>
                </Button>
                <Infos>
                    <SalaName>{props.dataRoom.room_name}</SalaName>
                    <Description>{limitNicknameLength(props.dataRoom.description, 100)}</Description>

                    <Participants>
                        {members.slice(0, 4).map((member) => {
                            return (
                                <ParticipantsImage key={member.userId}>
                                    <UserImage source={{ uri: member.profileImage }} />
                                </ParticipantsImage>
                            )
                        })}
                        <ParticipantsCount>{totalMembers > 1 ? totalMembers + ' participantes' : '1 participante'}</ParticipantsCount>
                    </Participants>

                </Infos>
            </Shadow>
        </Container>
    )
}