import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

import { typeTheme } from '../../Config/enumTheme'

import { ContentCentered, GrayText, GrayTextCenter } from '../../Components/Informationsform'
import { SafeAreaViewContainer } from '../../Components/elementsComponents'
import { TextRegular12Center } from '../../Components/configurationsElemetsStyle'

import Header from '../../Components/Header'
import ButtonAdd from '../../Components/ButtonAdd'

import { ListFollowers } from '../MyFollowers/Components/Followers'
import ListUsersMember from '../../Components/ListUsersMember'

import { addRoomMember, getRoomMembers, removeRoomMember } from '../../Service/Rooms'
import { getFollowing } from '../../Service/Followers'

import useUserProfile from '../../GlobalState/userProfile.zustand'
import useRoom from '../../GlobalState/room.zustand'
import SearchInput from '../../Components/SearchInput'

export default function AddParticipant() {

    const { user } = useUserProfile()

    const { room } = useRoom()

    const [members, setMembers] = useState<ListFollowers[]>([])
    const [usersFiltered, setFilteredUsers] = useState<ListFollowers[]>([])
    const [follows, setFollows] = useState<ListFollowers[]>([])

    const [inputText, setInputText] = useState<string>('')

    const getMembers = async () => {
        try {
            const response = await getRoomMembers(room?.room_id)
            setMembers(response.data.result)
        } catch (e) {
            console.log('erro ao buscar membros.', e)
        }
    }

    const getFollows = async () => {
        try {
            const response = await getFollowing(user.userId)
            setFollows(response.data.result)
            setFilteredUsers(response.data.result)
        } catch (e) {
            console.log('erro ao buscar quem eu sigo.', e)
        }
    }

    async function handleAddParticipant(userId: number) {
        try {
            await addRoomMember(userId, room?.room_id)
            getFollows()
            getMembers()
        } catch (error) {
            console.log('Deu ruim ao adicionar o participante.', error)
        }
    }

    async function handleRemoveParticipant(userId: number) {
        removeItem(userId)
        try {
            await removeRoomMember(userId, room?.room_id)
            getMembers()
            getFollows()

        } catch (error) {
            console.log('Deu ruim ao remover o participante.', error)
        }
    }

    useEffect(() => {
        const newUsers = follows.filter(user => (
            user.userNickname.toLowerCase().includes(inputText.toLowerCase())
            || user.userName.toLowerCase().includes(inputText.toLowerCase())
        ))
        setFilteredUsers(newUsers)
    }, [inputText])


    const filteredFollows = follows.filter(userItem => {
        const isMember = members.some(member => member.userId === userItem.userId)
        return !isMember
    })

    const removeItem = (userId: number) => {
        const newData = members.filter((item) => item.userId !== userId)
        setFollows(newData)
    }

    useEffect(() => {
        getMembers()
        getFollows()
    }, [])

    return (
        <SafeAreaViewContainer>
            <Header
                titleHeader="Adicionar"
            />
            {members.map(member => (
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
                                    pressFunction={() => handleRemoveParticipant(member.userId)}
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

            <TextRegular12Center marginBottom={10} marginTop={20}>Pessoas que você segue</TextRegular12Center>

            <ContentCentered>
                <SearchInput
                    marginTop='12px'
                    onSetText={setInputText}
                    value={inputText}
                />
            </ContentCentered>

            <ScrollView showsVerticalScrollIndicator={false}>
                {inputText.length > 0 ? usersFiltered.map(userItem => (
                    <ListUsersMember
                        borderBottom
                        key={userItem.userId}
                        profileImage={userItem.profileImage}
                        userId={userItem.userId}
                        userName={userItem.userName}
                        userNickname={userItem.userNickname}
                        rightButton={
                            <ButtonAdd
                                pressFunction={() => handleAddParticipant(userItem.userId)}
                                textButton={'Adicionar'}
                                typebutton={typeTheme.default}
                            />
                        }
                    />
                )) : (
                    filteredFollows.map(userItem => (
                        <ListUsersMember
                            borderBottom
                            key={userItem.userId}
                            profileImage={userItem.profileImage}
                            userId={userItem.userId}
                            userName={userItem.userName}
                            userNickname={userItem.userNickname}
                            rightButton={
                                <ButtonAdd
                                    pressFunction={() => handleAddParticipant(userItem.userId)}
                                    textButton={'Adicionar'}
                                    typebutton={typeTheme.default}
                                />
                            }
                        />
                    ))
                )}
            </ScrollView>
        </SafeAreaViewContainer >
    )
}