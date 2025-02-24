import { useCallback, useEffect, useRef, useState } from "react";
import InputComment from "../../Components/InputComment";
import { SafeAreaViewContainer, SafeAreaViewContainer2 } from "../../Components/elementsComponents";
import { ButtonCall, ControlContainer, CountInfo, CountTitle, CountViewContainer, InviteLive, ItemMargin, LiveButton, LiveButtonTitle, LiveContainer, MessageDate, MessagesContainer, SalaChatContainer, ViewContainer } from "./style";
import { ActivityIndicator, BackHandler, FlatList, Image, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { Icon } from 'react-native-elements';
import SendedMessage from "../Chat/Components/SendedMessage";
import AdminOptions from "./Components/AdminOptions";
import RoomHeader from "./Components/RoomHeader";
import GroupMessage from "./Components/GroupMessage";
import UserOptions from "./Components/UserOptions";
import { useRoute } from "@react-navigation/native";
import { IRoom } from "../../Types/rooms.type";
import useUserProfile from "../../GlobalState/userProfile.zustand";
import { PermissionsAndroid, Platform } from 'react-native';
import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    ChannelProfileType,
} from 'react-native-agora';
import { apiClientVoiceCall } from '../../Lib/VoiceCall_api';
import UserImageRounded from "../../Components/UserImageProfile";
import { ChatList } from "./Components/ChatList";
import InputcommentChat from "../../Components/InputCommentChat";
import { useSocket } from "../../context/socket";
import { ChatContainer } from "../Chat/style";
import { getRoomMembers, getRoomsAdminList } from "../../Service/Rooms";
import AddAdmin from "../AddAdmin";
import { ListRoomUsers } from "../../Types/User";
import useRoom from "../../GlobalState/room.zustand";
import { theme } from "../../Theme/theme";

const appId = 'ae67a4d643134e3a9bff2a5bfc46bbef';

