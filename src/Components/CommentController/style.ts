import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const Container = styled.View`
    background-color: ${theme.secondaryColor};
    padding-left: 30px;
    padding-right: 13px;
`

export const AnswerContainer = styled.View`
    align-self: flex-end;
    padding-right: 5px;
`

export const AnswerButton = styled.Text`
    font-family: ${fontStyle.semiBold};
    color: ${theme.textligthGray};
    font-size: 10px;
    margin-top: 10px;
    margin-left: 4px;
`