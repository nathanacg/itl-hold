import React, { useRef, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Vibration, View, PermissionsAndroid, Platform, StatusBar, ActivityIndicator } from 'react-native';
import RNCallKeep from 'react-native-callkeep';

import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    ChannelProfileType,
} from 'react-native-agora';

import useUserProfile from '../../GlobalState/userProfile.zustand';
import { ButtonCall, ChatHeader, Container, SafeAreaViewContainer, UserName, Wrapper } from './style';
import UserImageRounded from '../../Components/UserImageProfile';
import { Icon } from 'react-native-elements';
import { useSocket } from '../../context/socket';
import { theme } from '../../Theme/theme';
import { StackRoutes } from '../../Routes/StackTypes';

import { apiClientVoiceCall } from '../../Lib/VoiceCall_api';
import { useNotification } from '../../context/notification';
import { TextRegular11, TextRegular12 } from '../../Components/configurationsElemetsStyle';
import { getOtherProfile } from '../../Service/Profile';


const appId = 'ae67a4d643134e3a9bff2a5bfc46bbef';

export const ReceiveCall = () => {
    const navigation = useNavigation<StackRoutes>()
    const { user } = useUserProfile()
    const route = useRoute()
    const params = route.params as { userId: number, channelToken: string, channel: string, uuid: string }
    const uid = 0
    const [channelName, setChannelName] = useState(user.userNickname)
    const agoraEngineRef = useRef<IRtcEngine>()
    const [isJoined, setIsJoined] = useState(false)
    const [remoteUid, setRemoteUid] = useState(0)
    const [token, setToken] = useState<string>('')
    const { currentChat, handleParticipantId } = useSocket()
    const { sendNotificationCalling } = useNotification()
    const [isCallReceived, setIsCallReceived] = useState(false)
    const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false)
    const [isSpeakerphoneEnabled, setIsSpeakerphoneEnabled] = useState(false)

    const leave = () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(0);
            setIsJoined(false);
            setIsCallReceived(false);
            navigation.navigate('FeedScreen')
        } catch (e) {
            console.warn('Leave Channel - ReceiveCall')
            console.log(e);
        }
    };


    const join = async () => {
        if (isJoined) {
            return;
        }
        try {
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication,
            );
            agoraEngineRef.current?.joinChannel(params.channelToken, params.channel, uid, {
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            });

        } catch (e) {
            console.warn('joinChannel - ReceiveCall')
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
                    setIsCallReceived(true)
                    console.log('Joined')
                },
                onUserJoined: (_connection: any, Uid: string | React.SetStateAction<number>) => {
                    setRemoteUid(Uid);
                    console.log('UserId', Uid)
                    RNCallKeep.endCall(params.uuid)
                },
                onUserOffline: (_connection: any, Uid: string) => {
                    rejectCall()
                    setRemoteUid(0);
                }
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
            handleParticipantId(params.userId)
            setChannelName(params.channel)
            setToken(params.channelToken)
            setupVoiceSDKEngine();
            answerCall()
            console.log('Veio pela notificação')
        })();
    }, [params])

    const answerCall = () => {
        console.log('Atendeu')
        console.log(params)
        join();
    };

    const rejectCall = () => {
        setIsCallReceived(false);
        leave();
        navigation.navigate("Chat")
    };


    return (
        <SafeAreaViewContainer>
            <StatusBar barStyle={'light-content'} />
            <Container>
                <UserImageRounded url={currentChat?.profileImage} size={200} />
                <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <UserName>{currentChat?.userNickname}</UserName>
                    <TextRegular11>está em chamada</TextRegular11>
                </View>
                <Wrapper>

                    {!isCallReceived && (

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 70 }}>
                            <ButtonCall
                                style={{ backgroundColor: 'blue' }}>
                                <ActivityIndicator
                                    color={'white'}
                                    size={35} />
                            </ButtonCall>
                            <ButtonCall
                                onPress={rejectCall}
                                style={{ backgroundColor: 'red' }}>
                                <Icon
                                    name={'phone-hangup'}
                                    type={'material-community'}
                                    color={'white'}
                                    size={32} />
                            </ButtonCall>
                        </View>

                    )}

                    {isCallReceived && (
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                            <ButtonCall
                                onPress={rejectCall}
                                style={{ backgroundColor: 'red' }}>
                                <Icon
                                    name={'phone-missed'}
                                    type='feather'
                                    color={'white'}
                                    size={35} />
                            </ButtonCall>
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

                        </View>
                    )}
                </Wrapper>

            </Container>
        </SafeAreaViewContainer>
    )
}