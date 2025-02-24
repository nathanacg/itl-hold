import React, { useRef, useState, useEffect } from 'react'
import { TouchableOpacity, PermissionsAndroid, Platform, Text, View, ActivityIndicator } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import {
    ClientRoleType,
    createAgoraRtcEngine,
    ChannelProfileType,
} from 'react-native-agora'

import { ButtonCall, ChatHeader, Container, SafeAreaViewContainer, UserName, Wrapper } from './style'
import UserImageRounded from '../../Components/UserImageProfile'
import { Icon } from 'react-native-elements'

import { useSocket } from '../../context/socket'
import { fontStyle, theme } from '../../Theme/theme'

import { apiClientVoiceCall } from '../../Lib/VoiceCall_api';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { useNotification } from '../../context/notification'
import useUserProfile from '../../GlobalState/userProfile.zustand'
import useCallStore from '../../GlobalState/useCallStorage.zustand'

const appId = 'ae67a4d643134e3a9bff2a5bfc46bbef';

export const VoiceCall = () => {
    const navigation = useNavigation<StackRoutes>()
    const { user } = useUserProfile()
    const route = useRoute()
    const params = route.params as { userId: number, channelToken: string, channel: string }
    const uid = 0
    const [channelName, setChannelName] = useState(user.userNickname)
    const agoraEngineRef = useRef<IRtcEngine>();
    const [isJoined, setIsJoined] = useState(false);
    const [remoteUid, setRemoteUid] = useState(0);
    const [token, setToken] = useState<string>('')
    const [endCall, setEndCall] = useState(false)
    const { currentChat, clearChat, handleParticipantId } = useSocket()
    const { sendNotificationCalling } = useNotification()
    const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
    const [isSpeakerphoneEnabled, setIsSpeakerphoneEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [send, setSend] = useState(false)

    const leave = () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(0);
            setIsJoined(false);
            setSend(false)
            setIsLoading(false)
        } catch (e) {
            console.warn('LeaveChannel - VoiceCall')
            console.log(e);
        }
    }

    const join = async () => {
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
            setIsLoading(true)
        } catch (e) {
            console.warn('join - VoiceCall')
            console.log(e)
            setIsLoading(false)
        }
    }

    const toggleSpeaker = () => {
        const newSpeakerStatus = !isSpeakerphoneEnabled;
        agoraEngineRef.current?.setEnableSpeakerphone(newSpeakerStatus);
        setIsSpeakerphoneEnabled(newSpeakerStatus);
    }

    const muteUnmuteMicrophone = () => {
        const newMutedStatus = !isMicrophoneMuted;
        agoraEngineRef.current?.muteLocalAudioStream(newMutedStatus);
        setIsMicrophoneMuted(newMutedStatus)
    }

    const getPermission = async () => {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ])
        }
    }

    const setupVoiceSDKEngine = async () => {
        try {
            if (Platform.OS === 'android') { await getPermission() };
            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;
            agoraEngine.registerEventHandler({
                onJoinChannelSuccess: () => {
                    console.log('Successfully joined the channel ' + channelName);
                    setIsJoined(true);
                    if (Platform.OS == 'ios') {
                        console.log('CHAMADA IPHONE')
                    } else {
                        console.log('CHAMADA ANDROID')
                    }
                    setSend(true)

                },
                onUserJoined: (_connection, Uid) => {
                    console.log('Remote user joined with uid ' + Uid);
                    setRemoteUid(Uid);
                    setIsLoading(false)
                    if (Platform.OS == 'ios') {
                        console.log('ENTROU USER NO IPHONE', Uid)
                    } else {
                        console.log('ENTROU USER NO ANDROID', Uid)
                    }
                },
                onUserOffline: (_connection, Uid) => {
                    console.log('Remote user left the channel. uid: ' + Uid);
                    leave()
                    setRemoteUid(0);
                },
            });
            agoraEngine.initialize({
                appId: appId,
            });
        } catch (e) {
            console.warn('SetupVoiceSDKEngine - VoiceCall')
            console.log(e);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await apiClientVoiceCall.get(`?channelName=${channelName}&role=publisher&uid=${uid}&expireTime=6400`)
                setToken(response.data.token)
                setupVoiceSDKEngine()
            } catch (error) {
                console.warn('ApiClientVoiceCall - VoiceCall')
                console.log(error)
            }
        })()
    }, []);

    useEffect(() => {
        if (send) {
            sendNotificationCalling(currentChat?.chatParticipantUserId, token, channelName)
            console.log('Send Notification')
        }
    }, [send, token])

    return (
        <SafeAreaViewContainer>
            <ChatHeader>
                <TouchableOpacity onPress={() => {
                    leave()
                    navigation.navigate('Chat')
                }} >
                    <Icon
                        name='chevron-small-left'
                        type='entypo'
                        color={theme.primarycolor}
                        size={40}
                    />
                </TouchableOpacity>
                <UserName>{currentChat?.userNickname}</UserName>
            </ChatHeader>
            <Container>

                {currentChat && <UserImageRounded url={currentChat.profileImage} size={120} />}

                <UserName>{'\n'}{currentChat?.userNickname}</UserName>
                {!isLoading ? (
                    <Text
                        style={{
                            marginTop: 20,
                            fontFamily: fontStyle.semiBold,
                            color: theme.textligthGray,
                            fontSize: 16
                        }}
                    >Chamar</Text>
                ) : (
                    <Text
                        style={{
                            marginTop: 20,
                            fontWeight: '700',
                            color: theme.textligthGray,
                            fontSize: 16
                        }}
                    >Chamando...</Text>
                )}
                <Wrapper>
                    <ButtonCall onPress={() => {
                        if (isJoined) {
                            return leave()
                        }
                        return join()
                    }}
                        style={{ backgroundColor: !isLoading ? isJoined ? remoteUid ? 'red' : 'blue' : 'green' : 'blue' }}>
                        {
                            isLoading ? (
                                <ActivityIndicator
                                    animating
                                    size={20}
                                />
                            ) : (
                                <MaterialIcon
                                    name={isJoined ? "phone-callback" : "local-phone"}
                                    size={38}
                                    color={theme.secondaryColor}
                                    style={{ marginRight: -2 }}
                                    adjustsFontSizeToFit
                                />
                            )
                        }

                    </ButtonCall>
                    {
                        isLoading && (
                            <ButtonCall onPress={leave}
                                style={{ backgroundColor: 'red' }}
                            >
                                <MaterialIcon
                                    name={"phone-callback"}
                                    size={38}
                                    color={theme.secondaryColor}
                                    adjustsFontSizeToFit
                                />
                            </ButtonCall>
                        )
                    }
                    {isJoined && !isLoading && (
                        <ButtonCall onPress={toggleSpeaker}
                            style={{ backgroundColor: isSpeakerphoneEnabled ? 'green' : 'grey' }}
                        >
                            <Icon
                                name={isSpeakerphoneEnabled ? 'sound' : 'sound-mute'}
                                type='entypo'
                                color={'white'}
                                size={35}
                            />
                        </ButtonCall>
                    )}
                    {isJoined && !isLoading && (
                        <ButtonCall
                            onPress={muteUnmuteMicrophone}
                            style={{ backgroundColor: isMicrophoneMuted ? 'gray' : 'green' }}
                        >
                            <Icon
                                name={isMicrophoneMuted ? 'mic-off' : 'mic'}
                                type='material'
                                color={'white'}
                                size={35}
                            />
                        </ButtonCall>
                    )}

                </Wrapper>

            </Container>
        </SafeAreaViewContainer>
    )
}