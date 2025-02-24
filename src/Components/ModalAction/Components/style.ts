import styled from "styled-components/native";

import { theme, fontStyle } from "../../../Theme/theme"
import { typeTheme } from "../../../Config/enumTheme"

interface typeButton {
    optionButton: string
}

export const ContentModalButtons = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
`

export const ButtonContent = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    padding: 3px;
    min-width: 43%;
    border-radius: 6px;
    border: 1.3px;
    border-color: ${theme.primarycolor};
    background-color : ${(props: typeButton) => props.optionButton === typeTheme.default ? (theme.primarycolor) : (theme.secondaryColor)};
`

export const TextButton = styled.Text`
    text-align: center;
    font-size:14.5px;
    line-height: 21px;
    font-family: ${fontStyle.regular};
    color: ${(props: typeButton) => props.optionButton === typeTheme.default ? (theme.secondaryColor) : (theme.primarycolor)};
`
