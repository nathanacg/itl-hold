import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"
import { typeTheme } from "../../Config/enumTheme"

interface typeButton {
    optionButton: string
}

export const ButtonContent = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 35px;
    margin-left: 18px;
    margin-right: 18px;
    background-color : ${(props: typeButton) => props.optionButton === typeTheme.default ? (theme.primarycolor) : (theme.secondaryColor)};
`

export const TextButton = styled.Text`
    text-align: center;
    font-size:18px;
    font-family: ${fontStyle.semiBold};
    color: ${(props: typeButton) => props.optionButton === typeTheme.default ? (theme.secondaryColor) : (theme.primarycolor)};
`