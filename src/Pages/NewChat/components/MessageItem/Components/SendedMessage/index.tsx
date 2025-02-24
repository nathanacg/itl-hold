import { useRef, useState, memo, SetStateAction } from 'react'
import { Image, View } from 'react-native'
import { Message, MessageContainer, MessageTextLong, MessageText, MessageInfo, Time, ViewImage, StoryOptions, OptionTextIn } from './style'

import { TextModal } from '../../../../../CreateStory/style'

import BottomModal from '../../../../../../Components/BottomModal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Clipboard from '@react-native-clipboard/clipboard'
import ModalElement from '../../../../../../Components/Modal'
import { TitleModal } from '../../../../../RequestVerification/style'
import { ButtonContent, ContentModalButtons, TextButton } from '../../../../../../Components/Modal/Components/style'

import { typeTheme } from '../../../../../../Config/enumTheme'
import Info from '../../../../../../Components/Info'

interface SendedMessageProps {
    text: string
    timeHour: string | Date | undefined
    position?: { x: number, y: number }
    onPressFunction: (text: string, timeHour: string, positionX: number, positionY: number) => void
    read?: boolean
    onPress?: () => void
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

const SendedMessage = memo((props: SendedMessageProps) => {

    const messageRef = useRef(null)
    const [position, setPosition] = useState<{ x: number, y: number }>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false)

    const [showSmallPopup, setshowSmallPopup] = useState(false)
    const [popoutText, setPopoutText] = useState('')

    const handlePopout = (text: string) => {
        setPopoutText(text)
        setshowSmallPopup(true)
    }


    const [date, setDate] = useState(new Date(props.timeHour || ""))

    const TextComponent = props.text.length > 34 ? MessageText : MessageTextLong;



    const copyToClipboard = () => {
        const message = props.text
        Clipboard.setString(message)
        setIsModalOpen(!isModalOpen)
    };

    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <>
            <ModalElement
                setvisibleBottonModal={props.setvisibleBottonModal}
                isModalVisible={showModal}
                iconModal={''}
                titlemodal=''
                componentChildren={<View>
                    <View style={{ gap: 15, alignItems: 'center' }}>
                        <Image source={require('../../../../../../Assets/Icons/deleteAlert.png')} />
                        <TitleModal>
                            Excluir mensagem
                        </TitleModal>
                        <TextModal textAlign={"center"}>
                            Deseja excluir mensagem da conversa?
                        </TextModal>
                    </View>
                    <ContentModalButtons>

                        <ButtonContent optionButton={typeTheme.light}>
                            <TextButton
                                optionButton={typeTheme.light}
                                onPress={() => { setShowModal(!showModal) }}
                            >
                                Não
                            </TextButton>
                        </ButtonContent>
                        <ButtonContent
                            optionButton={typeTheme.default}
                            onPress={() => { }}
                        >
                            <TextButton optionButton={typeTheme.default}>
                                Sim
                            </TextButton>
                        </ButtonContent>
                    </ContentModalButtons>
                </View>}
            />
            <MessageContainer
                ref={messageRef}
                onLongPress={handleModal}
                style={props.position ? { position: "absolute", right: props.position.x, top: props.position.y } : {}}
            >
                <Message>
                    <TextComponent>{props.text}</TextComponent>
                    <MessageInfo>
                        <Time>{`${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}</Time>
                        <ViewImage source={props.read ? require("../../../../../../Assets/Icons/all-done-blue.png") : require("../../../../../../Assets/Icons/doubleCheck.png")} />
                    </MessageInfo>
                </Message>
            </MessageContainer>

            <Info setVissible={setshowSmallPopup} isVisible={showSmallPopup} text={popoutText} />
            <>
                <BottomModal
                    title=''
                    setvisibleBottonModal={() => setIsModalOpen(!isModalOpen)}
                    children={
                        <>
                            <StoryOptions onPress={() => { setShowModal(!showModal), handleModal() }}>
                                <Ionicons
                                    name="trash-outline"
                                    color={"#231F20"}
                                    size={22}
                                    style={{ marginBottom: 5 }}
                                />
                                <OptionTextIn>Excluir mensagem</OptionTextIn>
                            </StoryOptions>
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
})

export default SendedMessage