import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"

export const MessageContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 25px;
    gap: 6px;
    margin-bottom: 5px;
`

export const UserInfo = styled.View`
    align-items: flex-start;
    justify-content: center;
`

export const UserNameTitle = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${(props: { color: string; }) => props.color || theme.primarycolor}; /* Usando a cor da prop ou preto como padrão */
    font-size: 11px;
    font-weight: 400;
`
export const UserNicknameTitle = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${(props: { color: string; }) => props.color || theme.primarycolor}; /* Usando a cor da prop ou preto como padrão */
    font-size: 12px;
    font-weight: 900;
`

export const UserImage = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 18px;
    margin-top: 20px;
`

export const Message = styled.View`
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 2;
    background-color: #0245F41A;
    border-radius: 10px;
    padding: 12px 6px 12px 15px;
    margin-right: 70px;
    margin-bottom: -10px;
`

export const MessageText = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    line-height: 18px;
    margin-right: 10px;
`
export const MessageTextLong = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    line-height: 18px;
    margin-right: 150px;
`

export const MessageInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 2px;
    position: absolute;
    bottom: 2px;
    right: 6px;
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
