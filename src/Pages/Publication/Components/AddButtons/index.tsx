import React, { useState } from "react";
import { TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AddButton, AddButtonText, ButtonContainer, LegendButtonLetter, LegendButtons, LegendButtonsContainer } from "./style";

interface AddButtonsProps {
    buttons: { letter: string, text: string }[];
    setButtons: React.Dispatch<React.SetStateAction<{ letter: string, text: string }[]>>;
}

const AddButtons: React.FC<AddButtonsProps> = (props) => {
    const [letters] = useState(["A", "B", "C", "D", "E", "F", "G", "H"]);

    const handleTextChange = (btnIndex: number, newText: string) => {
        const newButtons = props.buttons.map((btn, index) => {
            return index === btnIndex ? { ...btn, text: newText } : btn;
        });
        props.setButtons(newButtons);
    };

    const handleDeleteButton = (btn: { letter: string, text: string }) => {
        const filterButtons = props.buttons.filter((button) => button !== btn);
        const newList = filterButtons.map((btn, index) => {
            return { ...btn, letter: letters[index] };
        });
        props.setButtons(newList);
    };

    return (
        <LegendButtonsContainer>
            {props.buttons.map((btn, index) => {
                const showDeleteIcon = btn.text.length > 0;
                return (
                    <ButtonContainer key={index}>
                        <LegendButtons>
                            <LegendButtonLetter>{btn.letter}</LegendButtonLetter>
                            <TextInput
                                style={{
                                    flex: 1,
                                    fontFamily: "fontStyle.regular",
                                    fontSize: 14,
                                    color: "#000",
                                }}
                                placeholder={`Texto ${index + 1}`}
                                value={btn.text}
                                onChangeText={(text) => handleTextChange(index, text)}
                            />
                            {showDeleteIcon && (
                                <Ionicons
                                    onPress={() => handleTextChange(index, "")}
                                    name="close-outline"
                                    color={"#ACACAC"}
                                    size={20}
                                />
                            )}
                        </LegendButtons>
                        <Ionicons
                            onPress={() => handleDeleteButton(btn)}
                            name="close-outline"
                            color={"#ACACAC"}
                            size={40}
                        />
                    </ButtonContainer>
                );
            })}
            <AddButton
                onPress={() => {
                    const newButton = { letter: letters[props.buttons.length], text: "" };
                    props.setButtons([...props.buttons, newButton]);
                }}
            >
                <Ionicons
                    name="add"
                    size={20}
                    color={"#FFF"}
                    style={{
                        width: 22,
                        height: 22,
                        textAlign: "center",
                        justifyContent: "center",
                        backgroundColor: "#FFFFFF4D",
                        borderRadius: 20,
                    }}
                />
                <AddButtonText>Adicionar item</AddButtonText>
            </AddButton>
        </LegendButtonsContainer>
    );
};

export default AddButtons;
