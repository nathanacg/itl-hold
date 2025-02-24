import { SetStateAction, memo, useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../../../Routes/StackTypes";
import useCreatePost from "../../../../GlobalState/createPost.zustand";
import { CreateChat, MessageChat } from "../../../../Types/chats.type";
import { Keyboard } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { Animated } from "react-native";
import { InitialChatContainer, UserAddress, UserName } from "./style";
import UserImageRounded from "../../../../Components/UserImageProfile";
import DarkButton from "../../../../Components/DarkButton";
import { ActivityIndicator } from "react-native";
import SendedMessage from "../../../Chat/Components/SendedMessage";
import PublicationShare from "../../../Chat/Components/PublicationShare";
import DropShare from "../../../Chat/Components/DropShare";
import AudioMessage from "../../../Chat/Components/AudioMessage";
import { Alert } from "react-native";
import ReceivedMessage from "../../../Chat/Components/ReceivedMessage";
import ReceivedMessageRoom from "../../../Chat/Components/ReceivedMessageRoom";
import AudioMessageReceived from "../../../Chat/Components/AudioMessageReceived";
import NavigateToProfile from "../../../../Components/NavigatetoProfile";

interface RenderListProps {
    setPageChat: React.Dispatch<SetStateAction<number>>
    messageList: MessageChat[]
    currentChat: CreateChat
    userId: number
    /*  selectMessage: () => void */
    endChat?: boolean
    setIsModalOpen: React.Dispatch<SetStateAction<boolean>>
}
export const ChatList = memo(({
    setPageChat,
    messageList,
    currentChat,
    userId,
    /* selectMessage,  */
    endChat,
    setIsModalOpen
}: RenderListProps) => {
    const navigation = useNavigation<StackRoutes>()
    const { nickName, setNickName } = useCreatePost()
    const [keyboardHeigth, setKeyBoardHeigth] = useState(0)


    const onKeyboardWillShow = (e: any) => {
        setKeyBoardHeigth(e.endCoordinates.height - 40)
    }

    const onKeyboardDidHide = (e: any) => {
        setKeyBoardHeigth(0)
    }

    useEffect(() => {

        const keyboardShowListener = Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
        const keyboardHideListener = Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };

    }, [])


    return messageList && (
        <KeyboardAwareFlatList
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            style={{ flex: 1 }}
            onEndReached={() => {
                messageList.length > 0 && setPageChat(prev => prev + 1)
            }}
            onEndReachedThreshold={0.1}
            data={messageList}
            extraData={messageList}
            contentContainerStyle={{ flexDirection: messageList.length > 4 ? "column-reverse" : "column" }}
            inverted={messageList.length > 4}
            keyExtractor={(item, index) => "message" + item.messageCummomId}
            renderItem={({ item }) => (
                <>
                    {item.userId == userId ?
                        <>
                            {item.messageType == "TEXT" &&
                                <SendedMessage
                                    setvisibleBottonModal={setIsModalOpen}
                                    read={item.messageState == "read"}
                                    onPressFunction={() => { }}
                                    text={item.messageText}
                                    timeHour={item.messageDate}
                                />
                            }

                            {item.messageType == "POST" &&
                                <PublicationShare isMy={true} postHexId={item.messageUri} />
                            }
                            {item.messageType == "DROP" &&
                                <DropShare isMy={true} postHexId={item.messageUri} />
                            }
                            {item.messageType == "AUDIO" &&
                                < AudioMessage
                                    read={item.messageState == "read"}
                                    onPressFunction={() => { }}
                                    uri={item.messageUri}
                                    timeHour={item.messageDate}
                                    audioTotalTime={item?.configAudTime}
                                    configAudMetrics={item?.configAudMetrics} />
                            }
                        </>
                        :
                        <>
                            {item.messageType == "TEXT" &&
                                <ReceivedMessageRoom
                                    onLongPress={() => { }}
                                    userName={item.userName}
                                    userNickname={item.userNickname}
                                    userImage={item.profileImage}
                                    text={item.messageText}
                                    userId={item.userId}
                                    timeHour={item.messageDate}
                                />}

                            {item.messageType == "POST" &&
                                <PublicationShare isMy={false} postHexId={item.messageUri} />
                            }
                            {item.messageType == "DROP" &&
                                <DropShare isMy={true} postHexId={item.messageUri} />
                            }
                            {item.messageType == "AUDIO" &&
                                <AudioMessageReceived
                                    read={item.messageState == "read"}
                                    userName={item.userName}
                                    onPressFunction={() => { }}
                                    uri={item.messageUri}
                                    timeHour={item.messageDate}
                                    userImage={item.profileImage}
                                    audioTotalTime={item?.configAudTime}
                                    configAudMetrics={item?.configAudMetrics} />
                            }
                        </>
                    }
                </>
            )} />
    )
})