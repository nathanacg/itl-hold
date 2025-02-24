import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"


export const ButtonsContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 18px;
`

export const ModalText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
    text-align: center;
    width: 200px;
`