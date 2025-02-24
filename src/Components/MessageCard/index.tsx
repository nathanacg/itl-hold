import { TouchableOpacity, View } from "react-native";

import {
    MessageCardContainer,
    UserImageContainer,
    CenterContainer,
    LastMessage,
    TimeContainer,
    MessageTime,
    NotificationsCount,
    NotificationsCountText,
    TrashIcon,
    BoldText,
    MessageSended,
    NormalText,
} from "./style";

import Icon from "react-native-vector-icons/Ionicons"
import IconFd from "react-native-vector-icons/Foundation"
import { theme } from "../../Theme/theme";

import AudioRecorderPlayer from "react-native-audio-recorder-player";
import UserImageRounded from "../UserImageProfile";
import { useEffect, useState } from "react";
import { chatPreview } from "../../Service/Chat";
import useUserProfile from "../../GlobalState/userProfile.zustand";

const audio = new AudioRecorderPlayer();
interface MessageCardProps {
    name: string
    nickName: string
    imageURl: any
    isUserOn?: boolean
    lastMessage: string
    lastMessageUserId: number
    lastMessageType: "TEXT" | "AUDIO" | "POST" | "DROP" | "CARTAZ" | "ROOM",
    configAudTime?: number,
    messageTime: string
    messageCount: number
    onDelete?: () => void
    openMenu?: () => void
    darken?: boolean
    onPress: () => void
    chatParticipantUserId: number
}

export default function MessageCard(props: MessageCardProps) {
    const date = new Date(props.messageTime)
    const [lastMessage, setLastMessage] = useState<string>(props.lastMessage);
    const [lastMessageId, setLastMessageId] = useState<number>(props.lastMessageUserId);
    const { user: userProfile } = useUserProfile();



    return (
        <MessageCardContainer
            style={props.darken && { backgroundColor: `${theme.lightGray}33` }}
            onPress={props.onPress}>
            <UserImageContainer>
                <UserImageRounded url={props.imageURl} size={44} />
            </UserImageContainer>
            <CenterContainer>
                <View style={{ marginLeft: -5 }}>
                    <BoldText numberOfLines={1}>{props.nickName}</BoldText>
                    <LastMessage numberOfLines={1}>{
                        <>
                            {lastMessage == "Enviou um áudio" ? (
                                <>
                                    <IconFd name="microphone" size={18} color={theme.primarycolor} /> {props.configAudTime && audio.mmss(Math.floor(props.configAudTime))}
                                </>
                            ) : (
                                <>
                                    {lastMessageId == userProfile.userId ? (
                                        <>
                                            <MessageSended>Você:</MessageSended> {lastMessage}
                                        </>
                                    ) : (lastMessage)}
                                </>
                            )}
                        </>
                    }
                    </LastMessage>
                </View>
            </CenterContainer>
            <TimeContainer>
                <MessageTime>{`${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()} - ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}h${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}</MessageTime>

                {props.messageCount > 0 && (
                    <NotificationsCount>
                        <NotificationsCountText>{props.messageCount}</NotificationsCountText>
                    </NotificationsCount>
                )}

            </TimeContainer>
            {props.openMenu && (
                <TouchableOpacity onPress={props.openMenu}>
                    <Icon
                        name="ellipsis-vertical"
                        color={'#AD9EB3'}
                        size={20}

                    />
                </TouchableOpacity>
            )}

            {props.onDelete && (
                <TouchableOpacity onPress={props.onDelete}>
                    <TrashIcon style={{ width: 16, height: 17 }} source={require("../../Assets/Icons/trash.png")} />
                </TouchableOpacity>
            )}

        </MessageCardContainer>
    )
}