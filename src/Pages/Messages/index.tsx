import React, { SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import { useSocket } from '../../context/socket'
import { theme } from '../../Theme/theme'

import {
    MessagesContainer,
    ButttonsContainer,
    InputContainer,
    NotificationsInfo,
    Button,
    ButtonText,
    Notification
} from './style'

import { SafeAreaViewContainer } from '../../Components/elementsComponents'
import ProfileHeader from '../../Components/ProfileHeader'
import MessageCard from '../../Components/MessageCard'
import SearchInput from '../../Components/SearchInput'

import ConfirmModal from '../../Components/ConfirmModal'
import ListUsersCardChat from '../../Components/ListUsersCardChat'
import { TextLightGray } from '../../Components/configurationsElemetsStyle'

import useUserProfile from '../../GlobalState/userProfile.zustand'
import { findFriends, getProfiles } from '../../Service/Profile'
import { ProfileUser } from '../../Types/User'

interface MessageProps {
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

export default function Messages({ setvisibleBottonModal }: MessageProps) {
    const navigation = useNavigation<StackRoutes>()
    const [userList, setUserList] = useState<ProfileUser[]>([])
    const [inputValue, setInputValue] = useState("")
    const [visibleConfirmModal, setVisibleConfirmModal] = useState(false)
    const [currentChat, setCurrentChat] = useState("")

    const { getAllchat,
        chatList,
        handleSetChat,
        handleParticipantId,
        deleteChat,
        solicitationsList,
        clearAllListChat } = useSocket()

    const { user } = useUserProfile()

    useEffect(() => {
        findFriends(inputValue).then(res => {
            setUserList(res.data)
        })
    }, [inputValue])


    const handleDeleteChat = (roomId: string) => {
        setCurrentChat(roomId)
        setVisibleConfirmModal(true)
    }

    function limitNicknameLength(nickname: string, maxLength: number) {
        if (nickname?.length > maxLength) {
            return nickname.slice(0, maxLength) + '...'
        }
        return nickname
    }
    const flatListRef = useRef<FlatList>(null)

    const forceUpdateFlatList = () => {
        if (flatListRef.current) {
            flatListRef.current.forceUpdate()
        }
    }
    useFocusEffect(
        useCallback(() => {
            getAllchat()

            return () => {
                clearAllListChat()
            };
        }, [])
    );
    useEffect(() => {
        getAllchat()
        forceUpdateFlatList()
    }, [navigation])


    return (
        <SafeAreaViewContainer>
            <MessagesContainer>
                <ProfileHeader
                    userImage={user.profileImage}
                    title={user.userNickname}
                />
                <ButttonsContainer>
                    <Button background={theme.primarycolor}>
                        <ButtonText color={theme.secondaryColor}>Amigos</ButtonText>
                    </Button>
                    {/* <Button onPress={() => navigation.navigate("RoomMessages")}>
                        <ButtonText>Salas</ButtonText>
                    </Button> */}
                    <Button onPress={() => navigation.navigate("MessageSolicitation")}>
                        <ButtonText>Solicitações</ButtonText>
                        {solicitationsList?.length > 0 && (
                            <NotificationsInfo>
                                <Notification>{solicitationsList.length}</Notification>
                            </NotificationsInfo>
                        )}
                    </Button>
                </ButttonsContainer>
                <InputContainer>
                    <SearchInput
                        placeholder='Pesquisar...'
                        marginTop="20px"
                        marginBottom="20px"
                        value={inputValue}
                        onSetText={setInputValue}
                    />
                </InputContainer>
                {inputValue && (
                    <FlatList
                        data={userList}
                        keyExtractor={(item) => "chatlist" + item.userId}
                        ListEmptyComponent={
                            <View style={{ alignSelf: 'center' }}>
                                <TextLightGray>Nada encontrado.</TextLightGray>
                            </View>
                        }
                        renderItem={({ item, index }) => (
                            <ListUsersCardChat
                                key={index}
                                userId={item.userId}
                                userNickname={item.userNickname}
                                profileImage={item.profileImage}
                                userName={limitNicknameLength(item.userName, 30)}
                                onPress={() => {
                                    handleParticipantId(item.userId)
                                    getAllchat()
                                    forceUpdateFlatList()
                                    navigation.push("Chat")
                                }}
                            />
                        )}
                    />
                )}


                {!inputValue && (

                    <FlatList
                        data={chatList}
                        showsVerticalScrollIndicator={false}
                        ref={flatListRef}
                        keyExtractor={(item) => "chatlist" + item.chatId}
                        renderItem={({ item, index }) => {
                            return (
                                <MessageCard
                                    key={index}
                                    chatParticipantUserId={item.chatParticipantUserId}
                                    name={item.userName}
                                    nickName={item.userNickname}
                                    lastMessageUserId={item.userId}
                                    lastMessage={item.lastMessage}
                                    lastMessageType={item.lastMessageType}
                                    configAudTime={item.configAudTime}
                                    imageURl={item.profileImage}
                                    darken={index % 2 == 0}
                                    onDelete={() => { handleDeleteChat(item.chatRoomId) }}
                                    onPress={() => {
                                        handleSetChat(item)
                                        navigation.push("Chat")
                                    }}
                                    messageCount={item.unreadMessagens}
                                    messageTime={item.chatDate}
                                />
                            )
                        }}
                    />
                )}


                <ConfirmModal
                    setvisibleBottonModal={setvisibleBottonModal}
                    isModalVisible={visibleConfirmModal}
                    onCancel={() => { setVisibleConfirmModal(false) }}
                    onConfirm={() => {
                        deleteChat(currentChat)
                        setVisibleConfirmModal(false)
                        getAllchat()
                    }}
                    title="Excluir chat?"
                    text="Ao excluir esse chat, não será possível ver as mensagens anteriores"
                />
            </MessagesContainer>
        </SafeAreaViewContainer>
    )
}