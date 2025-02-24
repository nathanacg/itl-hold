import React, { useState } from "react";
import { FileContainer, ForwardMessageContainer, ForwardMessageTitle, Message, MessageContainer, MessageInfo, MessageText, Time, TitleDeleted, ViewImage, Wrapper } from "./style";
import { MessageChat } from "../../../../Types/chats.type";
import { Alert, Image, Linking, Modal, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../../../Theme/theme";
import { useSocket } from "../../../../context/socket";
import { View } from "react-native";
import { ButtonContent, ContentModalButtons, TextButton, TextModal, TitleModal } from "../AudioMessage/style";
import { typeTheme } from "../../../../Config/enumTheme";
import BottomModal from "../../../../Components/BottomModal";
import { OptionTextIn, StoryOptions, UserImage } from "../../style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ModalListUsers } from "../ModalListUsers";
import ViewImageChat from "../ViewImage";

interface Props {
    message: MessageChat
    received?: boolean
    forwardMessageState?: boolean
    userImage?: string
    userName?: string
}

export function FileMessageReceived({ userName, userImage, message, received = false, forwardMessageState }: Props) {
    const date = new Date(message.messageDate || '')
    const { deleteMessage } = useSocket()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false)
    const [messageDeleted, setMessageDeleted] = useState<boolean>(false)
    const { forwardMessage } = useSocket()
    const [modalListUsers, setModalListUsers] = useState<boolean>(false)
    const [imageView, setImageView] = useState<string>('')
    const [imageActivaded, setImageActivaded] = useState<boolean>(false)

    const handleForwardMessage = () => {
        setModalListUsers(true)
        setIsModalOpen(!isModalOpen)
    }

    const forwardMessageToUserId = (chatRoomId: string) => {
        forwardMessage({
            messageText: '',
            messageUri: message.messageUri,
            chatRoomId: chatRoomId,
            configAudMetrics: '',
            configAudTime: 0,
            messageType: message.messageType
        })
    }

    const handleDelete = () => {
        deleteMessage(message.messageCummomId)
        setMessageDeleted(true)
        setShowModal(false)
        setIsModalOpen(false)
    }
    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleDownloadFile = () => {
        setShowModal(false)
        setIsModalOpen(false)
        Linking.openURL(message.messageUri)
    }

    const ViewFullScreenImage = (image: string | number | null) => {
        if (typeof image != 'string') { return; }
        setImageView(image)
        setImageActivaded(!imageActivaded)
    }
    return (
        <>
            <Modal
                transparent={true}
                visible={imageActivaded}
                animationType={"slide"}
                onRequestClose={() => setImageActivaded(!imageActivaded)}
            >

                <ViewImageChat
                    image={imageView}
                    setCloseModal={() => setImageActivaded(!imageActivaded)}
                    userImage={userImage}
                    userName={userName}
                    date={date}
                />
            </Modal>
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
                    <TouchableOpacity
                        onPress={() => setShowModal(false)}
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
            </Modal>
            {!messageDeleted &&
                <MessageContainer
                    onLongPress={handleModal}
                    received={received}
                >
                    <UserImage source={{ uri: userImage, cache: 'force-cache' }} />

                    <Message>
                        {forwardMessageState &&
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
                        {message.messageType == 'IMAGE' &&
                            <TouchableOpacity onPress={() => { ViewFullScreenImage(message.messageUri), setImageActivaded(!imageActivaded) }}>

                                <Image
                                    source={{ uri: message.messageUri }}
                                    style={{
                                        width: 200,
                                        minHeight: 130,
                                        resizeMode: 'cover',
                                        marginBottom: 10,
                                        borderRadius: 5,
                                    }}
                                />
                            </TouchableOpacity>
                        }
                        {message.messageType == 'FILE' &&
                            <FileContainer>
                                <Icon
                                    name='download-circle-outline'
                                    size={50}
                                    color={theme.textligthGray}
                                />
                            </FileContainer>
                        }

                        <MessageInfo>
                            <Time>{`${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)} - ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}h${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}</Time>
                            <ViewImage source={message.messageState == 'read' ? require("../../../../Assets/Icons/all-done-blue.png") : require("../../../../Assets/Icons/doubleCheck.png")} />
                        </MessageInfo>
                    </Message>
                </MessageContainer>
            }
            <BottomModal
                title=''
                setvisibleBottonModal={() => setIsModalOpen(!isModalOpen)}
                children={
                    <>
                        {
                            !received &&
                            <StoryOptions onPress={() => { setIsModalOpen(false), deleteMessage(message.messageCummomId) }}>
                                <Ionicons
                                    name="trash-outline"
                                    color={"#231F20"}
                                    size={22}
                                    style={{ marginBottom: 5 }}
                                />
                                <OptionTextIn>Excluir mensagem</OptionTextIn>
                            </StoryOptions>
                        }
                        <StoryOptions onPress={handleForwardMessage}>
                            <Image style={{ width: 19, marginLeft: 3, height: 19, tintColor: '#231f20', resizeMode: "contain" }} source={require("../../../../Assets/Icons/share.png")} />
                            <OptionTextIn>Encaminhar</OptionTextIn>
                        </StoryOptions>
                        <StoryOptions onPress={handleDownloadFile}>
                            <Icon
                                name="download-circle-outline"
                                color={"#231F20"}
                                size={22}
                                style={{ marginBottom: 5 }}
                            />
                            <OptionTextIn>Fazer download</OptionTextIn>
                        </StoryOptions>
                    </>
                }
                visibleBottonModal={isModalOpen}
            />
        </>
    )
}