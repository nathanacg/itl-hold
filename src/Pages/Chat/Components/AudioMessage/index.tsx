import { useRef, useState, memo } from "react";
import { Message, MessageContainer, MessageTextLong, MessageText, MessageInfo, Time, ViewImage, Wrapper, TitleDeleted, TitleModal, TextModal, ContentModalButtons, ButtonContent, TextButton, ForwardMessageContainer, ForwardMessageTitle } from "./style";
import AudioContainer from "../../../../Components/AudioContainer";
import BottomModal from "../../../../Components/BottomModal";
import { OptionTextIn, StoryOptions } from "../../style";
import { theme } from "../../../../Theme/theme";
import { useSocket } from "../../../../context/socket";
import { Modal } from "react-native";
import { View } from "react-native";
import { Image } from "react-native-elements";
import { typeTheme } from "../../../../Config/enumTheme";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useShare } from "../../../../GlobalState/share.zustand";
import { ModalListUsers } from "../ModalListUsers";

interface SendedMessageProps {
    uri: string | number
    timeHour: string | Date | undefined
    position?: { x: number, y: number }
    onPressFunction: (text: string, timeHour: string, positionX: number, positionY: number) => void
    read?: boolean
    audioTotalTime: number
    configAudMetrics: string
    messageCummomId: string
    forwardMessage?: boolean
}

const AudioMessage = memo((props: SendedMessageProps) => {
    const messageRef = useRef(null)
    const [position, setPosition] = useState<{ x: number, y: number }>();
    const { deleteMessage } = useSocket()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false)
    const [messageDeleted, setMessageDeleted] = useState<boolean>(false)
    const date = new Date(props.timeHour || '')
    const { forwardMessage } = useSocket()
    const [modalListUsers, setModalListUsers] = useState<boolean>(false)

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

    const handleDelete = () => {
        deleteMessage(props.messageCummomId)
        setMessageDeleted(true)
        setShowModal(false)
        setIsModalOpen(false)
    }
    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }
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
                            width: '65%',
                            padding: 20,
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
                            <TextModal>
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
                        <AudioContainer
                            configAudMetrics={props.configAudMetrics}
                            path={props.uri}
                            recordingTime={props.audioTotalTime} />
                        <MessageInfo>
                            <Time>{`${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()} - ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}h${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}</Time>
                            <ViewImage source={props.read ? require("../../../../Assets/Icons/all-done-blue.png") : require("../../../../Assets/Icons/doubleCheck.png")} />
                        </MessageInfo>
                    </Message>


                </MessageContainer>
            }
            <BottomModal
                title=''
                setvisibleBottonModal={() => setIsModalOpen(!isModalOpen)}
                children={
                    <>
                        <StoryOptions onPress={() => { handleDelete(), handleModal() }}>
                            <Ionicons
                                name="trash-outline"
                                color={"#231F20"}
                                size={22}
                                style={{ marginBottom: 5 }}
                            />
                            <OptionTextIn>Excluir mensagem</OptionTextIn>
                        </StoryOptions>
                        <StoryOptions onPress={handleForwardMessage}>
  <Image style={{ width: 19, marginLeft: 3, height: 19, tintColor: '#231f20', resizeMode: "contain" }} source={require("../../../../Assets/Icons/share.png")} />
                            <OptionTextIn>Encaminhar</OptionTextIn>
                        </StoryOptions>
                    </>
                }
                visibleBottonModal={isModalOpen}
            />
        </>
    )
})

export default AudioMessage