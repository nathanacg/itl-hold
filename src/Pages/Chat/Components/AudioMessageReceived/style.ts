import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"

export const MessageContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
`

export const ForwardMessageContainer = styled.View`
    flex-direction: row;
    gap:5px;
    align-items: center;
`

export const ForwardMessageTitle = styled.Text`
    font-size: 10px;
    color:${theme.lightGray};
    font-weight: 600;
`

export const Message = styled.View`
    justify-content: center;
    background-color: #0245F41A;
    border-radius: 10px;
    padding: 15px 0px 5px 20px;
`

export const MessageText = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    margin-bottom: 0px;
    bottom: 5px;
    margin-right: 10px;
    width: auto;
`
export const MessageTextLong = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    line-height: 18px;
    margin-right: 60px;

`

export const MessageInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 2px;
    position: absolute;
    bottom: 5px;
    right: 6px;
`

export const Time = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 10px;
`

export const ViewImage = styled.Image`
    width: 13px;
`
export const UserImage = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 18px;
    margin-top: 3px;
    background-color: black;
`