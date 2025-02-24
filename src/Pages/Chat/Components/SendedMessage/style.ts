import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"

export const MessageContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 6px;
`

export const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 3px;
    margin-bottom: 3px;
    margin-right: 5px;
`

export const ForwardMessageContainer = styled.View`
    flex-direction: row;
    gap:5px;
    align-items: center;
    margin-bottom: 5px;
`

export const ForwardMessageTitle = styled.Text`
    font-size: 10px;
    color:${theme.lightGray};
    font-weight: 600;
`

export const TitleDeleted = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color:${theme.lightGray};
`

export const Message = styled.View`
    justify-content: center;
    background-color: #F4F4F4;
    border-radius: 10px;
    padding: 12px 6px 5px 15px;
    margin-left: 50px;
    padding-right: 10px;
    max-width: 70%;
`


export const MessageText = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    margin-right: 10px;
`
export const MessageTextLong = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    margin-right: 60px;
`

export const MessageInfo = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap:10px;
`

export const Time = styled.Text`
    font-family: ${fontStyle.light};
    color: ${theme.textDark};
    font-size: 11px;
`

export const ViewImage = styled.Image`
    width: 13px;
`