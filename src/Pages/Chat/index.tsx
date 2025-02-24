import { SetStateAction, memo, useEffect, useRef, useState } from 'react'
import { Icon } from 'react-native-elements'
import {
    View, TouchableOpacity, FlatList, Text, BackHandler,
    ActivityIndicator, Image, Platform, Dimensions, KeyboardAvoidingView, ScrollView, Modal
} from 'react-native'

import { theme } from '../../Theme/theme'
import DarkButton from '../../Components/DarkButton'
import ReceivedMessage from './Components/ReceivedMessage'

import InputCommentChat from '../../Components/InputCommentChat'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'
import DocumentPicker from 'react-native-document-picker'

import {
    ChatContainer,
    ChatHeader,
    UserAddress,
    UserName,
    UserName2,
    UserName22,
    InitialChatContainer,
    MessagesContainer,
    AllowAlert,
    AllowQuestion,
    AllowText,
    MessageOptions,
    OptionText,
    Divisor,
    ModalImage,
    ModalOptions,
    UserOnline,
    Green,
    UserImage,
    MessageBox,
    MessageDateGroup,
    StoryMessageContainer,
    Container,
    MessageItemContainer,
    Title,
    ModalContainer
} from './style';

import SendedMessage from './Components/SendedMessage'
import PublicationShare from './Components/PublicationShare'
import BottomModal from '../../Components/BottomModal'
import MessageOptionModal from './Components/MessageOptionModal'
import { useSocket } from '../../context/socket'
import { CreateChat, MessageChat } from '../../Types/chats.type'
import useCreatePost from '../../GlobalState/createPost.zustand'


import AudioMessage from './Components/AudioMessage'
import AudioMessageReceived from './Components/AudioMessageReceived'
import DropShare from './Components/DropShare'
import UserImageRounded from '../../Components/UserImageProfile'
import NavigateToProfile from '../../Components/NavigatetoProfile'
import RoomInvite from './Components/RoomInvite'
import useStories from '../../GlobalState/stories.zustand'
import { getUserStories } from '../../Service/Story'
import { FileMessage } from './Components/FileMessage'
import ImagePicker from 'react-native-image-crop-picker'
import useUserProfile from '../../GlobalState/userProfile.zustand'
import { FileMessageReceived } from './Components/FileMessageReceived'

const windowHeight = Dimensions.get('window').height;

interface IDocument {
    uri: string
    name: string
    type: string
}


