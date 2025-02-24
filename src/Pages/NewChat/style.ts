import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";

export const InitialChatContainer = styled.View`
    align-items: center;
    padding-top: 28px;
    padding-bottom: 0px;
    margin-bottom: 20px;
`

export const UserNickname = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.textDark};
`

export const UserName = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 12px;
    color: ${theme.lightGray};
`