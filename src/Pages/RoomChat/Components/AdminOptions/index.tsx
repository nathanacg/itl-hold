import React, { SetStateAction, useState } from "react"
import { Image, View } from "react-native"
import { OptionText, OptionContainer } from "./style"
import BottomModal from "../../../../Components/BottomModal"
import SilenceTimeModal from "../../../../Components/SilenceTimeModal"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native"
import { StackRoutes } from "../../../../Routes/StackTypes"
import useRoom from "../../../../GlobalState/room.zustand"

interface AdminOptionsProps {
    visibleBottonModal: boolean
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

export default function AdminOptions(props: AdminOptionsProps) {

    const navigation = useNavigation<StackRoutes>()

    const { room } = useRoom()

    const [silenceModal, setSilenceModal] = useState(false)
    const [silenceTime, setSilenceTime] = useState("")

    return (
        <>
            <BottomModal
                visibleBottonModal={props.visibleBottonModal}
                setvisibleBottonModal={props.setvisibleBottonModal}
                title=""
                children={
                    <View>
                        <OptionContainer onPress={() => navigation.navigate("ViewRoom", { Room: room })}>
                            <Image style={{ width: 18, height: 15, resizeMode: "contain" }} source={require("../../../../Assets/Icons/usersGroup.png")} />
                            <OptionText>Ver sala</OptionText>
                        </OptionContainer>
                        {/*     <OptionContainer>
                            <Image style={{ width: 18, height: 19.38, resizeMode: "contain" }} source={require("../../../../Assets/Icons/clear.png")} />
                            <OptionText>Limpar chat</OptionText>
                        </OptionContainer> */}
                        {/*  <OptionContainer>
                            <FontAwesome
                                name="bell-slash-o"
                                color={"#231F20"}
                                size={20}
                            />
                            <OptionText>Silenciar</OptionText>
                        </OptionContainer> */}
                        {/* <OptionContainer>
                            <MaterialCommunityIcons
                                name="bell-ring-outline"
                                color={"#231F20"}
                                size={23}
                            />
                            <OptionText>Ativar notificações</OptionText>
                        </OptionContainer> */}
                    </View>
                }
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