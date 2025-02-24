import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const MessageSolicitationContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${theme.secondaryColor};
    justify-content: space-between;
`

export const MessageOptions = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border-top-width: 1px;
    border-top-color: #d9d9d9;
    padding: 12px 50px;
`

export const OptionText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.textDark};
    padding: 10px;
`
export const OptionNumber = styled.Text`
     font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
`

export const Divisor = styled.View`
    width: 1px;
    height: 32px;
    background-color:  #d9d9d9;
`