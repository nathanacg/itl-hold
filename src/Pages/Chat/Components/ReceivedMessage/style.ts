import styled from "styled-components/native"

import { theme, fontStyle } from "../../../../Theme/theme"

export const MessageContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap:5px;

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

export const UserInfo = styled.View`
    align-items: flex-start;
    justify-content: center;
`

export const UserNameTitle = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.primarycolor};
    font-size: 12px;
    font-weight: 900;
`

export const UserImage = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 35px;
    border-width: 0.1px;
`

export const Message = styled.View`
    flex-direction: column;
    justify-content: center;
    background-color: #0245F41A;
    border-radius: 10px;
    padding: 10px 10px 5px 15px;
    max-width: 70%;
  
`

export const MessageText = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
`
export const MessageTextLong = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    line-height: 18px;

    margin-right: 10px;
`

export const MessageInfo = styled.View`
    flex-direction: row;
    align-items: flex-start;
    gap: 3px;
`

export const Time = styled.Text`
    font-family: ${fontStyle.light};
    color: ${theme.textDark};
    font-size: 11px;
    margin-right: 2px;
`

export const ViewImage = styled.Image`
    width: 13px;
`
