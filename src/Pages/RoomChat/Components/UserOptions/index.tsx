import React, { SetStateAction, useState } from "react"
import { Image, View } from "react-native"
import BottomModal from "../../../../Components/BottomModal"
import SilenceTimeModal from "../../../../Components/SilenceTimeModal"
import { OptionContainer, OptionText } from "../AdminOptions/style"

import AntDesign from "react-native-vector-icons/AntDesign"
import ConfirmModal from "../../../../Components/ConfirmModal"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"

interface UserOptionsProps {
    visibleBottonModal: boolean
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

export default function UserOptions(props: UserOptionsProps) {

    const [silenceModal, setSilenceModal] = useState(false)
    const [silenceTime, setSilenceTime] = useState("")

    const [confirmModal, setConfirmModal] = useState(false)

    return (
        <>
            <BottomModal
                visibleBottonModal={props.visibleBottonModal}
                setvisibleBottonModal={props.setvisibleBottonModal}
                title=""
                children={
                    <View>
                        <OptionContainer>
                            <Image style={{ width: 18, height: 15, resizeMode: "contain" }} source={require("../../../../Assets/Icons/usersGroup.png")} />
                            <OptionText>Ver sala</OptionText>
                        </OptionContainer>
                        <OptionContainer>
                            <AntDesign
                                name="user"
                                color={"#231F20"}
                                size={20}
                            />
                            <OptionText>Ver participantes</OptionText>
                        </OptionContainer>
                        <OptionContainer>
                            <Image style={{ width: 18, height: 19.38, resizeMode: "contain" }} source={require("../../../../Assets/Icons/clear.png")} />
                            <OptionText>Limpar chat</OptionText>
                        </OptionContainer>
                        <OptionContainer onPress={() => {
                            setSilenceModal(true)
                            props.setvisibleBottonModal(false)
                        }}>
                            <FontAwesome
                                name="bell-slash-o"
                                color={"#231F20"}
                                size={20}
                            />
                            <OptionText>Silenciar</OptionText>
                        </OptionContainer>
                        {/* <OptionContainer>
                            <MaterialCommunityIcons
                                name="bell-ring-outline"
                                color={"#231F20"}
                                size={23}
                            />
                            <OptionText>Ativar notificações</OptionText>
                        </OptionContainer> */}
                        <OptionContainer onPress={() => {
                            setConfirmModal(true)
                            props.setvisibleBottonModal(false)
                        }}>
                            <MaterialCommunityIcons
                                name="exit-to-app"
                                color={"#231F20"}
                                size={23}
                            />
                            <OptionText>Sair da sala</OptionText>
                        </OptionContainer>
                        <OptionContainer>
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

            <ConfirmModal
                title="Você deseja mesmo sair da sala @nomedasala"
                text="Ao sair da sala, você não terá acesso até solicitar e ser aceito novamente"
                isModalVisible={confirmModal}
                onCancel={() => setConfirmModal(false)}
                onConfirm={() => setConfirmModal(false)}

            />

            <SilenceTimeModal
                visibleBottonModal={silenceModal}
                setvisibleBottonModal={setSilenceModal}
                seletedOption={silenceTime}
                setOption={setSilenceTime}
            />
        </>
    )
}