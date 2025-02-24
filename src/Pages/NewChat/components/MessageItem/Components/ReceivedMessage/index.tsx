import { SetStateAction, useState } from "react";
import {
    Message,
    MessageContainer,
    MessageText,
    MessageTextLong,
    UserImage,
    Time,
    MessageInfo,
    ViewImage,
    UserInfo,
    StoryOptions,
    OptionTextIn
} from "./style";
import BottomModal from "../../../../../../Components/BottomModal";
import Ionicons from "react-native-vector-icons/Ionicons";
import Clipboard from '@react-native-clipboard/clipboard';


interface ReceivedMessageProps {
    userName?: string
    userNickname?: string
    text: string
    timeHour: string | Date | undefined
    userImage: string
    onLongPress: () => void
}

export default function ReceivedMessage(props: ReceivedMessageProps) {
    const [date, setDate] = useState(new Date(props.timeHour || ""))
    const [isModalOpen, setIsModalOpen] = useState(false);

    const TextComponent = props.text.length > 28 ? MessageTextLong : MessageText;

    const copyToClipboard = () => {
        const message = props.text
        Clipboard.setString(message);
        setIsModalOpen(!isModalOpen)
    };

    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <>
            <MessageContainer onPress={handleModal}>
                <UserImage source={{ uri: props.userImage, cache: 'force-cache' }} />
                <UserInfo>
                    <Message>
                        <TextComponent>{props.text}</TextComponent>
                        <MessageInfo>
                            <Time>{`${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}</Time>
                        </MessageInfo>
                    </Message>
                </UserInfo>
            </MessageContainer>
            <>
                <BottomModal
                    title=''
                    setvisibleBottonModal={() => setIsModalOpen(!isModalOpen)}
                    children={
                        <>
                            <StoryOptions onPress={() => { copyToClipboard() }}>
                                <Ionicons
                                    name="copy-outline"
                                    color={"#231F20"}
                                    size={22}
                                    style={{ marginBottom: 5 }}
                                />
                                <OptionTextIn>Copiar</OptionTextIn>
                            </StoryOptions>
                        </>
                    }
                    visibleBottonModal={isModalOpen}
                />
            </>
        </>
    )
}