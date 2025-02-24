import { useRef, useState, memo } from "react";
import { Message, MessageContainer, MessageTextLong, MessageText, MessageInfo, Time, ViewImage, UserImage, ForwardMessageContainer, ForwardMessageTitle } from "./style";
import AudioContainer from "../../../../Components/AudioContainer";
import { UserInfo, UserNameTitle } from "../ReceivedMessage/style";
import { Image, Modal } from "react-native";
import { axiosClientChat_api } from "../../../../Lib/Chat_api";
import { Alert } from "react-native";
import { View } from "react-native";
import { ButtonContent, ContentModalButtons, TextButton, TextModal, TitleModal } from "../AudioMessage/style";
import { typeTheme } from "../../../../Config/enumTheme";
import BottomModal from "../../../../Components/BottomModal";
import { OptionTextIn, StoryOptions } from "../../style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSocket } from "../../../../context/socket";
import { ModalListUsers } from "../ModalListUsers";
import { theme } from "../../../../Theme/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


interface SendedMessageProps {
    uri: string
    timeHour: string | Date | undefined
    position?: { x: number, y: number }
    onPressFunction: (text: string, timeHour: string, positionX: number, positionY: number) => void
    read?: boolean
    audioTotalTime: number
    userImage: string
    configAudMetrics: string
    userName?: string
    userNickname?: string
    messageId: number
    forwardMessage?: boolean
}

const AudioMessageReceived = memo((props: SendedMessageProps) => {
    const messageRef = useRef(null)
    const [position, setPosition] = useState<{ x: number, y: number }>();
    const [date, setDate] = useState(new Date(props.timeHour || ""))
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const { forwardMessage } = useSocket()
    const [modalListUsers, setModalListUsers] = useState<boolean>(false)

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

    const sendReportMessage = () => {
        axiosClientChat_api.post(`/reportMessage/${props.messageId}`).then((res) => {

        }).catch((err) => {
            console.warn('sendReportMessage')

            console.log(err.response.data)
        }).finally(() => {
            setShowModal(false)
            setIsModalOpen(false)
        })
    }

    const handleReport = () => {
        setShowModal(true)
    }

    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleForwardMessage = () => {
        setModalListUsers(true)
        setIsModalOpen(!isModalOpen)
    }

    const forwardMessageToUserId = (chatRoomId: string) => {
        forwardMessage({
            messageText: '',
            messageUri: props.uri,
            chatRoomId: chatRoomId,
            configAudMetrics: props.configAudMetrics,
            configAudTime: props.audioTotalTime,
            messageType: 'AUDIO'
        })
    }

    return (
        <>
            <ModalListUsers
                openModal={modalListUsers}
                setSelectedChatRoomId={forwardMessageToUserId}
                setOpenModal={setModalListUsers}
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
                                Denúnciar áudio
                            </TitleModal>
                            <TextModal textAlign={"center"}>
                                Deseja denúnciar o áudio da conversa?
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
            <MessageContainer
                ref={messageRef}
                onLongPress={handleModal}
            // onLongPress={handleMeasure}
            //style={props.position ? { position: "absolute", right: props.position.x, top: props.position.y } : {}}
            >
                <UserImage source={{ uri: props.userImage /* + `?timestamp=${new Date().getTime()}` */ }} />
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
                    <AudioContainer
                        configAudMetrics={props.configAudMetrics}
                        path={props.uri}
                        recordingTime={props.audioTotalTime} />
                    <MessageInfo>
                        <Time>{`${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)} - ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}h${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}</Time>
                    </MessageInfo>
                </Message>
            </MessageContainer>
            <BottomModal
                title=''
                setvisibleBottonModal={() => setIsModalOpen(!isModalOpen)}
                children={
                    <>
                        <StoryOptions onPress={handleForwardMessage}>

                            <Image style={{ width: 19, marginLeft: 3, height: 19, tintColor: '#231f20', resizeMode: "contain" }} source={require("../../../../Assets/Icons/share.png")} />

                            <OptionTextIn>Encaminhar</OptionTextIn>
                        </StoryOptions>
                        <StoryOptions onPress={handleReport}>
                            <MaterialCommunityIcons
                                name="alert-octagon-outline"
                                color={"#231F20"}
                                size={23}
                                style={{ marginBottom: 5 }}
                            />
                            <OptionTextIn>Denunciar</OptionTextIn>
                        </StoryOptions>
                    </>
                }
                visibleBottonModal={isModalOpen}
            />
        </>
    )
})

export default AudioMessageReceived