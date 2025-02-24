import { View } from "react-native";
import ModalElement from "../Modal";
import { Text } from "../configurationsElemetsStyle";
import { ButtonContent, ContentModalButtons, TextButton } from "../Modal/Components/style";

import { typeTheme } from "../../Config/enumTheme";
import { ButtonsContainer, ModalText, OptionLine, OptionText } from "./style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SetStateAction, useState } from "react";

interface CategoryConfirmProps {
    isModalVisible: boolean
    setVisibileBottomModal: React.Dispatch<SetStateAction<boolean>>
    category: string
    onConfirm: () => void
    onCancel: () => void
}

export default function CategoryConfirm(props: CategoryConfirmProps) {
    const [check, setCheck] = useState(false)
    return (
        <ModalElement
            setvisibleBottonModal={props.setVisibileBottomModal}
            isModalVisible={props.isModalVisible}
            iconModal={''}
            titlemodal={`Adicionar categoria ${props.category}?`}
            componentChildren={
                <View style={{ gap: 15, alignItems: "center" }}>
                    <ModalText>
                        Ao adicionar esta categoria no seu perfil, você irá receber conteúdos relacionados.
                    </ModalText>
                    <OptionLine>
                        <MaterialCommunityIcons
                            onPress={() => setCheck(!check)}
                            name={check ? "checkbox-marked-outline" : "checkbox-blank-outline"}
                            size={20}
                            color={"#c4c4c4"}
                        />
                        <OptionText>Não mostrar novamente</OptionText>
                    </OptionLine>
                    <ButtonsContainer>

                        <ButtonContent
                            onPress={props.onCancel}
                            optionButton={typeTheme.light}>
                            <TextButton
                                optionButton={typeTheme.light}
                            >
                                Não
                            </TextButton>
                        </ButtonContent>
                        <ButtonContent
                            onPress={props.onConfirm}
                            optionButton={typeTheme.default}
                        >
                            <TextButton optionButton={typeTheme.default}>
                                Sim
                            </TextButton>
                        </ButtonContent>
                    </ButtonsContainer>
                </View >
            }
        />
    )
}