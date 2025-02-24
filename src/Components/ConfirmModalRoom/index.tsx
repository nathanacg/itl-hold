import { View } from "react-native";
import ModalElement from "../Modal";

import { ButtonContent, TextButton } from "./style"


import { typeTheme } from "../../Config/enumTheme";
import { ButtonsContainer, ModalText, TitleModal } from "./style";
import { SetStateAction } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalElementAction from "../ModalAction";
import { theme } from "../../Theme/theme";
import { Icon } from "react-native-elements";
import { EyeSvgComponent } from "../Icons/Eye";


interface ComfirmModalProps {
    postHexId?: string;
    isModalVisible: boolean
    title: string
    text: string
    icon: string
    onConfirm: () => void
    onCancel: () => void
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}


export default function ConfirmModalRoom(props: ComfirmModalProps) {
    return (
        <ModalElementAction
            setvisibleBottonModal={props.setvisibleBottonModal}
            isModalVisible={props.isModalVisible}
            iconModal={''}
            titlemodal={''}
            componentChildren={
                <>
                    <EyeSvgComponent width={50} height={50} fill="none" stroke1={theme.darkBlue} stroke2={theme.primarycolor} />
                    <View style={{ gap: 6, alignItems: "center" }}>

                        <TitleModal>
                            {props.title}
                        </TitleModal>
                        <ModalText>
                            {props.text}
                        </ModalText>
                        <ButtonsContainer>
                            <ButtonContent
                                onPress={props.onCancel}
                                optionButton={typeTheme.light}
                            >
                                <Icon
                                    name="close"
                                    size={19}
                                    color={theme.primarycolor}
                                />
                            </ButtonContent>
                            <ButtonContent
                                onPress={props.onConfirm}
                                optionButton={typeTheme.default}
                            >
                                <Icon
                                    name="check"
                                    size={19}
                                    color={theme.secondaryColor}
                                />
                            </ButtonContent>
                        </ButtonsContainer>
                    </ View >
                </>
            }
        />
    )
}