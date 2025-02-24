import { useEffect, useState } from "react"
import { View } from "react-native"

import BottomModal from "../BottomModal"

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { OptionContainer, OptionText } from "../elementsComponents"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"

import SelectUsesModal from "../SelectUsersModal"
import DenunciaModal from "../DenunciaModal"
import ConfirmModal from "../ConfirmModal"
import ShareModal from "../ShareModal"
import Info from "../Info"

import { blockUser, unBlockUser } from "../../Service/Profile"

import useUserProfile from "../../GlobalState/userProfile.zustand"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Clipboard from "@react-native-clipboard/clipboard"
import Entypo from "react-native-vector-icons/Entypo"
import { gethiddenStoryPerson, hideStoryPerson, unhideStoryPerson } from "../../Service/Story"


interface OptionModalProps {
    visibleBottonModal: boolean
    setvisibleBottonModal: () => void
    blockedUserId: number
    userId: number
}

export default function UserProfileOptions(props: OptionModalProps) {

    const [isDenunciaModalOpen, setIsdenunciaModalOpen] = useState(false)
    const [isShareModalOpen, setIsShareModalOpen] = useState(false)
    const [showSmallPopup, setshowSmallPopup] = useState(false)
    const [infoText, setInfoText] = useState("")
    const [isUsersModalOpen, setIsUsersModalOpen] = useState(false)
    const [isConfirmation, setIsConfirmation] = useState(false)
    const [markedUsers, setMarkedUsers] = useState<{ name: string, address: string }[]>([])

    const { user } = useUserProfile()

    const [isBlocked, setIsBlocked] = useState(false)

    const [storyHidden, setStoryHidden] = useState<boolean>(false)

    const [notify, setNotify] = useState<boolean>(false)

    const handlePopout = (text: string) => {
        setInfoText(text)
        props.setvisibleBottonModal()
        setshowSmallPopup(true)
    }

    const blockThisUser = () => {
        if (!isBlocked) {
            try {
                blockUser(user.userId, props.blockedUserId)
            } catch (error) {
                console.log('Error to inside the blockUsers id: ', error)
            }
        } else {
            unBlockUser(user.userId, props.blockedUserId)
        }
    }

    const activeNotification = (userId: number) => {

    }

    const hidePersonStory = async (userId: number) => {
        await hideStoryPerson(userId).then(res => {
            console.log('cartaz ocultado', res?.data.message)
        }).catch(error => console.log(error))
    }

    const unhidePersonStory = async (userId: number) => {
        await unhideStoryPerson(userId).then(res => {
            console.log('cartaz visível', res?.data.message)
            handlePopout('Cartaz visível')
        }).catch(error => console.log(error))
    }

    const getPersonHidden = async () => {
        await gethiddenStoryPerson().then(res => {

            const hiddenStoryUsers = res?.data.response.usuarios[0].hiddenStoryUsers
            const isUserBlocked = hiddenStoryUsers.includes(props.blockedUserId)

            console.log('O cartaz está ocultado?', isUserBlocked)

            setStoryHidden(isUserBlocked)
        }).catch((error) => {
            console.log('Deu ruim ao desocultar o cartaz.', error)
        })
    }

    useEffect(() => {
        getPersonHidden()
    }, [props.blockedUserId])

    return (
        <>
            <BottomModal
                visibleBottonModal={props.visibleBottonModal}
                setvisibleBottonModal={() => {
                    props.setvisibleBottonModal()
                }}
                title=""
                children={
                    <View>
                        {/*     <OptionContainer onPress={() => {
                            Clipboard.setString('https://intellectus.app.br')
                            handlePopout("Link copiado")
                        }}>
                            <Ionicons
                                name="ios-infinite"
                                size={20}
                                color={"#231F20"}
                                style={{ transform: [{ rotate: '-50deg' }] }}
                            />
                            <OptionText>Copiar link</OptionText>
                        </OptionContainer> */}

                        {/*    <OptionContainer onPress={() => {
                            props.setvisibleBottonModal()
                            setIsShareModalOpen(true)
                        }}>
                            <Image style={{ width: 22, height: 20 }} source={require("../../Assets/Icons/shareBlack.png")} />
                            <OptionText>Compartilhar em</OptionText>
                        </OptionContainer> */}
                        {/*  <OptionContainer onPress={() => {
                            props.setvisibleBottonModal()
                            setIsUsersModalOpen(true)
                        }} >
                            <Feather
                                name="send"
                                size={22}
                                color={"#231F20"}
                            />
                            <OptionText>Compartilhar com</OptionText>
                        </OptionContainer> */}
                        <OptionContainer onPress={() => {
                            props.setvisibleBottonModal()
                            setIsConfirmation(true)
                        }}>
                            <AntDesign
                                name="deleteuser"
                                size={22}
                                color={"#231F20"}
                            />
                            <OptionText>Remover seguidor</OptionText>
                        </OptionContainer>

                        <OptionContainer onPress={() => {
                            setNotify(!notify)
                            activeNotification(props.userId)
                            handlePopout(notify ? "Notificações desativadas" : "Notificações ativadas")
                        }}>
                            <FontAwesome
                                name={notify ? "bell" : "bell-o"}
                                color={"#231F20"}
                                size={20}
                            />
                            {notify ? (
                                <OptionText>Desativar notificações</OptionText>
                            ) : (
                                <OptionText>Ativar notificações</OptionText>
                            )}

                        </OptionContainer>
                        {storyHidden ? (
                            <OptionContainer onPress={() => {
                                unhidePersonStory(props.blockedUserId)
                                setStoryHidden(!storyHidden)
                                handlePopout("Cartaz desocultado")
                            }}>
                                <Entypo
                                    name="block"
                                    size={20}
                                    color={"#231F20"}
                                    style={{ marginRight: 2 }}
                                />

                                <OptionText>Desocultar cartaz</OptionText>
                            </OptionContainer>
                        ) : (
                            <OptionContainer onPress={() => {
                                hidePersonStory(props.blockedUserId)
                                setStoryHidden(!storyHidden)
                                handlePopout("Cartaz ocultado")
                            }}>
                                <Entypo
                                    name="block"
                                    size={20}
                                    color={"#231F20"}
                                    style={{ marginRight: 2 }}
                                />

                                <OptionText>Ocultar cartaz</OptionText>
                            </OptionContainer>
                        )}


                        <OptionContainer onPress={() => { blockThisUser(), setIsBlocked(!isBlocked) }}>
                            {isBlocked == false ? (
                                <>
                                    <Feather
                                        name="x-circle"
                                        size={21}
                                        color={"#231F20"}
                                        style={{ marginRight: 1 }}
                                    />
                                    <OptionText>Bloquear usuário</OptionText>
                                </>
                            ) : (
                                <>
                                    <MaterialIcons
                                        name="radio-button-unchecked"
                                        size={21}
                                        color={"#231F20"}
                                        style={{ marginRight: 1 }}
                                    />
                                    <OptionText>Desbloquear usuário</OptionText>
                                </>
                            )}

                        </OptionContainer>

                        <OptionContainer onPress={() => {
                            props.setvisibleBottonModal()
                            setIsdenunciaModalOpen(true)
                        }}>
                            <MaterialCommunityIcons
                                name="alert-octagon-outline"
                                color={"#231F20"}
                                size={23}
                            />
                            <OptionText>Denunciar</OptionText>
                        </OptionContainer>
                    </View>
                }
            />

            <Info setVissible={setshowSmallPopup} isVisible={showSmallPopup} text={infoText} />

            <ShareModal
                setvisibleBottonModal={() => {
                    setIsShareModalOpen(!isShareModalOpen)
                }}
                visibleBottonModal={isShareModalOpen}
                postUrl={""}
            />

            <DenunciaModal
                visibleBottonModal={isDenunciaModalOpen}
                setvisibleBottonModal={() => {
                    setIsdenunciaModalOpen(!isDenunciaModalOpen)
                }}
            />

            <SelectUsesModal
                markedUsers={markedUsers}
                setMarkedUsers={setMarkedUsers}
                visibleBottonModal={isUsersModalOpen}
                setvisibleBottonModal={() => {
                    setIsUsersModalOpen(!isUsersModalOpen)
                }}
            />

            <ConfirmModal
                setvisibleBottonModal={setIsdenunciaModalOpen}
                isModalVisible={isConfirmation}
                onCancel={() => setIsConfirmation(false)}
                onConfirm={() => {
                    //removeFollower()
                    setIsConfirmation(false)
                }}
                title="Remover Seguidor?"
                text="O usuário não será informado que foi removido"
            />
        </>
    )
}