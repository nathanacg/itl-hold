import { useRef, useState, memo, SetStateAction } from 'react'
import { Image } from 'react-native'
import { Message, MessageContainer, MessageTextLong, MessageText, MessageInfo, Time, ViewImage, Wrapper, TitleDeleted, ForwardMessageTitle, ForwardMessageContainer } from './style'

import { OptionTextIn, StoryOptions } from '../../style'

import BottomModal from '../../../../Components/BottomModal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Clipboard from '@react-native-clipboard/clipboard'

import Info from '../../../../Components/Info'
import { useSocket } from '../../../../context/socket'
import { theme } from '../../../../Theme/theme'
import { ModalListUsers } from '../ModalListUsers'

interface SendedMessageProps {
    text: string
    timeHour: string | Date | undefined
    position?: { x: number, y: number }
    onPressFunction: (text: string, timeHour: string, positionX: number, positionY: number) => void
    read?: boolean
    onPress?: () => void
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
    messageCummomId: string
    forwardMessage?: boolean
}

const SendedMessage = memo((props: SendedMessageProps) => {
    const messageRef = useRef(null)
    const [position, setPosition] = useState<{ x: number, y: number }>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showSmallPopup, setshowSmallPopup] = useState(false)
    const [popoutText, setPopoutText] = useState('')
    const { deleteMessage, forwardMessage } = useSocket()
    const [messageDeleted, setMessageDeleted] = useState<boolean>(false)
    const [modalListUsers, setModalListUsers] = useState<boolean>(false)
    const [date, setDate] = useState(new Date(props.timeHour || ""))
    const TextComponent = props.text.length > 34 ? MessageText : MessageTextLong;



    function contemApenasUmEmoji(text: string) {
        const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/ug

        const emojisEncontrados = text.match(emojiRegex);

        if (!emojisEncontrados || emojisEncontrados.length !== 1) {
            return false;
        }
        return true;
    }

    const handleDelete = () => {
        deleteMessage(props.messageCummomId)
        setMessageDeleted(true)
        setShowModal(false)
        setIsModalOpen(false)
    }

    //const isAudioMessage = props.text.startsWith('AUDIO:');

    // const handlePress = () => {
    //     messageRef.current && messageRef.current.measureInWindow((x: number, y: number) => {
    //         props.onPressFunction(x, y, props.text, props.timeHour)
    //     })
    // }

    // const handleMeasure = () => {
    //     messageRef.current?.measure((x, y, width, height, pageX, pageY) => {
    //       setPosition({ x: pageX, y: pageY });
    //       props.onPressFunction(props.text, props.timeHour, pageX, pageY)
    //     });

    //   };

    const copyToClipboard = () => {
        const message = props.text
        Clipboard.setString(message)
        setIsModalOpen(!isModalOpen)
    };

    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
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

    return (
        <>
            <ModalListUsers
                openModal={modalListUsers}
                setSelectedChatRoomId={forwardMessageToUserId}
                setOpenModal={setModalListUsers}
            />
            {/* <Modal
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
                                Excluir mensagem
                            </TitleModal>
                            <TextModal textAlign={"center"}>
                                Deseja excluir mensagem da conversa?
                            </TextModal>
                        </View>
                        <ContentModalButtons>
                            <ButtonContent
                                optionButton={typeTheme.default}
                                onPress={handleDelete}
                            >
                                <TextButton optionButton={typeTheme.default}>
                                    Sim
                                </TextButton>
                            </ButtonContent>
                            <ButtonContent optionButton={typeTheme.light}>
                                <TextButton
                                    optionButton={typeTheme.light}
                                    onPress={() => { setShowModal(!showModal) }}
                                >
                                    Não
                                </TextButton>
                            </ButtonContent>
                        </ContentModalButtons>
                    </View>
                </View>
            </Modal> */}
            {!messageDeleted &&
                <MessageContainer
                    ref={messageRef}
                    onLongPress={handleModal}
                >
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
                        <TextComponent emoji={contemApenasUmEmoji(props.text)} style={contemApenasUmEmoji(props.text) && { fontSize: 40 }}>
                            {props.text}
                        </TextComponent>

                        <MessageInfo>
                            <Time>{`${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)} - ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}h${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}</Time>
                            <ViewImage source={props.read ? require("../../../../Assets/Icons/all-done-blue.png") : require("../../../../Assets/Icons/doubleCheck.png")} />
                        </MessageInfo>
                    </Message>
                </MessageContainer >
            }

            <Info setVissible={setshowSmallPopup} isVisible={showSmallPopup} text={popoutText} />
            <>
                <BottomModal
                    title=''
                    setvisibleBottonModal={() => setIsModalOpen(!isModalOpen)}
                    children={
                        <>
                            <StoryOptions onPress={handleForwardMessage}>
                                <Image style={{ width: 19, marginLeft: 3, height: 19, tintColor: '#231f20', resizeMode: "contain" }} source={require("../../../../Assets/Icons/share.png")} />

                                <OptionTextIn>Encaminhar</OptionTextIn>
                            </StoryOptions>
                            <StoryOptions onPress={() => { handleDelete(), handleModal() }}>
                                <Ionicons
                                    name="trash-outline"
                                    color={"#231F20"}
                                    size={22}
                                />
                                <OptionTextIn>Excluir mensagem</OptionTextIn>
                            </StoryOptions>
                            <StoryOptions onPress={copyToClipboard}>
                                <Ionicons
                                    name="copy-outline"
                                    color={"#231F20"}
                                    size={22}
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
})

export default SendedMessage