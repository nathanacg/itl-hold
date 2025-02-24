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
    UserNameTitle,
    ForwardMessageContainer,
    ForwardMessageTitle
} from "./style";
import BottomModal from "../../../../Components/BottomModal";
import { OptionTextIn, StoryOptions } from "../../style";
import Ionicons from "react-native-vector-icons/Ionicons";
import Clipboard from '@react-native-clipboard/clipboard';
import ModalElement from "../../../../Components/Modal";
import { Alert, Image, Modal, View } from "react-native";
import { TitleModal } from "../../../RequestVerification/style";
import { TextModal } from "../../../CreateStory/style";
import { ButtonContent, ContentModalButtons, TextButton } from "../../../../Components/Modal/Components/style";
import { typeTheme } from "../../../../Config/enumTheme";
import { axiosClientChat_api } from "../../../../Lib/Chat_api";
import { ModalListUsers } from "../ModalListUsers";
import { useSocket } from "../../../../context/socket";
import { theme } from "../../../../Theme/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


interface ReceivedMessageProps {
    messageId?: number
    userName?: string
    userNickname?: string
    text: string
    timeHour: string | Date | undefined
    userImage: string
    forwardMessage?: boolean
    onLongPress: () => void
}

export default function ReceivedMessage(props: ReceivedMessageProps) {
    const [date, setDate] = useState(new Date(props.timeHour || ""))
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const { forwardMessage } = useSocket()
    const [modalListUsers, setModalListUsers] = useState<boolean>(false)
    const TextComponent = props.text.length > 28 ? MessageTextLong : MessageText;

    const copyToClipboard = () => {
        const message = props.text
        Clipboard.setString(message);
        setIsModalOpen(!isModalOpen)
    };

    const sendReportMessage = () => {
        axiosClientChat_api.post(`/reportMessage/${props.messageId}`).then((res) => {
            // console.log(res.data)
            // Alert.alert('Aviso', 'Mensagem denúnciada com sucesso!')
        }).catch((err) => {
            console.warn('sendReportMessage')
            // Alert.alert('Aviso', 'Mensagem já denúnciada!')
            console.log(err.response.data)
        }).finally(() => {
            setShowModal(false)
            setIsModalOpen(false)
        })
    }

    const handleForwardMessage = () => {
        setModalListUsers(true)
        setIsModalOpen(!isModalOpen)
    }

    const forwardMessageToUserId = (chatRoomId: string) => {
        forwardMessage({
            messageText: props.text,
            messageUri: null,
            chatRoomId: chatRoomId,
            configAudMetrics: '',
            configAudTime: 0,
            messageType: 'TEXT'
        })
    }

    const handleReport = () => {
        setShowModal(true)
    }

    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    function contemApenasUmEmoji(text: string) {
        const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/ug;

        const emojisEncontrados = text.match(emojiRegex);

        if (!emojisEncontrados || emojisEncontrados.length !== 1) {
            return false;
        }

        return true;
    }

    return (
        <>
            <ModalListUsers
                openModal={modalListUsers}
                setSelectedChatRoomId={forwardMessageToUserId}
            />
            <Modal
                visible={showModal}
                transparent
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#00000040'
                        }}
                    />
                    <View
                        style={{
                            width: '85%',
                            height: 250,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FFF',
                            borderRadius: 9,
                        }}
                    >
                        <View style={{ gap: 15, alignItems: 'center' }}>
                            <Image source={require('../../../../Assets/Icons/deleteAlert.png')} />
                            <TitleModal>
                                Denúnciar mensagem
                            </TitleModal>
                            <TextModal textAlign={"center"}>
                                Deseja denúnciar a mensagem da conversa?
                            </TextModal>
                        </View>
                        <ContentModalButtons>
                            <ButtonContent
                                optionButton={typeTheme.default}
                                onPress={sendReportMessage}
                            >
                                <TextButton optionButton={typeTheme.default}>
                                    Sim
                                </TextButton>
                            </ButtonContent>
                            <ButtonContent optionButton={typeTheme.light}>
                                <TextButton
                                    optionButton={typeTheme.light}
                                    onPress={() => { setShowModal(false) }}
                                >
                                    Não
                                </TextButton>
                            </ButtonContent>
                        </ContentModalButtons>
                    </View>
                </View>
            </Modal>
            <MessageContainer onPress={handleModal}>
                <UserImage source={{ uri: props.userImage, cache: 'force-cache' }} />
                <Message>
                    {props.forwardMessage &&
                        <ForwardMessageContainer>
                            <Ionicons
                                name="return-up-forward-outline"
                                color={theme.lightGray}
                                size={10}
                            />
                            <ForwardMessageTitle>
                                encaminhada
                            </ForwardMessageTitle>
                        </ForwardMessageContainer>
                    }
                    <MessageText emoji={contemApenasUmEmoji(props.text)} style={contemApenasUmEmoji(props.text) && { fontSize: 40 }}>{props.text}</MessageText>

                    <MessageInfo>
                        <Time>{`${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)} - ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}h${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}</Time>
                    </MessageInfo>
                </Message>
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

                            <StoryOptions onPress={handleForwardMessage}>
                                <Image style={{ width: 19, marginLeft: 3, height: 19, tintColor: '#231f20', resizeMode: "contain" }} source={require("../../../../Assets/Icons/share.png")} />
                                <OptionTextIn>Encaminhar</OptionTextIn>
                            </StoryOptions>
                            <StoryOptions onPress={handleReport}>
                                <MaterialCommunityIcons
                                    name="alert-octagon-outline"
                                    color={"#231F20"}
                                    size={23}
                                />
                                <OptionTextIn>Denunciar</OptionTextIn>

                            </StoryOptions>
                        </>
                    }
                    visibleBottonModal={isModalOpen}
                />
            </>
        </>
    )
}