export default function RoomLive({ navigation }) {
    const { room } = useRoom()
    const { user } = useUserProfile()
    const [inputValue, setInputValue] = useState("")
    const [adminList, setAdminList] = useState<ListRoomUsers[]>([])
    const [adminLiveList, setAdminLiveList] = useState<ListRoomUsers[]>([])
    const [userAdmin, setUserAdmin] = useState(false)
    const [countUsers, setCountUsers] = useState<string[]>([])
    const [optionModal, setOptionModal] = useState(false)
    const [lastMessage, setLastMessage] = useState('')
    const [isMuted, setIsMuted] = useState(false)
    const uid = 0
    const channelName = room.room_name
    const agoraEngineRef = useRef<IRtcEngine>();
    const [isJoined, setIsJoined] = useState(false);
    const [remoteUid, setRemoteUid] = useState(0);
    const [token, setToken] = useState<string>();
    const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
    const [isSpeakerphoneEnabled, setIsSpeakerphoneEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const [roomMembers, setRoomMembers] = useState<ListRoomUsers[]>([])

    const { clearChat, verifyGroupChat, sendGroupMessage, getAllGroupMessage, currentGroupChat, messageList, setPageChat, listUserIsOn, listPartipantsLive, verifyRoomLive, updateParticipantsLiveRoom, admJoinRoomLive, countViewsLiveRoom, admLeaveRoomLive } = useSocket()

    const getAdminList = async () => {
        try {
            const response = await getRoomsAdminList(room.room_id)
            const admin = response.data.result.findIndex((item: { userId: number; }) => item.userId == user.userId)
            if (admin > -1 || room.userId == user.userId) {
                setUserAdmin(true)
            }
            setAdminList(response.data.result)
        } catch (error) {
            console.log('Erro ao obter os admins da sala.')
            console.log(error)
        }
    }

    const sendNewMessage = (message: string) => {
        setLastMessage(message)
        sendGroupMessage({
            userId: user.userId,
            messageText: message,
            chatRoomId: room.room_id.toString(),
            messageState: "send",
            messageUri: null,
            messageType: "TEXT",
            configAudMetrics: "",
            configAudTime: 0
        })
    }

    const getMembersRoom = async () => {
        try {
            const response = await getRoomMembers(room?.room_id)
            setRoomMembers(response.data.result)
        } catch (error) {
            console.log('Erro listar membros da sala.', error)
        }
    }

    useEffect(() => {
        const backAction = () => {
            clearChat()
            navigation.pop()
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        verifyGroupChat(room.room_id, room.userId)
        getAdminList()
        getMembersRoom()
    }, [])

    useEffect(() => {
        setAdminLiveList([])
        console.log(listPartipantsLive)
        listPartipantsLive.map(partipants => {
            const findIndex = adminList.findIndex(adminItem => adminItem.userId == parseInt(partipants))
            console.log(findIndex)
            if (findIndex !== -1) {
                setAdminLiveList(prev => [...prev, adminList[findIndex]])
            }
            console.log(adminList)
        })
    }, [listPartipantsLive, isJoined])

    useEffect(() => {
        if (currentGroupChat) {
            verifyRoomLive(parseInt(currentGroupChat.chatRoomId), currentGroupChat.userId)
            updateParticipantsLiveRoom(parseInt(currentGroupChat.chatRoomId))
        }
    }, [remoteUid, isJoined])

    useEffect(() => {
        getAllGroupMessage(user.userId, room.room_id)
    }, [])

    const mute = () => {
        agoraEngineRef.current?.adjustRecordingSignalVolume(0)
        setIsMuted(!isMuted);
    };

    const leave = () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            userAdmin && admLeaveRoomLive(currentGroupChat?.chatRoomId)
            setRemoteUid(0);
            setIsJoined(false);
            setIsLoading(false)
        } catch (e) {
            console.log(e);
        }
    };

    const [keyboardHeigth, setKeyBoardHeigth] = useState(0)

    const onKeyboardWillShow = (e: any) => {
        setKeyBoardHeigth(e.endCoordinates.height - 25)
    }

    const onKeyboardDidHide = (e: any) => {
        setKeyBoardHeigth(0)
    }
    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener('keyboardWillShow', onKeyboardWillShow)
        const keyboardHideListener = Keyboard.addListener('keyboardWillHide', onKeyboardDidHide)

        return () => {
            keyboardShowListener.remove()
            keyboardHideListener.remove()
        }

    }, [])


    const join = async () => {
        console.log('joining')
        if (isJoined) {
            return;
        }
        try {
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication,
            );
            agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            });
            if (userAdmin) {
                admJoinRoomLive(parseInt(currentGroupChat.chatRoomId))
            } else {
                mute()
            }
        } catch (e) {
            console.log(e);
        }
    };

    const toggleSpeaker = () => {
        const newSpeakerStatus = !isSpeakerphoneEnabled;
        agoraEngineRef.current?.setEnableSpeakerphone(newSpeakerStatus);
        setIsSpeakerphoneEnabled(newSpeakerStatus);
    };
    const muteUnmuteMicrophone = () => {
        const newMutedStatus = !isMicrophoneMuted;
        agoraEngineRef.current?.muteLocalAudioStream(newMutedStatus);
        setIsMicrophoneMuted(newMutedStatus)
    };


    const getPermission = async () => {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);
        }
    };

    const setupVoiceSDKEngine = async () => {
        try {
            if (Platform.OS === 'android') { await getPermission() };
            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;
            agoraEngine.registerEventHandler({
                onJoinChannelSuccess: () => {
                    setIsJoined(true);
                    setIsLoading(false);
                },
                onUserJoined: (_connection, Uid) => {
                    setRemoteUid(Uid);
                },
                onUserOffline: (_connection, Uid) => {
                    console.log('Remote user left the channel. uid: ' + Uid);
                    setRemoteUid(0);
                },
            });
            agoraEngine.initialize({
                appId: appId,
            });
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        (async () => {
            const response = await apiClientVoiceCall.get(`?channelName=${channelName}&role=publisher&uid=${uid}&expireTime=6400`)
            setToken(response.data.token)
            setupVoiceSDKEngine();
            !userAdmin && join()
            console.log('User Admin', userAdmin);
        })()
    }, [])



    return (
        <SafeAreaViewContainer2>
            <ChatContainer>
                <RoomHeader
                    title={room.room_name}
                    participants={roomMembers.length}
                    image={{ uri: room.image }}
                    onPressMore={() => setOptionModal(true)}
                />

                <LiveContainer>
                    <FlatList
                        data={adminLiveList}
                        keyExtractor={(item) => 'UserId:' + item.userId}
                        contentContainerStyle={{ alignItems: 'center' }}
                        renderItem={({ item }) =>
                            <>
                                {
                                    item.userId &&
                                    <ItemMargin style={{ borderColor: 'green', borderWidth: 3 }}>
                                        <UserImageRounded userId={item.userId} url={item.profileImage} size={100} />
                                    </ItemMargin>
                                }
                            </>

                        }

                    />
                    <ControlContainer>
                        {userAdmin && (<>{
                            isJoined ?
                                <LiveButton style={{ backgroundColor: 'red' }} onPress={leave}>
                                    <LiveButtonTitle>Sair da Live</LiveButtonTitle>
                                </LiveButton>
                                :
                                <LiveButton style={{ backgroundColor: 'green' }} onPress={join}>
                                    <LiveButtonTitle>Entrar</LiveButtonTitle>
                                </LiveButton>}</>)

                        }
                        {
                            userAdmin && <LiveButton onPress={() => navigation.push("AddParticipant")} style={{ backgroundColor: theme.lightGray, flexDirection: 'row', gap: 5 }}>
                                <Icon
                                    name="add"
                                    size={20}
                                    color={"#5D5D5D"}
                                    type='ionicons'
                                />
                                <LiveButtonTitle>Participante</LiveButtonTitle>
                            </LiveButton>
                        }
                        {
                            userAdmin &&
                            <View
                                style={{
                                    flexDirection: 'row',
                                    gap: 20
                                }}
                            >

                                {/* <ButtonCall onPress={toggleSpeaker}
                                    style={{ backgroundColor: isSpeakerphoneEnabled ? 'green' : 'gray' }}
                                >
                                    <Icon
                                        name={isSpeakerphoneEnabled ? 'sound' : 'sound-mute'}
                                        color={'white'}
                                        size={20}
                                        type='entypo'
                                    />
                                </ButtonCall> */}
                                <ButtonCall
                                    onPress={muteUnmuteMicrophone}
                                    style={{ backgroundColor: isMicrophoneMuted ? 'gray' : 'green' }}
                                >
                                    <Icon
                                        name={isMicrophoneMuted ? 'mic' : 'mic-off'}
                                        color={'white'}
                                        size={20}
                                        type='material'
                                    />
                                </ButtonCall>
                            </View>

                        }
                    </ControlContainer>
                    <CountViewContainer>
                        <Icon
                            name={'visibility'}
                            color={theme.primarycolor}
                            size={20}
                            type='material'
                        />
                        <CountInfo>{countViewsLiveRoom}</CountInfo>
                    </CountViewContainer>
                </LiveContainer>
                <MessagesContainer>
                    <ChatList
                        currentChat={currentGroupChat}
                        messageList={messageList}
                        setPageChat={setPageChat}
                        userId={user.userId}
                    />
                </MessagesContainer>
                <InputcommentChat
                    placeholder="Escreva uma mensagem..."
                    setValue={setInputValue}
                    onSend={sendNewMessage}
                    paddingBottom={keyboardHeigth ? keyboardHeigth + 'px' : "0px"}
                    chatRoomId={currentGroupChat?.chatRoomId}

                />

            </ChatContainer>

            {room && room.userId == user.userId ? (
                <AdminOptions
                    visibleBottonModal={optionModal}
                    setvisibleBottonModal={setOptionModal}
                />
            ) : (
                <UserOptions
                    visibleBottonModal={optionModal}
                    setvisibleBottonModal={setOptionModal}
                    room={room}
                />
            )
            }



        </SafeAreaViewContainer2>
    )
}