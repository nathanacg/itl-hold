import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { SafeAreaViewContainer } from '../../Components/elementsComponents'
import { fontStyle, theme } from '../../Theme/theme'

import Header from '../../Components/Header'
import RadioButton from '../../Components/RadioButton'
import SearchInput from '../../Components/SearchInput'
import { TextRegular12Center, TextRegular16 } from '../../Components/configurationsElemetsStyle'

import { ContentContainer } from './style'
import { ListRoomUsers } from '../../Types/User'

import { addRoomAdmin, getRoomMembers, getRoomsAdminList, removeRoomAdmin } from '../../Service/Rooms'
import ListUsersMember from '../../Components/ListUsersMember'
import useRoom from '../../GlobalState/room.zustand'
import ButtonAdd from '../../Components/ButtonAdd'
import { typeTheme } from '../../Config/enumTheme'
import { Separator } from '../RoomInfo/style'
import { GrayText, GrayTextCenter } from '../../Components/Informationsform'
import useUserProfile from '../../GlobalState/userProfile.zustand'

export default function AddAdmin() {

    const { room } = useRoom()

    const { user } = useUserProfile()

    const [inputValue, setInputValue] = useState("")

    const [usersList, setUsersList] = useState<ListRoomUsers[]>([])
    const [usersListMembers, setUsersMember] = useState<ListRoomUsers[]>([])

    async function handleAddAdmin(userId: number) {
        try {
            await addRoomAdmin(userId, room?.room_id)
            getListUsers()
        } catch (error) {
            console.log('Erro ao adicionar administrador.', error)
        }
    }

    async function handleRemoveAdmin(userId: number) {
        try {
            await removeRoomAdmin(userId, room?.room_id)
            getListUsers()
        } catch (error) {
            console.log('Erro ao adicionar administrador.', error)
        }
    }

    const getListMemberRoom = async () => {
        try {
            const response = await getRoomMembers(room?.room_id)
            setUsersMember(response.data.result)

        } catch (error) {
            console.log(error)
        }
    }

    const getListUsers = async () => {
        try {
            const response = await getRoomsAdminList(room?.room_id)
            setUsersList(response.data.result)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getListMemberRoom()
        getListUsers()
    }, [])

    const filteredFollows = usersListMembers.filter(userItem => {
        const isMember = usersList.some(member => member.userId === userItem.userId);
        return !isMember;
    });

    return (
        <SafeAreaViewContainer>

            <Header
                titleHeader="Administrador"

            />

            {usersList.map(member => (
                <ListUsersMember
                    borderBottom
                    key={member.userNickname}
                    profileImage={member.profileImage}
                    userId={member.userId}
                    userName={member.userName}
                    userNickname={member.userNickname}
                    rightButton={
                        <>
                            {member.userId !== user.userId ? (
                                <ButtonAdd
                                    pressFunction={() => handleRemoveAdmin(member.userId)}
                                    textButton={'Remover'}
                                    typebutton={typeTheme.light}
                                />
                            ) : (
                                <GrayText>Você</GrayText>
                            )}
                        </>
                    }
                />
            ))}

            <TextRegular12Center marginTop={20}>Participantes</TextRegular12Center>
            <ScrollView style={{ marginTop: 30 }} showsVerticalScrollIndicator={false}>
                {filteredFollows.map(userItem => (
                    <ListUsersMember
                        borderBottom
                        key={userItem.userId}
                        profileImage={userItem.profileImage}
                        userId={userItem.userId}
                        userName={userItem.userName}
                        userNickname={userItem.userNickname}
                        rightButton={
                            <ButtonAdd
                                pressFunction={() => handleAddAdmin(userItem.userId)}
                                textButton={'Adicionar'}
                                typebutton={typeTheme.default}
                            />
                        }
                    />
                ))}
            </ScrollView>

        </SafeAreaViewContainer>
    )
}