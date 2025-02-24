import { SetStateAction, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import { theme } from '../../Theme/theme'


import Header from '../../Components/Header'

import { TextLightGray } from '../../Components/configurationsElemetsStyle'
import { ContainerInput, LabelContainer } from '../../Components/InputOptions/style'
import { Container, SafeAreaViewContainer, Text500, TextSimpleRoom, TextSimpleRoomInfo } from '../../Components/elementsComponents'
import { GrayText } from '../../Components/Informationsform'
import { ContentPage, ParticipantsContainer, RoomInfoContainer, ShadowBg, Shadow } from '../RoomInfo/style'

import { getDateRoom } from '../../Utils/handleTime'

import ListUsersMember from '../../Components/ListUsersMember'


import { getRoomDetails, getRoomMembers, getRoomsAdminList } from '../../Service/Rooms'

import useRoom from '../../GlobalState/room.zustand'
import { IRoom } from '../../Types/rooms.type'
import { ListRoomUsers } from '../../Types/User'
import DateInputView from '../../Components/DateInputView'

import UserImageRounded from '../../Components/UserImageProfile'


interface RoomProps {
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

export default function ViewRoomInfo({ setvisibleBottonModal }: RoomProps) {

    const { room } = useRoom()

    const navigation = useNavigation<StackRoutes>()

    const [roomDetails, setRoomDetails] = useState<IRoom>()

    const [userInfoModal, setUserInfoModal] = useState(false)

    const [roomMembers, setRoomMembers] = useState<ListRoomUsers[]>([])
    const [roomAdmins, setRoomAdmins] = useState<ListRoomUsers[]>([])

    const getDetailRoom = async () => {
        try {
            const response = await getRoomDetails(room?.room_id)
            setRoomDetails(response.data.result)
        } catch (error) {
            console.log('Erro ao buscar detalhes da sala.', error)
        }
    }

    const getMembersRoom = async () => {
        try {
            const response = await getRoomMembers(room?.room_id)
            setRoomMembers(response.data.result)
        } catch (error) {
            console.log('Erro listar membros da sala.', error)
        }
    }

    const getAdminsRoom = async () => {
        try {
            const response = await getRoomsAdminList(room?.room_id)
            setRoomAdmins(response.data.result)
        } catch (error) {
            console.log('Erro listar membros da sala.', error)
        }
    }

    useEffect(() => {
        getDetailRoom()
        getAdminsRoom()
        getMembersRoom()

    }, [room?.room_id])


    function getSelectedCategory(params: IRoom) {

        const selectedTypes = []

        if (params.articles === 1) {
            selectedTypes.push('Artigo')
        }
        if (params.musics === 1) {
            selectedTypes.push('Música')
        }
        if (params.podcasts === 1) {
            selectedTypes.push('Podcast')
        }
        if (params.movies === 1) {
            selectedTypes.push('Filme')
        }
        if (params.series === 1) {
            selectedTypes.push('Série')
        }
        if (params.books === 1) {
            selectedTypes.push('Livro')
        }

        return selectedTypes
    }

    const result = getSelectedCategory(room)

    return (
        <SafeAreaViewContainer>
            <Container showsVerticalScrollIndicator={false}>
                <RoomInfoContainer>
                    <Header
                        titleHeader="Informações"
                    />
                    <ShadowBg source={{ uri: room?.image, cache: 'force-cache' }}>
                        <Shadow>
                            <View style={{ marginTop: 190 }}>
                                <View style={{ marginTop: 5, flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                                    <UserImageRounded url={room?.profileImage} size={35} />
                                    <Text500 fontSize={16} weight={'normal'} color={theme.secondaryColor}>{room?.userNickname}</Text500>
                                </View>
                            </View>
                        </Shadow>
                    </ShadowBg>
                    <ContentPage>

                        <ContainerInput>
                            <LabelContainer style={{ width: "30%" }}>
                                <TextSimpleRoom>Nome da sala</TextSimpleRoom>
                            </LabelContainer>
                            <TextSimpleRoomInfo>{room?.room_name}</TextSimpleRoomInfo>
                        </ContainerInput>
                        <ContainerInput>
                            <LabelContainer style={{ width: "30%" }}>
                                <TextSimpleRoom>Descrição</TextSimpleRoom>
                            </LabelContainer>

                            <TextSimpleRoomInfo>{room?.description}</TextSimpleRoomInfo>
                        </ContainerInput>

                        <ContainerInput>
                            <LabelContainer style={{ width: "30%" }}>
                                <TextSimpleRoom>Tipo</TextSimpleRoom>
                            </LabelContainer>
                            <TextSimpleRoomInfo>{room?.public === 1 ? 'Pública' : 'Privada'}</TextSimpleRoomInfo>
                        </ContainerInput>

                        <ContainerInput>
                            <LabelContainer style={{ width: "30%" }}>
                                <TextSimpleRoom>Duração</TextSimpleRoom>
                            </LabelContainer>
                            <TextSimpleRoomInfo>{roomDetails?.temporaryRoom === 'true' ? 'Temporária' : 'Permanente'}</TextSimpleRoomInfo>
                        </ContainerInput>

                        {roomDetails?.temporaryRoom === 'true' && (

                            <View style={{ marginVertical: 10, gap: 10 }}>
                                <DateInputView
                                    startDate={{ date: getDateRoom(roomDetails?.duration[0].start_datetime.split('T')[0].toString()), time: roomDetails?.duration[0].start_datetime.split('T')[1].toString().slice(0, 5) }}
                                    endDate={{ date: getDateRoom(roomDetails?.duration[0].end_datetime.split('T')[0].toString()), time: roomDetails?.duration[0].end_datetime.split('T')[1].toString().slice(0, 5) }}
                                    setStartDate={() => { }}
                                    setEndDate={() => { }}
                                    alignRight
                                    disable
                                />
                            </View>

                        )}

                        <ContainerInput>
                            <LabelContainer style={{ width: "30%" }}>
                                <TextSimpleRoom>Categoria</TextSimpleRoom>
                            </LabelContainer>
                            <TextSimpleRoomInfo>{result[0]}</TextSimpleRoomInfo>
                        </ContainerInput>
                        <ContainerInput>
                            <LabelContainer style={{ width: "30%" }}>
                                <TextSimpleRoom>{room?.public !== 1 ? "Enviar mensagens" : "Postagens"}</TextSimpleRoom>
                            </LabelContainer>

                            <TextSimpleRoomInfo>{room?.public === 1 ? "Todos os participantes" : "Somente administradores"}</TextSimpleRoomInfo>
                        </ContainerInput>
                        <ParticipantsContainer>
                            <TextSimpleRoom>
                                Participantes: {roomMembers.length}
                            </TextSimpleRoom>
                            <TouchableOpacity onPress={() => navigation.navigate("RoomParticipants")}>
                                <TextLightGray>ver todos</TextLightGray>
                            </TouchableOpacity>
                        </ParticipantsContainer>
                    </ContentPage>

                    {roomMembers
                        .sort((a, b) => a.userName.localeCompare(b.userName))
                        .map((item) => {
                            const isAdmin = roomAdmins.some(admin => admin.userId === item.userId)

                            return (
                                <View key={item.userId}>
                                    <ListUsersMember
                                        borderBottom
                                        userId={item.userId}
                                        profileImage={item.profileImage}
                                        userNickname={item.userNickname}
                                        userName={item.userName}
                                        rightButton={isAdmin && <GrayText>Admin</GrayText>}
                                    />


                                </View>
                            )
                        })}


                </RoomInfoContainer>
            </Container>





        </SafeAreaViewContainer >
    )
}