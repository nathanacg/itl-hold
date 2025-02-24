import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"
import { typeTheme } from "../../Config/enumTheme"

interface typeButton {
    optionButton: string
}

export const ButtonContent = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 7px;
    border-radius: 4px;
    border: 1px;
    border-color: ${theme.primarycolor};

    background-color : ${(props: typeButton) => props.optionButton === typeTheme.default ? (theme.primarycolor) : (theme.secondaryColor)};
`

export const TextButton = styled.Text`
    text-align: center;
    font-size:12px;
    font-family: ${fontStyle.semiBold};
    color: ${(props: typeButton) => props.optionButton === typeTheme.default ? (theme.secondaryColor) : (theme.primarycolor)};
`