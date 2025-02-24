import { SetStateAction, useState } from 'react'
import { TouchableOpacity, Image, View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'

import BottomModal from '../BottomModal'

import { Text } from '../configurationsElemetsStyle'
import { theme } from '../../Theme/theme'

import { ContentModal2 } from '../Modal/style'
import { reportPost } from '../../Service/Publications'

import { AlertModalText, AlertModalTitle, OptionContent } from './style'

interface DenunciaModalProps {
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
    visibleBottonModal: boolean
    spoilerOption?: boolean
    postHexId?: string
}

export default function DenunciaModal(props: DenunciaModalProps) {

    const [alertModal, setAlertModal] = useState(false)
    const [alertTitleModal, setAlertTitleModal] = useState("")

    const handleAlertModal = (title: string) => {
        setAlertTitleModal(title)
        props.setvisibleBottonModal(false)
        setAlertModal(!alertModal)
        setTimeout(() => {
            setAlertModal(false)
        }, 5000)
    }


    const reportPublication = async (postHexId: string, reason: string) => {
        await reportPost(postHexId, reason).then((res) => {
            console.log('Publicação reportada.', res.data)
        }).catch((error) => {
            console.log('Algo inesperado aconteceu.', error)
        })
    }


    return (

        <>
            <BottomModal
                title=""
                setvisibleBottonModal={props.setvisibleBottonModal}
                visibleBottonModal={props.visibleBottonModal}
                children={
                    <View style={{ gap: 15, marginBottom: 10 }}>
                        {props.spoilerOption && (
                            <OptionContent onPress={() => {
                                reportPublication(props.postHexId, "1")
                                handleAlertModal("Marcado como spoiler")
                            }}
                            >
                                <Text>Denunciar publicação com Spoiler</Text>
                                <TouchableOpacity>
                                    <Icon
                                        name="chevron-forward"
                                        size={16}
                                        color={theme.textDark}
                                    />
                                </TouchableOpacity>
                            </OptionContent>
                        )}

                        <OptionContent
                            onPress={
                                () => {
                                    reportPublication(props.postHexId, "2")
                                    handleAlertModal("Violação das diretrizes da Intellectus")
                                }}>
                            <Text>Violação das diretrizes do Intellectus</Text>
                            <Icon
                                name="chevron-forward"
                                size={16}
                                color={theme.textDark}
                            />
                        </OptionContent>
                        <OptionContent
                            onPress={
                                () => {
                                    reportPublication(props.postHexId, "3")
                                    handleAlertModal("Marcado como spam")
                                }}>
                            <Text>Spam</Text>
                            <Icon
                                name="chevron-forward"
                                size={16}
                                color={theme.textDark}
                            />

                        </OptionContent>
                        <OptionContent
                            onPress={
                                () => {
                                    reportPublication(props.postHexId, "4")
                                    handleAlertModal("Marcado como nudez ou conteúdo explícito")
                                }}>
                            <Text>Nudez ou conteúdo explícito</Text>
                            <Icon
                                name="chevron-forward"
                                size={16}
                                color={theme.textDark}
                            />

                        </OptionContent>
                        <OptionContent
                            onPress={
                                () => {
                                    reportPublication(props.postHexId, "5")
                                    handleAlertModal("Símbolos ou discurso de ódio")
                                }}>
                            <Text>Símbolos ou discurso de ódio</Text>
                            <Icon
                                name="chevron-forward"
                                size={16}
                                color={theme.textDark}
                            />
                        </OptionContent>
                        <OptionContent
                            onPress={
                                () => {
                                    reportPublication(props.postHexId, "6")
                                    handleAlertModal("Violência ou organizações perigosas")
                                }}>
                            <Text>Violência ou organizações perigosas</Text>
                            <Icon
                                name="chevron-forward"
                                size={16}
                                color={theme.textDark}
                            />
                        </OptionContent>
                        <OptionContent
                            onPress={
                                () => {
                                    reportPublication(props.postHexId, "7")
                                    handleAlertModal("Bullying ou assédio")
                                }}>
                            <Text>Bullying ou assédio</Text>
                            <Icon
                                name="chevron-forward"
                                size={16}
                                color={theme.textDark}
                            />
                        </OptionContent>

                        <OptionContent
                            onPress={
                                () => {
                                    reportPublication(props.postHexId, "8")
                                    handleAlertModal("Violação de propriedade intelectual")
                                }}>
                            <Text>Violação de propriedade intelectual</Text>
                            <Icon
                                name="chevron-forward"
                                size={16}
                                color={theme.textDark}
                            />
                        </OptionContent>

                        <OptionContent
                            onPress={
                                () => {
                                    reportPublication(props.postHexId, "9")
                                    handleAlertModal("Golpe ou fraude")
                                }}>
                            <Text>Golpe ou fraude</Text>
                            <Icon
                                name="chevron-forward"
                                size={16}
                                color={theme.textDark}
                            />
                        </OptionContent>

                        <OptionContent
                            onPress={
                                () => {
                                    reportPublication(props.postHexId, "10")
                                    handleAlertModal("Informação falsa")
                                }}>
                            <Text>Informação falsa</Text>
                            <Icon
                                name="chevron-forward"
                                size={16}
                                color={theme.textDark}
                            />
                        </OptionContent>
                    </View>
                }
            />


            <Modal
                isVisible={alertModal}
            >
                <ContentModal2 style={{ gap: 18 }}>
                    <Image source={require("../../Assets/Icons/alert.png")} />
                    <AlertModalTitle>{alertTitleModal}</AlertModalTitle>
                    <AlertModalText>Vamos analisar a indicação. Obrigada por avisar e ajudar a proteger o aplicativo.</AlertModalText>
                </ContentModal2>
            </Modal>
        </>
    )
}