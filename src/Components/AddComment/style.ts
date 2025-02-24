import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const Container = styled.View`
    align-items: center;
    width: 100%;
    padding-left: 33px;
    padding-right: 33px;
    margin-top: 4px;
    margin-bottom: 15px;
`

export const AnswerContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    border-bottom-color: #5E5E5E40;
    border-bottom-width: 1px;
    padding-bottom: 9px;
    padding-top: 3px;
`

export const UserImage = styled.Image`
    width: 38px;
    height: 38px;
    border-radius: 38px;
    margin-left: 3px;
`

export const UserImageMark = styled.Image`
    width: 20px;
    height: 20px;
    border-radius: 20px;
`

export const InputComment = styled.TextInput`
    flex: 1;
    font-family: ${fontStyle.regular};
    color: ${theme.textligthGray};
`

export const SendButton = styled.TouchableOpacity`
    justify-self: flex-end;
    width: 23px;
`
export const SendButtonStory = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 5px;
    margin-top: -2px;
    margin-right: -1px;
    background-color: #fff;
    border-radius: 27px;
    width: 27px;
    height: 27px;
`