import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'

import { ContentContainer } from './style'

import Header from '../../Components/Header'
import SearchInput from '../../Components/SearchInput'
import { Container, SafeAreaViewContainer } from '../../Components/elementsComponents'

import { ListRoomUsers } from '../../Types/User'
import { actionsRequestRoom, getRequestsRoom } from '../../Service/Rooms'

import useRoom from '../../GlobalState/room.zustand'
import { ButtonContent } from '../../Components/ButtonReq/styles'
import { Icon } from 'react-native-elements'
import { theme } from '../../Theme/theme'
import { typeTheme } from '../../Config/enumTheme'
import ListUsersRequests from '../../Components/ListUsersRequests'
import useStories from '../../GlobalState/stories.zustand'
import { TextNotPublicationsArchiveds } from '../ArchivedPublications/style'

export default function RoomSolicitation() {

    const { room } = useRoom()


    const [requests, setRequests] = useState<ListRoomUsers[]>([])
    const [filterUsers, setFilterUsers] = useState<ListRoomUsers[]>(requests || null)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")
    const [seledtedUsers, setSelectedUsers] = useState<{ userName: string, userNickname: string }[]>([])
    const [allSelected, setAllSelected] = useState<boolean>(false)


    const getRequestRooms = async () => {
        setIsLoading(true)
        const roomId = room ? room.room_id : 0
        try {
            const response = await getRequestsRoom(roomId)
            setRequests(response.data)
        } catch (error) {
            console.log('Erro ao buscar solicitaçóes para entrar na sala.', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getRequestRooms()
    }, [])

    useEffect(() => {
        const newUsers = requests.filter(user => (
            user.userNickname.toLowerCase().includes(inputValue.toLowerCase())
            || user.userName.toLowerCase().includes(inputValue.toLowerCase())
        ))
        setFilterUsers(newUsers)
    }, [inputValue])

    /*  const deleteAllRequests = async () => {
 
         try {
             const response = await deleteAllRequestsRoom()
             setAllSelected(true)
             setRequestUsers(response.data)
         } catch (error) {
             console.log('deu erro ao excluir todas as solicitacoes.', error)
         }
       
     } */

    const actionsRequestRooms = async (status: number, requestUserId: number) => {
        const roomId = room ? room.room_id : 0
        try {
            await actionsRequestRoom(roomId, status, requestUserId)
            getRequestRooms()
        } catch (error) {
            console.log('Deu ruim ao enviar a requisicao das solicitacoes da sala.', error)
        }
    }

    if (isLoading) {
        return <ActivityIndicator style={{ marginTop: 350 }} size={'large'} color={theme.primarycolor} />
    }

    return (
        <SafeAreaViewContainer>
            <Container showsVerticalScrollIndicator={false}>
                <Header
                    titleHeader="Solicitações"
                />
                <ContentContainer>
                    <SearchInput
                        marginTop="35px"
                        marginBottom="10px"
                        value={inputValue}
                        onSetText={setInputValue}
                    />
                </ContentContainer>

                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* <AllContainer>
                        <AllText>
                            Todos
                        </AllText>
                        <RadioButton
                            value={allSelected}
                            setValue={() => {
                                allSelected ? setSelectedUsers([]) : setSelectedUsers(filterUsers)
                                setAllSelected(!allSelected)
                            }}
                        />
                    </AllContainer> */}

                    {inputValue.length > 0 ? (
                        <>
                            {filterUsers.map((userItem, index) => (
                                <ListUsersRequests
                                    borderBottom
                                    key={index}
                                    userId={userItem.userId}
                                    userName={userItem.userName}
                                    profileImage={userItem.profileImage}
                                    userNickname={userItem.userNickname}
                                    rightButton={
                                        <View style={{ flexDirection: 'row', gap: 5 }}>
                                            <ButtonContent
                                                onPress={() => actionsRequestRooms(2, userItem.userId)}
                                                optionButton={typeTheme.default}
                                            >
                                                <Icon
                                                    name="check"
                                                    size={19}
                                                    color={theme.secondaryColor}
                                                />
                                            </ButtonContent>
                                            <ButtonContent
                                                onPress={() => actionsRequestRooms(3, userItem.userId)}
                                                optionButton={typeTheme.light}
                                            >
                                                <Icon
                                                    name="close"
                                                    size={19}
                                                    color={theme.primarycolor}
                                                />
                                            </ButtonContent>
                                        </View>
                                    } />
                            ))}
                        </>
                    ) : (
                        <>
                            {requests.length < 1 ? (
                                <>
                                    <TextNotPublicationsArchiveds style={{ alignSelf: 'center' }}>Não há nenhuma solicitação.</TextNotPublicationsArchiveds>
                                </>
                            ) : (
                                <>
                                    {requests.map((userItem, index) => (
                                        <ListUsersRequests
                                            borderBottom
                                            key={index}
                                            userId={userItem.userId}
                                            userName={userItem.userName}
                                            profileImage={userItem.profileImage}
                                            userNickname={userItem.userNickname}
                                            rightButton={
                                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                                    <ButtonContent
                                                        onPress={() => actionsRequestRooms(2, userItem.userId)}
                                                        optionButton={typeTheme.default}
                                                    >
                                                        <Icon
                                                            name="check"
                                                            size={19}
                                                            color={theme.secondaryColor}
                                                        />
                                                    </ButtonContent>
                                                    <ButtonContent
                                                        onPress={() => actionsRequestRooms(3, userItem.userId)}
                                                        optionButton={typeTheme.light}
                                                    >
                                                        <Icon
                                                            name="close"
                                                            size={19}
                                                            color={theme.primarycolor}
                                                        />
                                                    </ButtonContent>
                                                </View>
                                            } />
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </ScrollView>
            </Container>

            {/* <DeleteOption onPress={() => { }}>
                <SemiBoldText>
                    Excluir todos
                </SemiBoldText>
            </DeleteOption> */}
        </SafeAreaViewContainer>
    )
}
{/* <RadioButton
    value={seledtedUsers.find(user => user == userItem) ? true : false}
    setValue={() => {
    seledtedUsers.find(user => user.userName === userItem.userName) ?
    setSelectedUsers(prev => prev.filter(user => user.userNickname !== userItem.userNickname)) :
    setSelectedUsers(prev => [...prev, userItem])
}} /> */}