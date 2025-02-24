import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"
import { typeTheme } from "../../Config/enumTheme";

interface typeButton {
    optionButton: string
}
export const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
`

export const ModalText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
    text-align: center;
    width: 200px;
`

export const TitleModal = styled.Text`
    margin-top: -10px;
    color: ${theme.textDark};
    font-size: 16px;
    font-family: ${fontStyle.medium};
    text-align: center;
`

export const ButtonContent = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    padding: 4px;
    min-width: 30%;
    border-radius: 6px;
    border: 1.3px;
    border-color: ${theme.primarycolor};
    background-color : ${(props: typeButton) => props.optionButton === typeTheme.default ? (theme.primarycolor) : (theme.secondaryColor)};
`