export default function Chat() {
    const route = useRoute()
    const params = route.params as {
        userId: number
    }
    const navigation = useNavigation<StackRoutes>()
    const [inputValue, setInputValue] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showMask, setShowMask] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState<{ positionX: number, positionY: number, text: string, timeHour: string }>()

    const [document, setDocument] = useState<IDocument>()
    const [typeDocument, setTypeDocument] = useState<string>('')
    const [modalDocument, setModalDocument] = useState<boolean>(false)

    const { sendFile, currentChat, deleteMessage, messageList, userId, handleParticipantId, sendMessage, forwardMessage, clearChat, changeMessageState, getAllMessage, setPageChat, endChat, acceptOneChatSolicitation, removeOneChatSolicitation } = useSocket()

    async function handleGetDocument() {
        try {
            const response = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                copyTo: "cachesDirectory"
            })
            if (response[0]) {
                setDocument({
                    uri: response[0].fileCopyUri,
                    name: response[0].name,
                    type: response[0].type
                })
                setTypeDocument(response[0].type.split('/')[0])
                handleSendFile('', typeDocument)
                setIsModalOpen(false)
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Seleção cancelada');
            } else {
                console.log('Erro ao selecionar o arquivo:', err);
            }
        }
    }



    const handleGetPhotoFromGalery = async () => {
        try {
            const responsePicker = await ImagePicker.openPicker({
                width: 200,
                maxFiles: 1,
                mediaType: 'photo',
                cropperToolbarTitle: 'Editar',
                cropperCancelText: 'Cancelar',
                cropperChooseText: 'Escolher',
                loadingLabelText: 'Carregando...',
                cropperTintColor: 'blue',
                height: 200,
                cropping: true,
            })
            const nameImage = responsePicker.path.split('/')
            setDocument({
                uri: responsePicker.path,
                name: nameImage[nameImage.length - 1] || '',
                type: responsePicker.mime
            })
            setTypeDocument(responsePicker.mime.split('/')[0])
            handleSendFile(' ', typeDocument)
            setIsModalOpen(false)
        } catch (error) {
            console.warn('openPicker - Chat')
            console.log(error)
        }

    }

    const handleGetPhotoFromCamera = async () => {
        try {
            const responsePicker = await ImagePicker.openCamera({
                width: 200,
                maxFiles: 1,
                mediaType: 'photo',
                cropperToolbarTitle: 'Editar',
                cropperCancelText: 'Cancelar',
                cropperChooseText: 'Escolher',
                loadingLabelText: 'Carregando...',
                cropperTintColor: 'blue',
                height: 200,
                cropping: true,
            })
            const nameImage = responsePicker.path.split('/')
            setDocument({
                uri: responsePicker.path,
                name: nameImage[nameImage.length - 1] || '',
                type: responsePicker.mime
            })
            setTypeDocument(responsePicker.mime.split('/')[0])
            handleSendFile(' ', typeDocument)
            setIsModalOpen(false)
        } catch (error) {
            console.warn('openCamera - Chat')
            console.log(error)
        }

    }

    useEffect(() => {
        if (params) {
            handleParticipantId(params.userId)
        }
    }, [])

    useEffect(() => {
        const backAction = () => {
            clearChat()
            navigation.pop()
            return true
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, [])

    useEffect(() => {
        const unrended = messageList.filter(message => message.messageState == "send" && message.userId != userId).map(message => message.messageCummomId || '')
        if (unrended.length > 0 && currentChat) {
            changeMessageState(unrended, "read", currentChat.chatRoomId)
        }
    }, [messageList])

    const sendNewMessage = (text: string) => {
        sendMessage(text)
    }

    /* useEffect(() => {

           getUserOnline(currentChat?.chatParticipantUserId)
               .then(res => setIsOnline(res.online))
               .catch((e) => {
                   console.warn('GetUserOnline (else) - UserImageProfile')
                   console.log(e)
               }) 

    }, [currentChat?.chatParticipantUserId])*/

    function limitNicknameLength(nickname: string, maxLength: number) {
        if (nickname?.length > maxLength) {
            return nickname.slice(0, maxLength) + '...'
        }
        return nickname
    }
    if (!currentChat) {
        return (
            <Container>
                <ActivityIndicator
                    animating
                    style={{ marginTop: '80%' }}
                    size={30}
                    color={theme.primarycolor}
                />
            </Container>
        )
    }

    const handleSendFile = async (message: string, type: string) => {
        const data = new FormData();
        data.append('file', document);
        await sendFile(data, message, type, currentChat.chatRoomId)
    }


    return (
        <Container>
            <MessageOptionModal
                isVisible={showMask}
                setVissible={setShowMask}
                selectedMessage={selectedMessage}
            />
            <ChatHeader>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <TouchableOpacity onPress={() => {
                        clearChat()
                        navigation.pop()
                    }} >
                        <Icon
                            name='chevron-small-left'
                            type='entypo'
                            color={theme.primarycolor}
                            size={40}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            gap: 8
                        }}
                    >

                        <UserImage source={{ uri: currentChat.profileImage, cache: "reload" }} />

                        <View style={{
                            flexDirection: 'column',
                        }}>
                            <NavigateToProfile userNickName={currentChat.userNickname}>
                                <UserName>{currentChat.userNickname}</UserName>
                            </NavigateToProfile>
                            <UserName2>{limitNicknameLength(currentChat.userName, 30)}</UserName2>
                            {/*  {isTyping && <UserOnline>digitando...</UserOnline>} */}
                        </View>
                    </View>


                    {/*     <TouchableOpacity onPress={() => { }}>
                                <Icon
                                    name='video-camera'
                                    type='entypo'
                                    color={theme.primarycolor}
                                    size={25}
                                />
                            </TouchableOpacity> */}
                    {/*    <TouchableOpacity onPress={() => navigation.push("VoiceCall", { userId: userId })}>
                        <Icon
                            name='phone'
                            type='entypo'
                            color={theme.primarycolor}
                            size={25}
                            style={{ marginRight: 10 }}
                        />
                    </TouchableOpacity> */}
                    {/*  <TouchableOpacity onPress={() => { }}>
                                <Icon
                                    name='dots-three-vertical'
                                    type='entypo'
                                    color={theme.primarycolor}
                                    size={25}
                                />
                            </TouchableOpacity> */}
                </View>
            </ChatHeader>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={0}
                style={{
                    flex: 1
                }}
            >
                <ChatList
                    endChat={endChat}
                    currentChat={currentChat}
                    messageList={messageList}
                    setPageChat={setPageChat}
                    userId={userId}
                />
                {!currentChat.chatSolicited ? (
                    <InputCommentChat
                        onOpenGalery={() => setIsModalOpen(true)}
                        onOpenCamera={handleGetPhotoFromCamera}
                        placeholder="Escreva uma mensagem..."
                        setValue={setInputValue}
                        onSend={sendNewMessage}
                        options
                    />

                ) : (
                    <AllowAlert>
                        <AllowQuestion>Aceitar solicitação de mensagem?</AllowQuestion>
                        <AllowText>Ao aceitar esta solicitação de mensagem, o usuário saberá que a mensagem foi vista e quando.</AllowText>
                        <MessageOptions>
                            <OptionText onPress={() => {
                                removeOneChatSolicitation(currentChat.chatRoomId)
                                navigation.navigate("Messages")
                            }}>Bloquear</OptionText>
                            <Divisor />
                            <OptionText onPress={() => {
                                removeOneChatSolicitation(currentChat.chatRoomId)
                                navigation.navigate("MessageSolicitation")
                            }}>Remover</OptionText>
                            <Divisor />
                            <OptionText onPress={() => acceptOneChatSolicitation(currentChat.chatRoomId, currentChat)}>Aceitar</OptionText>
                        </MessageOptions>
                    </AllowAlert>
                )}

            </KeyboardAvoidingView>
            <BottomModal
                visibleBottonModal={isModalOpen}
                setvisibleBottonModal={setIsModalOpen}
                title=""
            >
                <ModalOptions onPress={handleGetPhotoFromGalery}>
                    <ModalImage source={require("../../Assets/Icons/galery.png")} />
                    <Text>Galeria</Text>
                </ModalOptions>

                <ModalOptions onPress={handleGetDocument}>
                    <ModalImage source={require("../../Assets/Icons/docs.png")} />
                    <Text>Documento</Text>
                </ModalOptions>
            </BottomModal>

            <Modal
                transparent
                visible={modalDocument}
            >
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <ScrollView
                        automaticallyAdjustKeyboardInsets
                        contentContainerStyle={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setModalDocument(false)
                            }}
                            style={{
                                position: 'absolute',
                                backgroundColor: '#0e0e0e6c',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                        <View
                            style={{
                                width: '95%',
                                paddingBottom: 10,
                                paddingTop: 20,
                                borderTopRightRadius: 9,
                                borderTopLeftRadius: 9,
                                backgroundColor: theme.secondaryColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {
                                typeDocument == 'image' ? (
                                    <Image
                                        source={{ uri: document?.uri }}
                                        style={{
                                            width: '95%',
                                            height: 400,
                                            resizeMode: 'contain',
                                            marginBottom: 20,
                                        }}
                                    />

                                ) : (
                                    <></>
                                )
                            }
                            <InputCommentChat
                                onOpenGalery={() => setIsModalOpen(true)}
                                placeholder="Escreva uma mensagem..."
                                setValue={setInputValue}
                                onSend={(text) => {
                                    handleSendFile(text, typeDocument)
                                    setModalDocument(false)
                                }}
                                notAudio
                            />
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </Container >
    )
}
interface RenderListProps {
    setPageChat: React.Dispatch<SetStateAction<number>>
    messageList?: MessageChat[]
    currentChat: CreateChat
    userId: number
    /*  selectMessage: () => void */
    endChat?: boolean
    setIsModalOpen?: React.Dispatch<SetStateAction<boolean>>
}

interface MessageGroupProps {
    date: string | Date,
    messages: MessageChat[]
}

interface StoryNavigationProps {
    isMy?: boolean
    currentChat: CreateChat
    message: MessageChat
}

const StoryNavigation = memo(({ isMy, currentChat, message }: StoryNavigationProps) => {
    const { setCurrentStory, setModalVisible } = useStories()
    const [isLoadStory, setIsLoadStory] = useState<boolean>(false)
    const [errorCartaz, setErrorCartaz] = useState<boolean>(false)
    const [storyLoaded, setStoryLoaded] = useState([])
    const { user } = useUserProfile()

    const handleOpenCartaz = () => {
        setCurrentStory(storyLoaded)
        setModalVisible(true)
    }

    useEffect(() => {
        (async () => {
            setIsLoadStory(true)
            try {
                const response = await getUserStories(isMy ? currentChat.chatParticipantUserId : user.userId)
                const filtered = response.data.filter((item: { postHexId: string | null }) => item.postHexId == message.messageUri)
                if (filtered.length < 1) {
                    setErrorCartaz(true)
                } else {
                    setStoryLoaded(filtered)
                }

            } catch (error) {
                console.warn('getUserStories - Chat')
                console.log(error)
                setErrorCartaz(true)
            } finally {
                setIsLoadStory(false)
            }
        })()
    }, [])


    return (
        <StoryMessageContainer isMy={isMy} onPress={handleOpenCartaz} disable={errorCartaz}>
            {errorCartaz ?
                <Title>Cartaz excluído</Title>
                :
                isLoadStory ?
                    <ActivityIndicator animating size={16} style={{ margin: 10 }} />
                    :
                    <Title>Ver cartaz</Title>
            }
        </StoryMessageContainer>
    )
})


const ChatList = memo(({
    setPageChat,
    currentChat,
    userId,
    endChat,
    setIsModalOpen
}: RenderListProps) => {

    const messagesEndRef = useRef(null);
    const navigation = useNavigation<StackRoutes>()
    const { messageList } = useSocket()



    // const { setNickName } = useCreatePost()
    const [messageGroup, setMessageGroup] = useState<MessageGroupProps[]>([])



    /* useEffect(() => {
        const output: MessageGroupProps[] = []
        messageList.map((item) => {
            if (item.messageDate !== undefined) {


                const date = `${item.messageDate}`.split("T")[0]

                const response = output.find((item) => { return `${item.date}`.split("T")[0] === date })

                if (!response) {
                    output.push(
                        {
                            date: item.messageDate,
                            messages: [item]
                        }
                    )
                } else {
                    response.messages.push(item)
                }
            }
        })
        setMessageGroup(output)

    }, []) */


    const listRef = useRef<FlatList>()

    useEffect(() => {
        if (listRef.current && messageList.length > 0) {
            listRef.current.scrollToEnd({
                animated: true,
            })
        }
    }, [messageList])

    function limitNicknameLength(nickname: string, maxLength: number) {
        if (nickname?.length > maxLength) {
            return nickname.slice(0, maxLength) + '...'
        }
        return nickname
    }


    return messageList && (
        <>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                showsHorizontalScrollIndicator={false}
                ref={ref => { this.scrollView = ref }}
                onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: false })}
                contentContainerStyle={{ paddingBottom: 10 }}
            >
                <InitialChatContainer>
                    <UserImageRounded url={currentChat.profileImage} size={80} />
                    <UserName style={{ marginTop: 10 }}>{currentChat.userNickname}</UserName>
                    <UserName22 style={{ marginBottom: 13 }}>{limitNicknameLength(currentChat.userName, 30)}</UserName22>
                    <DarkButton size="sm" title="Ver perfil" onPress={() => {
                        // setNickName(currentChat.userNickname)
                        navigation.push('TabNavigation', {
                            screen: 'OtherProfileScreen',
                            params: { nickName: currentChat.userNickname },
                        });
                    }} />
                </InitialChatContainer>
                {messageList.map((item, index) => (
                    <MessageItemContainer
                        key={index}
                    >
                        {item.userId == userId ?
                            <>
                                {item.messageType == "TEXT" &&
                                    <SendedMessage
                                        setvisibleBottonModal={setIsModalOpen}
                                        read={item.messageState == "read"}
                                        onPressFunction={() => { }}
                                        text={item.messageText}
                                        timeHour={item.messageDate}
                                        forwardMessage={item.forwarded}
                                        messageCummomId={item.messageCummomId}
                                    />
                                }
                                {item.messageType == "POST" &&
                                    <PublicationShare isMy={true} postHexId={item.messageUri || ''} />
                                }
                                {item.messageType == "DROP" &&
                                    <DropShare isMy={true} postHexId={item.messageUri || ''} />
                                }
                                {item.messageType == "ROOM" &&
                                    <RoomInvite isMy={true} RooomName={'Sala'} description={'teste sala'} idRoom={item.messageUri} />
                                }
                                {item.messageType == "AUDIO" &&
                                    <AudioMessage
                                        read={item.messageState == "read"}
                                        onPressFunction={() => { }}
                                        uri={item.messageUri || ''}
                                        timeHour={item.messageDate}
                                        messageCummomId={item.messageCummomId}
                                        audioTotalTime={item?.configAudTime}
                                        configAudMetrics={item?.configAudMetrics}
                                        forwardMessage={item.forwarded}
                                        messageId={item.messageId}
                                    />
                                }
                                {item.messageType == "CARTAZ" &&
                                    <StoryNavigation isMy currentChat={currentChat} message={item} />
                                }
                                {item.messageType == "FILE" &&
                                    <FileMessage
                                        message={item}
                                        forwardMessageState={item.forwarded}
                                    />
                                }
                                {item.messageType == "IMAGE" &&
                                    <FileMessage
                                        message={item}
                                        forwardMessageState={item.forwarded}
                                        userImage={currentChat.profileImage}
                                        userName={currentChat.userNickname}
                                    />
                                }
                            </>
                            :
                            <>
                                {item.messageType == "TEXT" &&
                                    <ReceivedMessage
                                        messageId={item.messageId}
                                        onLongPress={() => { }}
                                        userImage={currentChat.profileImage}
                                        text={item.messageText}
                                        timeHour={item.messageDate}
                                        forwardMessage={item.forwarded}
                                    />
                                }
                                {item.messageType == "POST" &&
                                    <PublicationShare isMy={false} postHexId={item.messageUri || ''} />}

                                {item.messageType == "DROP" &&
                                    <DropShare isMy={false} postHexId={item.messageUri || ''} />
                                }
                                {item.messageType == "ROOM" &&
                                    <RoomInvite isMy={false} idRoom={item.messageUri} />
                                }

                                {item.messageType == "AUDIO" &&
                                    <AudioMessageReceived
                                        messageId={item.messageId}
                                        forwardMessage={item.forwarded}
                                        read={item.messageState == "read"}
                                        onPressFunction={() => { }}
                                        uri={item.messageUri || ''}
                                        userName={item.userName}
                                        timeHour={item.messageDate}
                                        userImage={currentChat.profileImage}
                                        audioTotalTime={item?.configAudTime}
                                        configAudMetrics={item?.configAudMetrics} />
                                }
                                {item.messageType == "CARTAZ" &&
                                    <StoryNavigation isMy={false} currentChat={currentChat} message={item} />
                                }
                                {item.messageType == "FILE" &&
                                    <FileMessageReceived
                                        message={item}
                                        received
                                        forwardMessageState={item.forwarded}
                                    />
                                }
                                {item.messageType == "IMAGE" &&
                                    <FileMessageReceived
                                        message={item}
                                        received
                                        userImage={currentChat.profileImage}
                                        userName={currentChat.userNickname}
                                        forwardMessageState={item.forwarded}
                                    />
                                }
                            </>

                        }
                    </MessageItemContainer>
                ))}
            </ScrollView>
            {/* Eu coloquei um scrollview para ver se revolve o erro do input não descendo as vezes */}
            {/*  {false &&
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ref={listRef}
                    onContentSizeChange={() => {
                        if (listRef.current && messageList.length > 0) {
                            listRef.current.scrollToEnd({
                                animated: false,
                            })
                        }
                    }}
                    ListHeaderComponent={
                        <InitialChatContainer>
                            <UserImageRounded url={currentChat.profileImage} size={80} />
                            <UserName style={{ marginTop: 10 }}>{currentChat.userNickname}</UserName>
                            <UserName22 style={{ marginBottom: 13 }}>{limitNicknameLength(currentChat.userName, 30)}</UserName22>
                            <DarkButton size="sm" title="Ver perfil" onPress={() => {
                                setNickName(currentChat.userNickname)
                                navigation.navigate("OtherProfileScreen")
                            }} />
                        </InitialChatContainer>
                    }
                    ListFooterComponent={<View style={{ width: '100%', height: 20 }} />}
                    data={messageList}
                    keyExtractor={(item, index) => "message" + item.messageId + index}
                    renderItem={({ item, index }) => (
                        <MessageItemContainer>
                            {item.userId == userId ?
                                <>
                                    {item.messageType == "TEXT" &&
                                        <SendedMessage
                                            setvisibleBottonModal={setIsModalOpen}
                                            read={item.messageState == "read"}
                                            onPressFunction={() => { }}
                                            text={item.messageText}
                                            timeHour={item.messageDate}
                                            messageCummomId={item.messageCummomId}
                                        />
                                    }
                                    {item.messageType == "POST" &&
                                        <PublicationShare isMy={true} postHexId={item.messageUri || ''} />
                                    }
                                    {item.messageType == "DROP" &&
                                        <DropShare isMy={true} postHexId={item.messageUri || ''} />
                                    }
                                    {item.messageType == "ROOM" &&
                                        <RoomInvite isMy={true} RooomName={'Sala'} description={'teste sala'} idRoom={item.messageUri} />
                                    }
                                    {item.messageType == "AUDIO" &&
                                        <AudioMessage
                                            read={item.messageState == "read"}
                                            onPressFunction={() => { }}
                                            uri={item.messageUri || ''}
                                            timeHour={item.messageDate}
                                            audioTotalTime={item?.configAudTime}
                                            configAudMetrics={item?.configAudMetrics}
                                            messageId={item.messageId} />

                                    }
                                    {item.messageType == "CARTAZ" &&
                                        <StoryNavigation isMy currentChat={currentChat} message={item} />
                                    }
                                </>
                                :
                                <>
                                    {item.messageType == "TEXT" &&
                                        <ReceivedMessage
                                            onLongPress={() => { }}
                                            userImage={currentChat.profileImage}
                                            text={item.messageText}
                                            timeHour={item.messageDate}
                                        />
                                    }
                                    {item.messageType == "POST" &&
                                        <PublicationShare isMy={false} postHexId={item.messageUri || ''} />}

                                    {item.messageType == "DROP" &&
                                        <DropShare isMy={true} postHexId={item.messageUri || ''} />
                                    }
                                    {item.messageType == "ROOM" &&
                                        <RoomInvite isMy={false} idRoom={item.messageUri} />
                                    }

                                    {item.messageType == "AUDIO" &&
                                        <AudioMessageReceived
                                            read={item.messageState == "read"}
                                            onPressFunction={() => { }}
                                            uri={item.messageUri || ''}
                                            userName={item.userName}
                                            timeHour={item.messageDate}
                                            userImage={currentChat.profileImage}
                                            audioTotalTime={item?.configAudTime}
                                            configAudMetrics={item?.configAudMetrics} />
                                    }
                                </>

                            }
                        </MessageItemContainer>

                    )}

                />} */}
        </>
    )
})