import { TouchableOpacity, View } from "react-native";
import { Container, OptionContainer, Separator, TextModal } from "./style";
import RadioButton from "../../../../Components/RadioButton";
import { FlatList } from "react-native-gesture-handler";
import { SetStateAction, useState } from "react";
import { theme } from "../../../../Theme/theme";
import Modal from "react-native-modal";

interface CategoryModalProps {
    isModalVisible: boolean
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
    options: string[]
    selectedOpion: string
    setSelectedOption: React.Dispatch<SetStateAction<string>>
}

export default function OptionsModal(props: CategoryModalProps) {


    return (
        <Modal
            isVisible={props.isModalVisible}
            style={{ justifyContent: 'center', alignItems: "center" }}
            onBackdropPress={() => props.setvisibleBottonModal(false)}
            children={
                <Container>
                    <FlatList
                        ItemSeparatorComponent={Separator}
                        data={props.options}
                        renderItem={({ item }) => (
                            <OptionContainer
                                onPress={() => {
                                    props.setSelectedOption(item)
                                    props.setvisibleBottonModal(!props.isModalVisible)
                                }}>
                                <TextModal>
                                    {item}
                                </TextModal>
                                <RadioButton
                                    value={props.selectedOpion == item}
                                    setValue={() => {
                                        props.setSelectedOption(item)
                                        props.setvisibleBottonModal(!props.isModalVisible)
                                    }}

                                />
                            </OptionContainer>
                        )}
                    />
                </Container>
            }
        />
    )
}