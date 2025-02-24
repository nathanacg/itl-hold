import styled from "styled-components/native"
import { fontStyle, theme } from "../../Theme/theme"


export const ContainerInput = styled.View`
   flex-direction: row;
   align-items: flex-start;
   justify-content: flex-start;
`

export const LabelContainer = styled.View`
    align-items: flex-start;
    margin-top: -10px;
`

export const LabelText = styled.Text`
    justify-content: center;
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
    width: 100;
    text-align: left;
`

export const TextInputBox = styled.TextInput`
    color: ${theme.inputTextColor};
    flex: 1;
    height: 120px;
    width: 100%;
    font-size: 13px;
    font-family: ${fontStyle.regular};
`

export const InputBox = styled.View`
    width: 240px;
    align-items: flex-start;
    border-bottom-width: 0.3px;
    border-color: ${theme.inputTextColor};
`
