import { TouchableOpacity, FlatList } from "react-native";
import Header from "../../Components/Header";
import MessageCard from "../../Components/MessageCard";


import {
    MessageSolicitationContainer,
    MessageOptions,
    OptionText,
    OptionNumber,
    Divisor
} from './style'
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../Routes/StackTypes";
import { useSocket } from "../../context/socket";
import { SafeAreaViewContainer } from "../../Components/elementsComponents";

export default function MessageSolicitation() {
    const navigation = useNavigation<StackRoutes>()

    const { solicitationsList, acceptAllChatSolicitation, removeAllChatSolicitation, handleSetChat } = useSocket()

    return (
        <SafeAreaViewContainer>
            <MessageSolicitationContainer>
                <Header titleHeader="Solicitações de mensagem" />
                <FlatList
                    data={solicitationsList}
                    renderItem={({ item, index }) => (
                        <MessageCard
                            lastMessageType={item.lastMessageType}
                            isUserOn={true}
                            chatParticipantUserId={item.userId}
                            lastMessageUserId={item.userId}
                            name={item.userName}
                            nickName={item.userNickname}
                            lastMessage={item.lastMessage}
                            imageURl={item.profileImage}
                            darken={index % 2 != 0}
                            messageCount={item.unreadMessagens}
                            messageTime={item.chatDate}
                            onPress={() => {
                                handleSetChat(item)
                                navigation.navigate("Chat")
                            }}
                        />
                    )}
                />
                <MessageOptions>
                    <TouchableOpacity onPress={() => {
                        acceptAllChatSolicitation()
                        navigation.goBack()
                    }}>
                        <OptionText>
                            Aceitar
                            <OptionNumber> ({solicitationsList.length})</OptionNumber>
                        </OptionText>
                    </TouchableOpacity>
                    <Divisor />
                    <TouchableOpacity onPress={(() => {
                        removeAllChatSolicitation()
                        navigation.goBack()
                    })}>
                        <OptionText>
                            Remover
                            <OptionNumber> ({solicitationsList.length})</OptionNumber>
                        </OptionText>
                    </TouchableOpacity>
                </MessageOptions>
            </MessageSolicitationContainer>
        </SafeAreaViewContainer>

    )
}